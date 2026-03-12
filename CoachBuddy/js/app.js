document.addEventListener('DOMContentLoaded', () => {
    console.log('CoachBuddy Initialized');

    // --- Multi-Category Configuration ---
    const CATEGORY_CONFIG = {
        basketball: {
            title: '농구 코치 대시보드',
            desc: '자유투 및 전술 동작 분석 전문 엔진 활성화 중',
            analysisTitle: '자유투 슛 아크 분석',
            statsLabel: '최다 조회 레슨: 슛 아크 마스터',
            unit: '아크 48°, 엘보우 151°',
            icon: 'asset_basketball.svg',
            shopItems: [
                { name: '하체 강화 머슬 프로틴', desc: '안정적인 점프력을 위한 필수 영양', icon: '💊', linkType: '쿠팡' },
                { name: '프로페셔널 무릎 보호대', desc: '착지 시 충격 완화 및 부상 방지', icon: '🧎', linkType: '네이버' }
            ],
            routines: [
                { name: '벽 스쿼트 버티기', desc: '하체 근지구력 및 슛 밸런스 강화', icon: '🏋️', isPremium: false },
                { name: '한 발 밸런스 훈련', desc: '릴리즈 시 하체 안정성 확보', icon: '🧘', isPremium: true }
            ]
        },
        yoga: {
            title: '요가 강사 대시보드',
            desc: '정렬 및 유연성 밸런스 분석 엔진 활성화 중',
            analysisTitle: '전사 자세 대칭성 분석',
            statsLabel: '최다 조회 레슨: 골반 정렬 기초',
            unit: '좌우 균형 94%, 골반 각도 12°',
            icon: 'asset_yoga.svg',
            shopItems: [
                { name: '프리미엄 요가 매트', desc: '땀 흡수 및 미끄럼 방지 최적화', icon: '🧘‍♀️', linkType: '쿠팡' },
                { name: '요가 블록 세트', desc: '자세 교정 및 유연성 향상 도우미', icon: '🧱', linkType: '네이버' }
            ],
            routines: [
                { name: '아침 수리야 나마스카라', desc: '몸 전체의 에너지를 깨우는 흐름', icon: '☀️', isPremium: false },
                { name: '딥 스트레칭 이완', desc: '근육 긴장 완화 및 유연성 증대', icon: '🐚', isPremium: true }
            ]
        },
        dance: {
            title: '댄스 안무가 대시보드',
            desc: '박자 및 전신 일체감 분석 엔진 활성화 중',
            analysisTitle: 'K-POP 안무 일치율 분석',
            statsLabel: '최다 조회 레슨: 아이솔레이션 마스터',
            unit: '정확도 92%, 표현력 88점',
            icon: 'asset_dance.svg',
            shopItems: [
                { name: '퍼포먼스 댄스화', desc: '충격 흡수 및 발목 회전 지원', icon: '👟', linkType: '쿠팡' },
                { name: '고화질 연습용 대형 거울', desc: '디테일한 동작 체크를 위한 필수템', icon: '🪞', linkType: '네이버' }
            ],
            routines: [
                { name: '기초 코어 강화', desc: '파워풀한 동작을 위한 중심 잡기', icon: '💪', isPremium: false },
                { name: '음악 비트 매칭 훈련', desc: '박자 감각 및 그루브 향상', icon: '🎵', isPremium: true }
            ]
        }
    };

    window.selectCategory = function (cat) {
        localStorage.setItem('selectedCategory', cat);
        const modal = document.getElementById('category-modal-overlay');
        if (modal) modal.style.display = 'none';
        location.reload(); // Reload to apply all config changes
    };

    const currentCat = localStorage.getItem('selectedCategory');
    if (!currentCat && window.location.pathname.includes('index.html')) {
        const modal = document.getElementById('category-modal-overlay');
        if (modal) modal.style.display = 'flex';
    }

    const config = CATEGORY_CONFIG[currentCat || 'basketball'];

    console.log(`[App] Current Category: ${currentCat || 'default:basketball'}`);

    // Update Page Titles Dynamically
    const mainTitle = document.getElementById('main-dashboard-title');
    const mainDesc = document.getElementById('main-dashboard-desc');
    if (mainTitle) mainTitle.innerText = config.title;
    if (mainDesc) mainDesc.innerText = config.desc;

    // Specific for student.html if needed
    const studentPortalTitle = document.querySelector('.hero h2');
    if (studentPortalTitle && window.location.pathname.includes('student.html')) {
        studentPortalTitle.innerText = `${config.title.split(' ')[0]} 학생 포털`;
    }

    // --- Production Logic Configuration ---

    const premiumLessons = [
        { id: 'v1', title: '자유투 개선 퍼팩트 트레이닝', level: '중급', time: '30분', effect: '아크 2도 개선', isPro: true },
        { id: 'v2', title: '수직 점프력 폭발 루틴', level: '고급', time: '45분', effect: '점프 5cm 향상', isPro: true }
    ];

    // --- Dynamic Rendering for Student Portal ---
    const analysisList = document.getElementById('latest-analysis-container');
    const shopList = document.getElementById('shop-container');
    const routineList = document.getElementById('routines-container');
    const premiumList = document.getElementById('premium-lessons-container');

    if (analysisList) {
        analysisList.innerHTML = '';
        latestAnalysis.forEach(item => {
            const div = document.createElement('div');
            div.className = 'feedback-item';
            div.innerHTML = `
                <div class="student-info">
                    <div class="avatar" style="background: var(--primary-dark); color: white;">B</div>
                    <div>
                        <strong>${item.title}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${item.date} | ${item.summary}</div>
                    </div>
                </div>
                <button class="btn" style="font-size: 0.8rem; border: 1px solid var(--border-color);" onclick="window.location.href='analysis.html'">보고서 보기</button>
            `;
            analysisList.appendChild(div);
        });
    }

    if (shopList) {
        shopItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <div class="product-img">${item.icon}</div>
                <div class="product-info">
                    <div class="product-title">${item.name}</div>
                    <div class="product-desc">${item.desc}</div>
                    <a href="#" class="btn btn-primary" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">${item.linkType} 링크</a>
                </div>
            `;
            shopList.appendChild(div);
        });
    }

    if (routineList) {
        routines.forEach(item => {
            const div = document.createElement('div');
            div.className = 'routine-card';
            div.innerHTML = `
                <div class="routine-icon" style="color: var(--primary-color);">${item.icon}</div>
                <div>
                    <h4>${item.name} ${item.isPremium ? '<span class="pro-badge">PRO</span>' : ''}</h4>
                    <p>${item.desc}</p>
                </div>
            `;
            routineList.appendChild(div);
        });
    }

    if (premiumList) {
        premiumLessons.forEach(item => {
            const div = document.createElement('div');
            div.className = 'video-lesson-card';
            div.innerHTML = `
                <div class="video-thumb">
                    <div class="play-icon">▶</div>
                    <div class="video-lesson-badge">${item.isPro ? 'PRO' : 'FREE'}</div>
                    <div class="video-locked-overlay">
                        <div class="lock-icon">🔒</div>
                        <div style="font-size: 0.8rem;">구매 시 시청 가능</div>
                    </div>
                </div>
                <div class="video-info">
                    <h4>${item.title}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin: 5px 0;">${item.level} | ${item.time} | ${item.effect}</p>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 10px; font-size: 0.85rem;">구매하기 (예정)</button>
                </div>
            `;
            premiumList.appendChild(div);
        });
    }

    // --- Dummy Data (Using Config) ---
    const latestAnalysis = [
        { id: 1, date: '2026.03.12', title: config.analysisTitle, summary: config.unit },
        { id: 2, date: '2026.03.10', title: '기본 밸런스 체크', summary: '정확도 88%' },
        { id: 3, date: '2026.03.05', title: '성장 리포트', summary: '지난주 대비 향상' }
    ];

    const shopItems = config.shopItems;
    const routines = config.routines;

    // ... (keep premiumLessons and rendering logic) ...

    // --- Pro State Management (localStorage) ---
    window.isPro = localStorage.getItem('isPro') === 'true';

    function updateProElements() {
        // Update body class for global targeting
        if (window.isPro) {
            document.body.classList.add('is-pro');
            document.body.classList.remove('is-free');
        } else {
            document.body.classList.add('is-free');
            document.body.classList.remove('is-pro');
        }

        // Handle locked overlays
        document.querySelectorAll('.video-locked-overlay').forEach(overlay => {
            overlay.style.display = window.isPro ? 'none' : 'flex';
        });

        // Update Pro badges visibility if needed
        document.querySelectorAll('.pro-badge').forEach(badge => {
            badge.style.opacity = window.isPro ? '1' : '0.6';
        });

        // Update main dashboard title/desc based on Pro status
        const mainTitle = document.getElementById('main-dashboard-title');
        if (mainTitle && window.location.pathname.includes('index.html')) {
            mainTitle.innerText = window.isPro ? `${config.title} (PRO)` : config.title;
        }

        console.log(`[App] Pro Elements Updated. Status: ${window.isPro}`);
    }

    // --- Payment Integration Standard Interface ---

    /**
     * 결제 프로세스 시작
     */
    window.startPayment = async function (productId) {
        console.log(`[Payment] Starting payment for product: ${productId}`);

        try {
            // 1. SDK 초기화 (이미 되어있어도 안전하게 호출)
            await PaymentSDK.init();

            // 2. 결제 요청 설정 생성
            const paymentConfig = {
                amount: productId === 'pro_monthly' ? 9900 : 99000,
                orderId: "ORDER_" + Date.now(),
                orderName: productId === 'pro_monthly' ? "CoachBuddy Pro Monthly" : "CoachBuddy Pro Yearly",
                method: "CARD"
            };

            // 3. SDK 결제창 호출
            const result = await PaymentSDK.requestPayment(paymentConfig);

            // 4. 성공 핸들러 호출
            handlePaymentSuccess(result);

        } catch (error) {
            // 5. 실패/취소 핸들러 호출
            if (error.error === "USER_CANCELLED") {
                console.log("[Payment] User cancelled the payment.");
            } else {
                handlePaymentFail(error);
            }
        }
    };

    /**
     * 결제 성공 처리
     */
    function handlePaymentSuccess(data) {
        console.log("[Payment] Success Handler:", data);

        // 1. 상태 영구 저장
        window.isPro = true;
        localStorage.setItem('isPro', 'true');
        localStorage.setItem('subscriptionData', JSON.stringify({
            date: new Date().toISOString(),
            paymentKey: data.paymentKey,
            amount: data.amount
        }));

        // 2. UI 갱신
        updateProElements();

        // 3. 사용자 알림
        alert("결제가 성공적으로 완료되었습니다! 이제 모든 Pro 기능을 사용할 수 있습니다.");
    }

    /**
     * 결제 실패 처리
     */
    function handlePaymentFail(error) {
        console.error("[Payment] Fail Handler:", error);
        alert(`결제에 실패했습니다: ${error.message || '알 수 없는 오류'}`);
    }

    // --- PDF Generation Simulation ---
    window.generatePDFFromReport = function () {
        if (!window.isPro) {
            alert("PDF 리포트 다운로드는 Pro 플랜 전용 기능입니다.");
            return;
        }

        const btn = document.querySelector('.btn-pdf-download');
        if (btn) btn.innerText = "PDF 생성 중...";

        setTimeout(() => {
            alert("농구 분석 정밀 보고서(PDF)가 생성 및 다운로드되었습니다.");
            if (btn) btn.innerText = "PDF 리포트 다운로드";
        }, 2000);
    };

    // --- Coach Dashboard Analytics ---
    const coachStatsContainer = document.getElementById('coach-stats-container');
    const studentStats = [
        { name: '최준호', plan: window.isPro ? 'Pro' : 'Free', lastAnalysis: '2026.03.12' },
        { name: '김민지', plan: 'Free', lastAnalysis: '2026.03.11' },
        { name: '이현우', plan: 'Free', lastAnalysis: '2026.03.10' }
    ];

    if (coachStatsContainer) {
        const totalStudents = studentStats.length;
        const proStudents = studentStats.filter(s => s.plan === 'Pro').length;
        const proRatio = Math.round((proStudents / totalStudents) * 100);

        coachStatsContainer.innerHTML = `
            <div class="stats-card">
                <h4>Pro 전환율</h4>
                <div class="stats-value">${proRatio}%</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${proStudents} / ${totalStudents} 명</div>
            </div>
            <div class="stats-card" style="border-left-color: #2ecc71;">
                <h4>최다 조회 레슨</h4>
                <div class="stats-value" style="font-size: 1.2rem; margin-top: 10px;">${config.statsLabel.split(': ')[1]}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">조회수 128회</div>
            </div>
        `;
    }

    // Initialize UI
    updateProElements();

    // --- Coach View Specific (Upload Simulation) ---
    const uploadArea = document.querySelector('.upload-section');
    const chartBars = document.querySelectorAll('.chart-bar');

    if (uploadArea) {
        uploadArea.addEventListener('click', () => simulateUpload());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#13b6ec';
            uploadArea.style.background = '#e7f8fd';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#e1e8ed';
            uploadArea.style.background = '#ffffff';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            simulateUpload();
        });

        function simulateUpload() {
            uploadArea.innerHTML = `
                <div class="loading-spinner"></div>
                <img src="${config.icon}" style="width: 60px; margin-bottom: 1rem; opacity: 0.8;">
                <h2 style="color: var(--primary-color);">AI ${config.title.split(' ')[0]} 분석 중...</h2>
                <p>영상을 정교하게 분석하고 있습니다. 잠시만 기다려 주세요.</p>
            `;
            uploadArea.style.pointerEvents = 'none';
            setTimeout(() => { window.location.href = 'analysis.html'; }, 2000);
        }
    }

    // Animate Chart Bars
    setTimeout(() => {
        chartBars.forEach(bar => {
            const finalHeight = bar.getAttribute('data-height');
            bar.style.height = `${finalHeight}%`;
        });
    }, 500);
});
