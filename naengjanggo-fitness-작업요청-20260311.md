# naengjanggo-fitness 웹앱 – 코딩 작업 요청

## 1. 프로젝트 개요

- 프론트엔드 프로젝트 저장소  
  - GitHub: `https://github.com/texon-no1/-quickbill-app`
  - 메인 파일: `naengjanggo-fitness.html`  
  - 추가 JS: `attendance.js`
  - 호스팅: GitHub Pages URL  
    - `https://texon-no1.github.io/-quickbill-app/naengjanggo-fitness.html`
- 백엔드 API 프로젝트 저장소  
  - GitHub: `https://github.com/texon-no1/naengjanggo-fitness-api`
  - 파일: `server.js` (Node + Express 기반)
  - 역할:  
    - 주간 식단/운동 플랜(`weekly-plan`) 응답을 제공하는 백엔드 API  
    - 재료(ingredients) 정보를 포함한 응답 구조 확장

## 2. 현재 구조 및 작업 위치

1. **출석체크·로그인**  
   - 위치: `-quickbill-app` 저장소  
   - 파일:
     - `naengjanggo-fitness.html`
     - `attendance.js`
   - 기술:
     - Firebase Authentication (Google 로그인)
     - Firebase Firestore (출석체크/사용자 데이터)
   - 특징:
     - 출석체크·로그인 로직은 **프론트엔드에서 직접 Firebase를 호출**하는 방식으로 구현.
     - `naengjanggo-fitness-api`는 식단/운동 정보를 위한 별도 API로, 출석체크/로그인에는 사용되지 않음.

2. **주간 플랜 API**  
   - 위치: `naengjanggo-fitness-api` 저장소  
   - 파일: `server.js`  
   - 작업:  
     - `weekly-plan` 응답에 `ingredients` 필드 추가 (`feat: add ingredients per meal in weekly-plan response`)

---

## 3. 현재 문제점 (출석체크)

- 오늘 한 번 출석체크를 해도,  
  - 웹사이트에서 빠져나갔다가 다시 접속하면 **출석체크 팝업이 또 등장**.
- 의도하는 동작:
  - **하루에 한 번만** 출석체크 팝업이 뜨기  
  - 오늘 이미 체크한 경우 출석체크 UI/팝업을 **표시하지 않도록** 제어.

이 문제는 **Firebase Firestore에서 오늘 날짜 기준 출석체크 여부를 확인하는 로직이 부족**하거나,  
브라우저에서 “오늘 이미 체크했는지”를 상태로 관리하지 못하고 있기 때문에 발생할 가능성이 큽니다.

---

## 4. 요청 작업 목록 (도구별 분배 기준)

### 4.1 Perplexity Sonar – 하루 한 번 출석체크 패턴 조사

- **도구 사용 기준**:  
  - 최신 정보·공식 문서·샘플 코드 검색 → **Perplexity Sonar** 사용  
- **요청 내용**:
  - `Firebase Firestore attendance once per day` 패턴 검색  
  - 샘플 데이터 구조 예시 정리  
  - 클라이언트에서 “오늘 이미 출석체크 했는지”를 확인하는 패턴 정리  
  - 프론트엔드에서 참고 가능한 코드 스타일/예시 추출

---

### 4.2 Claude Sonnet 4.6 – Firebase + Firestore 로직 리팩토링

- **도구 사용 기준**:  
  - 복잡한 JS 구조, Firebase 연동, 로직 설계 → **Claude Sonnet 4.6** 사용  
- **요청 내용**:
  1. `-quickbill-app` 안의 다음 파일 분석:
     - `naengjanggo-fitness.html`
     - `attendance.js`
  2. **하루 한 번 출석체크를 위한 Firestore 구조 설계**:
     - 예: `attendance/{uid}/{date}` 문서 또는 `users/{uid}/attendance` 문서에 `date`/`timestamp` 저장  
  3. 로그인 직후:
     - 현재 날짜 기준으로 이미 출석체크 문서가 존재하는지 조회  
     - 존재하면 출석체크 팝업/버튼을 **숨기거나 비활성화**  
     - 존재하지 않으면 **팝업을 표시**  
  4. 날짜가 변경되면 다시 팝업이 표시되도록 처리  
  5. 불필요한 쿼리·Firebase 호출 최소화, 에러 핸들링 기본 구현  
  6. `attendance.js`와 `naengjanggo-fitness.html`의 로직을 최대한 유지하면서도,  
     - 모듈화/함수 분리로 가독성 향상

---

### 4.3 Gemini 2.5 Pro – 출석체크 UI/팝업 제어 코드 작성

- **도구 사용 기준**:  
  - HTML/CSS/JS UI 작업, 빠른 코드 생성 → **Gemini 2.5 Pro** 사용  
- **요청 내용**:
  1. 오늘 이미 출석체크한 경우:
     - 출석체크 팝업을 숨기거나 비활성화하는 코드  
     - “오늘 출석체크 완료” 안내 문구 표시  
  2. 오늘 출석체크 가능 상태인 경우:
     - 팝업이 표시되도록 만드는 코드  
  3. 모바일 환경에 맞는 반응형 UI/팝업 디자인도 함께 제안  

---

## 5. 로그인 및 로그인 관련 구조 확인 (보조 정보)

- 로그인은 Firebase Authentication을 사용해 **Google 로그인 방식**으로 구현되어 있음.  
- 이 로그인은 `naengjanggo-fitness.html` 내에서 JS로 직접 처리하고 있으며,  
  - `naengjanggo-fitness-api` 서버는 로그인 인증에 **연관되어 있지 않음**.  
- 로그인 자체는 정상 동작 중이며,  
  - 문제는 **로그인 이후의 출석체크 제어 로직**에 집중.

---

## 6. 로컬 파일 구조 및 참고 사항

- GitHub에서 어제까지 작업한 내용은 `C:` 드라이브에 `-quickbill-app` 전체 폴더로 복사된 상태  
- `naengjanggo-fitness-api`는 별도 백엔드 저장소로, 식단/운동 정보 API 제공 전용  
- 이 문서는:
  - `naengjanggo-fitness` 프로젝트의 **현재 구조 + 출석체크 문제 + 요청 작업**을 AntiGravity AI 에이전트에 전달하는 용도

필요 시:
- `naengjanggo-fitness.html`과 `attendance.js`의 **출석체크 부분 코드**를 직접 첨부해,  
  - 에이전트가 해당 코드를 기반으로 수정·추가 코드를 제안해 주도록 요청할 수 있음.

