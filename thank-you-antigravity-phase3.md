# 안티그래비티 답변 확인 및 추가 요청

## 1. 감사 인사

안티그래비티 AI 에이전트님,  
`네이버 쇼핑커넥트 제휴 상품 관리 시스템 구현 계획`을 **정리해 주셔서 감사합니다**.  
- `recommended_products` 컬렉션 설계  
- `admin.html` + `admin.js` 관리자 패널  
- `products.js` + `naengjanggo-fitness.html` 연동  
이 구조를 빠짐없이 잡아 주셔서, 이후 구현 단계도 매우 명확하게 따라갈 수 있을 것 같습니다.

## 2. 계획 내용 요약

### 2.1 Firestore 스키마

- `recommended_products` 컬렉션 생성  
- 필드:
  - `name`, `image_url`, `naver_link`, `category`, `description`, `order`, `visible`, `createdAt`  
- 이 구조로 관리하면,  
  - 추천 상품을 **범주별·순서별로 쉽게 관리**할 수 있습니다.

### 2.2 admin.html / admin.js

- Firebase Authentication 로그인 후, 관리자 전용 페이지  
- 기능:
  - 상품 목록 조회·필터링  
  - 추가/수정/삭제, `visible` 토글, `order` 설정  
- 이 구조면 **사용 편의성과 보안 두 가지 모두** 잘 관리됩니다.

### 2.3 사용자 화면 연동

- `products.js`에서 Firestore 데이터를 `getDocs`로 비동기 로드  
- `visible: true` + `order` 기준으로 정렬 후 표시  
- 추천 상품 카드 UI + “제휴 링크” 안내 문구 포함  
- 정책 준수도 같이 고려해 주셔서 안전합니다.

### 2.4 보안 및 검증

- `admin.html`은 **누구나 접근 불가**하도록 Firebase 보안 규칙 설정  
- 수동 테스트 항목도 정리해 주셔서,  
  - 이후 **직접 확인해가며 검증**하기에 좋습니다.

---

## 3. 추가로 요청드리는 부분

현재 계획은 이미 매우 잘 잡혀 있지만,  
아래 2가지만 더 구체적으로 정리해 주시면 큰 도움이 됩니다.

### 3.1 Firebase 보안 규칙 예시

- `recommended_products` 컬렉션에 대한 **Firestore 보안 규칙** 예시  
  - `get`, `list`, `create`, `update`, `delete` 권한을  
    - 관리자(특정 이메일/역할)만 허용하도록 설정하는 방식  
  - 예시 Rule 코드를  
    - `implementation_plan.md` 또는 `admin.js` 주석에 같이 넣어 주시면 좋습니다.

### 3.2 사용자 UI(카드)의 반응형 디자인

- `naengjanggo-fitness.html`에 들어가는  
  - 추천 상품 카드 UI 예시(HTML + CSS)  
  - 모바일에서도 잘 보이도록 `flex/grid` 기반으로 작성  
  - 카드 개수에 따라 `overflow`나 `grid` 자동 조정  
이 부분을 간단한 코드 블록으로 같이 넣어 주시면,  
- 나중에 디자인 수정 없이 바로 사용 가능합니다.

---

## 4. 향후 확장 예정

- 이후:
  - `recommended_products`와 레시피/식단을 연동해  
    - “이 레시피에 잘 맞는 상품” 3개 자동 추천  
  - 출석/레벨업 보상으로 “추천 상품 리스트” 제공  
같은 구조로 확장해 보려 합니다.

이 부분은 지금 계획에는 포함하지 않으셔도 되지만,  
- `recommended_products` 문서 구조나 `products.js` 설계가  
  - 향후 확장에도 문제가 없도록 잡아 주시면 좋겠습니다.

---

다시 한 번 깔끔하고 구조화된 설계를 제공해 주셔서 감사합니다.  
앞으로도 이 계획을 바탕으로 코드 구현을 부탁드립니다.
