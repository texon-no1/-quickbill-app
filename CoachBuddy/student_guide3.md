# CoachBuddy – Phase 10: 실전 수익화 준비 + 프로덕션 준비

## 1. 현재 상태 요약

안티그래비티는 다음까지 완료했습니다.

- Phase 1–2:  
  - NotebookLM + MCP로 CoachBuddy를 포함한 10개 앱 아이디어 생성  
  - 5개 추려서 사용자 선택 → CoachBuddy 선정  
  - StitchMCP로 3개 디자인 생성 → “Design 1 - Professional” 선택

- Phase 3–6:  
  - CoachBuddy 프로젝트 폴더 구조 생성  
  - 코치용 UI/HTML/CSS/JS 구현  
  - docs/01-plan.md 작성  
  - 농구(Basketball) 중심의 AI 분석 흐름(업로드 → Analysis → 시각화) 구현

- Phase 7–8:  
  - 학생용 포털(student.html) 생성  
  - 코치/학생 모드 전환 버튼(모드 스위치) 구현  
  - AI 추천 샵(Affiliate, 쿠팡/네이버 링크 버튼)  
  - Premium Video Lessons UI (잠금 레이어 포함)  
  - analysis.html에 수익화 UI 추가  
  - dummy 데이터 + 동적 렌더링 로직(js/app.js)

- Phase 9:  
  - isPro 상태와 Pro 전용 헬퍼 함수 초기화  
  - 더미 PDF 리포트 생성 로직  
  - 더미 결제 흐름 및 모달 UI  
  - Premium/Locked 레이어(루틴/레슨)  
  - 코치 대시보드에 학생 결제/Pro 현황 카드  
  - 수익화 UI/UX 전체 정리

이제는 **이 구조를 바탕으로 더 실제 서비스에 가까운 수준**으로 진전시키는 작업을 진행합니다.

---

## 2. Phase 10 – 목표 (다음 스텝)

1) **Pro 플랜 운영 체계** 완성:  
   - Pro 플랜에 따른 기능 차이를 좀 더 명확하게 정책화하고, UI/JS 로직을 정리

2) **PDF 리포트 품질 향상**:  
   - HTML → PDF 변환을 “제대로 된 보고서 형식”으로 설계

3) **프리미엄 콘텐츠 구조 정의**:  
   - 루틴/영상/코스 단위로 카테고리화

4) **코치용 대시보드: 운용 가능 데이터 패턴 정의**:  
   - 실제 사용 시 쉽게 확장 가능한 dummy 데이터 구조를 미리 만들어 두기

5) **프로덕션 준비용 코드·문서 정리**:  
   - 실제 Toss/KakaoPay/쿠팡/네이버 API 연동을 염두에 둔 “구조만 준비”

---

## 3. 1단계: Pro 플랜 정책 정의 + UI/JS 정리

- js/app.js에 `getProFeatures()` 함수를 정의해, Pro 플랜이 갖는 기능을 객체로 정리

예시:

```js
const PRO_FEATURES = {
  unlimitedAnalysis: true,
  pdfReportDownload: true,
  premiumVideoAccess: true,
  allRoutinesUnlocked: true,
  adFree: true
};
모든 페이지에 setProStyle() 또는 updateProElements() 함수를 만들어,

Pro 플랜이면 Pro 전용 UI를 보여주고

비 Pro이면 문구/잠금 레이어를 보여주도록 공통 로직으로 정리

style.css에:

.pro-feature, .premium-only, .locked-overlay 같은 클래스를 하나의 섹션으로 모음

색상/폰트/투명도를 통일

4. 2단계: PDF 리포트 품질 향상
analysis.html 또는 report.html에:

“PDF용” 레이아웃(프린트 용도) 전용 섹션을 추가

예시:

학생 정보(이름, 나이, 포지션 등)

분석 날짜

메트릭 표(점프 높이, 릴리즈 아크, 대칭성, 슛 각도 등)
이미지형 스켈레톤/그래프(캔버스 또는 이미지)

코치 코멘터리

추천 루틴

js/app.js에:

generatePDFFromReport() 또는 preparePrintableReport() 함수를 만들어,

HTML 요소를 html2pdf / jsPDF 식 구조로 더미 흉내

Pro 플랜이 아닐 때는:

“PDF 리포트는 Pro 플랜에서만 다운로드 가능합니다” 문구를 HTML에만 표시

Pro 플랜일 때는:

가상으로 PDF 다운로드 중... → PDF 생성 완료 단계를 UI에만 표시

5. 3단계: 프리미엄 콘텐츠 구조 정의
/docs/02-premium-structure.md를 생성해, 프리미엄 콘텐츠의 구조를 문서화

내용 예시:

루틴 카테고리:

하체 강화

코어 훈련

민첩성 훈련
영상/코스:

“초급 농구 슛 향상 코스”

“하체 폭발 훈련 프로그램”

가격 구조:

루틴: 1회 구매

영상 코스: 월 구독 또는 종신패스

Pro 플랜: 모든 루틴/코스가 포함

js/app.js에 premiumStructure 객체를 만들어, 위 구조를 더미 형식으로 정의

이후 실제 백엔드 연동 시 이 구조를 그대로 사용할 수 있도록

6. 4단계: 코치 대시보드 – 운영 데이터 패턴 정의
리포트/학생 관리 섹션에,

더미 데이터 구조를 실제 운영 구조에 가깝게 정리

예시 객체:
const studentStats = [
  {
    id: 1,
    name: "학생 1",
    plan: "Pro",
    analysisCount: 12,
    lastAnalysisDate: "2026-03-10",
    premiumLessonViews: 5,
    routinesDone: 8
  },
  {
    id: 2,
    name: "학생 2",
    plan: "Free",
    analysisCount: 3,
    lastAnalysisDate: "2026-03-05",
    premiumLessonViews: 0,
    routinesDone: 2
  }
];
 데이터를 기반으로:

코치 대시보드에

Pro/Free 비율

가장 많이 본 Premium 레슨

분석 카운트 그래프
를 HTML/CSS로만 그려주는 더미 차트를 만들어 줌
5단계: 프로덕션 준비용 코드·문서 구조
/api/ 또는 /src/api/에 더미 구조를 만들어 둡니다.

예시:

/api/subscription/checkout.js (더미)

/api/subscription/verify.js (더미)

/api/analysis/export-pdf.js (더미)

/api/report/generate.js (더미)

실제 Toss / 카카오페이 / 쿠팡/네이버 API 연동 시,

이 더미 구조를 중심으로 실제 코드를 삽입하도록 설계

docs/01-plan.md 상단에:

“향후 연동 예정 외부 서비스” 섹션 추가

Toss Payments

KakaoPay

Coupang Affiliate / Naver Store API

Google Analytics 등


