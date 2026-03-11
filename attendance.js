// ===========================
//  출석체크 시스템 v1.1 (Refined)
// ===========================

const STORAGE_KEY = 'attendance_data';

/**
 * 1. 현재 날짜를 YYYY-MM-DD 형식 문자열로 반환
 */
function getCurrentDateYYYYMMDD() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * 2. Firestore에서 사용자별 lastAttendDate를 조회하는 비동기 함수
 * (Firestore db 객체가 전역에 있거나 전달되어야 함)
 */
async function getLastAttendDateFromFirestore(userId, db) {
  if (!userId || !db) return null;
  try {
    const doc = await db.collection("users").doc(userId).get();
    if (doc.exists && doc.data().lastAttendDate) {
      return doc.data().lastAttendDate;
    }
  } catch (e) {
    console.error("Firestore 조회 에러:", e);
  }
  return null;
}

/**
 * 3. localStorage에 저장된 lastAttendDate를 조회
 */
function getLastAttendDateFromLocalStorage(userId) {
  const key = userId ? `lastAttendDate_${userId}` : 'lastAttendDate_guest';
  return localStorage.getItem(key);
}

/**
 * 4. 오늘 이미 출석체크했는지 여부를 판단 (팝업 표시 여부 결정)
 * @returns {boolean} true: 팝업 표시 필요 (아직 안함), false: 팝업 숨김 (이미 함)
 */
function shouldShowAttendancePopup(lastAttendDate, todayDate) {
  // 마지막 출석일이 오늘과 다르면 팝업 표시 필요
  return lastAttendDate !== todayDate;
}

/**
 * 5. Firestore에 lastAttendDate를 업데이트
 */
async function updateLastAttendDateToFirestore(userId, dateStr, db) {
  if (!userId || !db) return;
  try {
    await db.collection("users").doc(userId).set({
      lastAttendDate: dateStr
    }, { merge: true });
  } catch (e) {
    console.error("Firestore 업데이트 에러:", e);
  }
}

/**
 * 6. localStorage에 lastAttendDate를 저장
 */
function updateLastAttendDateToLocalStorage(userId, dateStr) {
  const key = userId ? `lastAttendDate_${userId}` : 'lastAttendDate_guest';
  localStorage.setItem(key, dateStr);
}

// --- 기존 코드 호환성 및 유틸리티 ---

function todayStr() {
  return getCurrentDateYYYYMMDD();
}

// 데이터 로드 (우선순위: 파라미터로 명시적 전달 > localStorage)
function loadAttendanceData(externalData = null) {
  if (externalData) return { ...getDefaultData(), ...externalData };
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : getDefaultData();
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 기본 데이터 구조
function getDefaultData() {
  return {
    totalPoints: 0,
    streak: 0,
    totalDays: 0,
    lastAttendDate: null,
    attendedDates: [],  // ['2026-03-10', ...]
    history: []         // [{date, point, reason}]
  };
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// 보상 테이블
const REWARDS = [
  { days: 3, point: 30, icon: '🌱', title: '3일 연속 출석', desc: '새싹 달성! +30P 보너스' },
  { days: 5, point: 50, icon: '⭐', title: '5일 연속 출석', desc: '스타! +50P 보너스' },
  { days: 7, point: 100, icon: '🏅', title: '7일 연속 출석', desc: '1주일 달성! +100P 보너스' },
  { days: 14, point: 200, icon: '💎', title: '14일 연속 출석', desc: '2주일 달성! +200P 보너스' },
  { days: 30, point: 1000, icon: '👑', title: '30일 연속 출석', desc: '전설! +1,000P 보너스' },
];

// 출석 처리
function doAttend(externalData = null) {
  const data = loadAttendanceData(externalData);
  const today = todayStr();

  if (data.lastAttendDate === today) {
    showToast('오늘은 이미 출석했어요! 내일 또 와요 😊');
    return data; // 데이터 반환
  }

  // 연속 출석 계산
  if (data.lastAttendDate === yesterdayStr()) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  // 기본 10P 적립
  let earned = 10;
  let reason = '출석체크';

  // 연속 보너스 확인
  const bonus = REWARDS.find(r => r.days === data.streak);
  if (bonus) {
    earned += bonus.point;
    reason = `${bonus.title} 보너스!`;
    showToast(`🎉 ${bonus.title}! +${earned}P 획득!`);
  } else {
    showToast(`✅ 출석 완료! +${earned}P 획득! (${data.streak}일 연속)`);
  }

  data.totalPoints += earned;
  data.totalDays += 1;
  data.lastAttendDate = today;

  if (!data.attendedDates.includes(today)) {
    data.attendedDates.push(today);
  }

  data.history.unshift({ date: today, point: earned, reason });

  if (!externalData) {
    saveData(data);
  }

  renderAll(data);
  return data;
}

// UI 렌더링
function renderAll(providedData = null) {
  const data = providedData || loadAttendanceData();
  const today = todayStr();

  // DOM 존재 여부 체크 후 렌더링
  const setElText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setElText('totalPoints', data.totalPoints.toLocaleString() + 'P');
  setElText('streakCount', data.streak + '일');
  setElText('totalAttend', data.totalDays + '일');

  // 출석 버튼
  const btn = document.getElementById('attendBtn');
  const msg = document.getElementById('attendMsg');
  if (btn) {
    if (data.lastAttendDate === today) {
      btn.className = 'attend-btn done';
      btn.textContent = '✅ 오늘 출석 완료!';
      btn.onclick = null;
      if (msg) msg.textContent = `오늘도 출석 완료! ${data.streak}일 연속 달성 중 🔥`;
    } else {
      btn.className = 'attend-btn active';
      btn.textContent = '출석하기 (+10P)';
      btn.onclick = doAttend;
      if (msg) msg.textContent = '오늘 아직 출석하지 않았어요';
    }
  }

  renderCalendar(data);
  renderRewards(data);
  renderHistory(data);
}

// 달력
let calYear, calMonth;
function renderCalendar(data) {
  const now = new Date();
  if (calYear === undefined) calYear = now.getFullYear();
  if (calMonth === undefined) calMonth = now.getMonth();

  const monthEl = document.getElementById('calMonth');
  if (monthEl) monthEl.textContent = `${calYear}년 ${calMonth + 1}월`;

  const grid = document.getElementById('calGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  dayNames.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-name';
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayFull = todayStr();

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
    if (data.attendedDates.includes(dateStr)) el.classList.add('checked');
    if (dateStr === todayFull) el.classList.add('today');
    grid.appendChild(el);
  }
}

// 명칭 통일: loadData -> loadAttendanceData
function loadData() {
  return loadAttendanceData();
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar(loadData());
}

// 보상 목록
function renderRewards(data) {
  const list = document.getElementById('rewardList');
  if (!list) return;
  list.innerHTML = '';
  REWARDS.forEach(r => {
    const item = document.createElement('div');
    let cls = 'reward-item';
    let badge = '';
    if (data.streak >= r.days) {
      cls += ' achieved';
      badge = '<span class="reward-badge badge-done">달성 ✅</span>';
    } else if (data.streak === r.days - 1) {
      cls += ' next';
      badge = '<span class="reward-badge badge-next">내일 달성!</span>';
    } else {
      badge = `<span class="reward-badge badge-lock">${r.days - data.streak}일 남음</span>`;
    }
    item.className = cls;
    item.innerHTML = `
      <span class="reward-icon">${r.icon}</span>
      <div class="reward-info">
        <div class="reward-title">${r.title}</div>
        <div class="reward-desc">${r.desc}</div>
      </div>
      ${badge}
    `;
    list.appendChild(item);
  });
}

// 히스토리
function renderHistory(data) {
  const list = document.getElementById('historyList');
  if (!list) return;
  if (!data.history.length) {
    list.innerHTML = '<p style="text-align:center;color:#aaa;font-size:13px;">아직 출석 기록이 없어요</p>';
    return;
  }
  list.innerHTML = data.history.slice(0, 20).map(h => `
    <div class="history-item">
      <span class="history-date">${h.date} · ${h.reason}</span>
      <span class="history-point">+${h.point}P</span>
    </div>
  `).join('');
}

// 토스트
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) {
    alert(msg); // 토스트 요소가 없으면 alert로 대체
    return;
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// 초기화
renderAll();
