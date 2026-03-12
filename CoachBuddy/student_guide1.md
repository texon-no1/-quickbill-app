# CoachBuddy - Student Portal & Monetization 구현 요청

## 1. 개요

이 프롬프트는 안티그래비티가 제안한 Implementation Plan(Implementation Plan - Student Portal & Monetization)을 기반으로,
학생용 포털(student.html)과 수익화(UI 레벨) 기능을 실제로 구현하도록 요청하는 작업 지시입니다.

- 현재 상태:  
  코치용 기능(대시보드, 학생 관리, 리포트, analysis.html)은 이미 완성됨  
- 다음 단계:  
  - 학생 전용 대시보드(student.html) 구축  
  - 수익화 요소(UI)를 student.html + analysis.html에 연동  
  - 디자인과 JS 로직을 일관되게 유지

---

## 2. 대상 파일

다음 파일을 기준으로 작업해 주세요.

- [NEW] student.html
- [MODIFY] analysis.html
- [MODIFY] style.css
- [MODIFY] index.html
- [MODIFY] js/app.js

---

## 3. 1단계: student.html 구현

### 3.1. 파일 생성 및 기본 구조
- /student.html 새로 생성
- 상단:  
  - 코치/학생 mode toggle (예: 헤더 우측에 "Mode Switcher" 버튼)
- 메인 레이아웃:
  - 틸(Teal) 테마, 코치 대시보드와 동일한 카드/버튼 디자인
  - 모바일 반응형 유지

### 3.2. Personalized Dashboard

1) Recent Analysis Results (Card list)
   - 학생이 최근에 분석한 결과를 카드형 리스트로 표시
   - 카드 내용:
     - 분석 날짜
     - 주요 지표 요약(예: 슛 각도, 릴리즈 아크, 점프 높이 등)
     - “보고서 보기” 버튼 → analysis.html로 이동
   - 카드는 5개까지 표시(더미 데이터)

2) Growth Metrics Chart (Line Chart)
   - 라인 차트로, 시간에 따른 주요 지표 변화를 보여줌
   - 예시 지표:
     - Jump Height
     - Release Arc
     - Symmetry
   - 더미 데이터로 7개의 날짜 포인트 생성
   - 챠트는 div#chart-container에 플레이스홀더로 준비

3) Coach Comments & Recommended Routines
   - 코치 코멘트 섹션:
     - 텍스트형 블록(예: "이번 분석 결과는 릴리즈 아크가 2도 개선되었습니다.")
   - 추천 운동 루틴:
     - Squats, Core Training, Lunges, Plyo 등 카드로 표시
     - “추천 루틴”이라는 제목
     - 텍스트 설명 + 간단한 이미지(플레이스홀더)
   - 코칭 말투: 격려형 + 구체적 개선 방향

4) Monetization UI (Guide)
   - 아래에 3가지 UI 카드를 배치:
     - “AI 추천 샵(affiliated)” 카드
     - “프리미엄 영상 과정(Premium Lessons)” 카드
     - “Pro 플랜 업그레이드” 배너

---

## 4. 2단계: analysis.html에 수익화 UI 추가

analysis.html에 다음 섹션을 추가해 주세요.

1) AI Recommended Shop (Affiliate)
   - 분석 결과 메트릭 하단에:
     - “AI 추천 상품” 카드 리스트
   - 카드 구조:
     - 상품 이름 (예: "하체 근력 강화를 위한 프로틴 보충제")
     - 간단 설명
     - 이미지(플레이스홀더)
     - “쿠팡/스토어 링크” 버튼(실제 URL은 더미 링크로)
   - 예시 아이템 3개 이상

2) Coach Recommended Premium Content
   - “코치 추천 프리미엄 콘텐츠” 카드
   - 제목: 예) “자유투 개선 퍼펙트 트레이닝”
   - 소개:
     - 난이도: 중급
     - 재생 시간: 30분
     - 예상 효과: 슛 아크 2~3도 개선
   - 버튼: “구매하기 (예정)”, “프리뷰 보기 (예정)”
   - 아직 결제 연동이 없으므로, 버튼은 더미

3) PDF Report Download
   - “PDF 리포트 다운로드” 버튼
   - 기본 플랜:  
     - 버튼은 있되, “Pro 플랜에서만 다운로드 가능” 문구 표시
   - Pro 플랜:  
     - 버튼 활성화
   - 버튼 텍스트 예:
     - “Pro 플랜: PDF 리포트 다운로드”

---

## 5. 3단계: style.css 스타일 추가

style.css에 다음 클래스를 추가해 주세요.

1) Product Cards (AI 추천 샵)
   - .product-card
   - .product-card--affiliated
   - 테두리, 패딩, 그림자, 텍스트 정렬 적용
   - 이미지: 100% 폭, 높이 150px 정도

2) Training Routine Cards
   - .routine-card
   - 테마 컬러(틸/블루) + 텍스트 흰색/명암 조정
   - 카드 내부에:
     - 제목(.routine-card__title)
     - описание(.routine-card__description)

3) Video Lesson Cards (Premium Lessons)
   - .video-lesson-card
   - 썸네일 이미지 + 플레이버튼 아이콘
   - .video-lesson-card__badge: “Pro”, “Lock” 배지용

4) Mode Switcher (Coach / Student)
   - 헤더에 .mode-switcher 클래스
   - 버튼 두 개: “Coach” / “Student” 또는 토글 스위치 형태
   - Coach 버튼: index.html로, Student 버튼: student.html로 이동

---

## 6. 4단계: index.html에 Mode Switcher 추가

- index.html의 상단 헤더에 “Mode Switcher”를 추가
- 예시:
  - 오른쪽 상단에 “모드: 코치 / 학생” 스위치 또는 버튼 두 개
  - “학생 보기” 클릭 시 student.html로 이동
- 디자인: 틸 테마에 맞게 버튼 색상/테두리 조정

---

## 7. 5단계: js/app.js 더미 데이터 및 로직

js/app.js에 다음을 추가해 주세요.

1) 더미 데이터 생성
   - const latestAnalysis = [...];  
     - 학생이 최근 분석한 결과 리스트
   - const growthMetrics = [...];  
     - 날짜별 주요 지표 값(예: jumpHeight, releaseArc, symmetry)
   - const shopItems = [...];  
     - AI 추천 상품 객체 배열
   - const premiumLessons = [...];  
     - 프리미엄 루틴/영상 콘텐츠 배열

2) student.html 레이아웃을 동적으로 채우는 로직
   - DOMContentLoaded 이후:
     - latestAnalysis 배열을 기반으로
       - Recent Analysis 카드 로드
     - growthMetrics 배열을 기반으로
       - 라인 차트(예: Chart.js 또는 div 레이아웃으로 더미 시각화)
     - shopItems, premiumLessons를 기반으로
       - AI 추천 샵 및 프리미엄 콘텐츠 카드 로드
   - 버튼 이벤트:
     - “보고서 보기” → analysis.html?id={analysis_id} 형식으로 URL 전달(아이디는 더미)

3) Mode Switcher 로직 (옵션)
   - local storage 또는 URL 파라미터를 기준으로
     - “isCoachMode” 또는 “isStudentMode” 플래그를 관리
   - 각 페이지에서:
     - 헤더에 현재 모드 표시

---

## 8. 9. 검증 요청 (Verification Plan)

안티그래비티가 작업을 마친 후, 다음을 확인해 주세요.

1) Manual Verification
   - 코치/학생 모드 전환:
     - 헤더 Mode Switcher를 클릭해 index.html ↔ student.html 간 전환
   - Student Dashboard 레이아웃:
     - Recent Analysis 카드
     - Growth Metrics 라인 차트
     - Coach Comments & Recommended Routines
     - Monetization UI 구역
   - Affiliate / Premium UI:
     - AI 추천 샵 카드
     - Premium Video Lessons 카드
     - Pro 플랜 배너/버튼
   - 차이점:
     - 기본 플랜과 Pro 플랜에서 PDF 버튼/잠금 상태가 다르게 보이는지 확인

---

이 프롬프트를 안티그래비티에 주고,  
- “student.html 구조를 만들어줘”  
- “analysis.html에 수익화 UI 3개를 추가해줘”  
- “style.css에 Product/Video/Mode Switcher 스타일을 추가해줘”  
- “js/app.js에 dummy 데이터와 student.html 렌더링 로직을 추가해줘”  

처럼 **단계별로 요청**하면,  
안티그래피티의 Implementation Plan이 그대로 코드로 구현됩니다.
