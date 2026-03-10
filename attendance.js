// ===========================
//  출석체크 시스템 v1.0
// ===========================

const STORAGE_KEY = 'attendance_data';

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

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : getDefaultData();
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// 보상 테이블
const REWARDS = [
  { days: 3,  point: 30,   icon: '🌱', title: '3일 연속 출석',  desc: '새싹 달성! +30P 보너스' },
  { days: 5,  point: 50,   icon: '⭐', title: '5일 연속 출석',  desc: '스타! +50P 보너스' },
  { days: 7,  point: 100,  icon: '🏅', title: '7일 연속 출석',  desc: '1주일 달성! +100P 보너스' },
  { days: 14, point: 200,  icon: '💎', title: '14일 연속 출석', desc: '2주일 달성! +200P 보너스' },
  { days: 30, point: 1000, icon: '👑', title: '30일 연속 출석', desc: '전설! +1,000P 보너스' },
];

// 출석 처리
function doAttend() {
  const data = loadData();
  const today = todayStr();

  if (data.lastAttendDate === today) {
    showToast('오늘은 이미 출석했어요! 내일 또 와요 😊');
    return;
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
  saveData(data);
  renderAll();
}

// UI 렌더링
function renderAll() {
  const data = loadData();
  const today = todayStr();

  document.getElementById('totalPoints').textContent = data.totalPoints.toLocaleString() + 'P';
  document.getElementById('streakCount').textContent = data.streak + '일';
  document.getElementById('totalAttend').textContent = data.totalDays + '일';

  // 출석 버튼
  const btn = document.getElementById('attendBtn');
  const msg = document.getElementById('attendMsg');
  if (data.lastAttendDate === today) {
    btn.className = 'attend-btn done';
    btn.textContent = '✅ 오늘 출석 완료!';
    btn.onclick = null;
    msg.textContent = `오늘도 출석 완료! ${data.streak}일 연속 달성 중 🔥`;
  } else {
    btn.className = 'attend-btn active';
    btn.textContent = '출석하기 (+10P)';
    btn.onclick = doAttend;
    msg.textContent = '오늘 아직 출석하지 않았어요';
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

  document.getElementById('calMonth').textContent =
    `${calYear}년 ${calMonth + 1}월`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const dayNames = ['일','월','화','수','목','금','토'];
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
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
    if (data.attendedDates.includes(dateStr)) el.classList.add('checked');
    if (dateStr === todayFull) el.classList.add('today');
    grid.appendChild(el);
  }
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
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// 초기화
renderAll();
