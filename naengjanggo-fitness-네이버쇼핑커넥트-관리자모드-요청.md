# naengjanggo-fitness – 네이버 쇼핑커넥트 제휴 상품 관리자 모드 구축 요청

## 1. 프로젝트 개요

- 프로젝트 이름: `naengjanggo-fitness` (냉장고 피트니스 웹앱)  
- 저장소: `https://github.com/texon-no1/-quickbill-app`  
- 메인 파일: `naengjanggo-fitness.html`  
- 기술 스택:
  - Firebase Authentication (Google 로그인)
  - Firebase Firestore (사용자 데이터, 출석체크 등)
  - Vanilla HTML/CSS/JS
  - GitHub Pages 호스팅 (`https://texon-no1.github.io/-quickbill-app/naengjanggo-fitness.html`)

## 2. 요청 목적

- 현재 네이버 쇼핑커넥트로 발급받은 **제휴 링크를 `naengjanggo-fitness` 앱 내부에서 자동으로 관리·표시**하도록 만들고자 합니다.  
- 지금은 수동으로 HTML에 링크를 넣고 있지만,  
  - 앞으로는 **관리자 패널에서 상품을 추가하면, 앱 화면에 자동으로 표시**되도록 설계하고 싶습니다.  

## 3. 원하는 동작 방향

1. **관리자 모드 (관리자 패널)**
   - `admin.html` 또는 별도 관리자 페이지를 생성.
   - Firebase 로그인으로 **관리자 전용 기능**을 제한.
   - `recommended_products` 컬렉션을 관리:
     - 상품 추가/수정/삭제 가능.
     - 필드 예시:
       - `name` (제품명)
       - `image_url` (상품 이미지 URL)
       - `naver_link` (네이버 쇼핑커넥트 제휴 링크)
       - `category` (예: `protein`, `snack`, `equipment`)
       - `order` (정렬 순서)
       - `visible` (true/false)

2. **앱 (사용자 화면)**
   - `naengjanggo-fitness.html`에서  
     - Firestore의 `recommended_products` 컬렉션을 `onSnapshot` 또는 `getDocs`로 읽음.
     - `visible: true`인 상품만 필터링.
     - 레시피/식단 화면 옆에 **동적으로 상품 카드·버튼을 생성**.
   - 사용자가 클릭하면 **네이버 쇼핑커넥트 링크로 이동** (외부 브라우저 열림).

3. **네이버 쇼핑커넥트 관련 정책 준수**
   - 제휴 링크임을 명확히 표시 (예: `제휴 링크` 라벨 또는 작은 문구).
   - `이 링크로 구매 시, 수수료가 지급됩니다.` 같은 안내문 포함.

## 4. 구체 요청 내용

다음 3가지 파일에 대한 **코드 설계 및 구현**을 요청합니다.

### 4.1 Firestore 컬렉션 Schema 설계

- `recommended_products` 컬렉션의 구조를 정의해 주세요:
  - 샘플 필드 이름, 타입, 예시 값.
  - `visible` 필드로 공개/비공개 제어.
  - `order` 필드로 정렬.

### 4.2 admin.html (관리자 패널)

- `admin.html` 파일을 생성해 주세요:
  - Firebase 로그인으로 접근 제한.
  - `recommended_products` 컬렉션을 읽어와 표시.
  - `추가`, `편집`, `삭제` 기능을 제공:
    - 입력 폼: `name`, `image_url`, `naver_link`, `category`, `order`, `visible`.
    - CRUD 작업을 Firestore에 반영.
  - 간단한 UI/스타일도 함께 포함 (모바일에 잘 보이는 반응형).

### 4.3 naengjanggo-fitness.html (사용자 화면)

- `naengjanggo-fitness.html`에 다음을 추가해 주세요:
  - `recommended_products` 컬렉션을 읽어오는 로직.
  - `forEach`로 HTML DOM을 동적으로 생성:
    - `naver_link`를 `a` 태그에 넣어, `target="_blank"`로 새 창 열기.
    - `제휴 링크` 표시 라벨 포함.
  - 레시피/식단 화면에 적절한 위치에 **추천 상품 카드** 배치.

### 4.4 코드 스타일 및 주의사항

- 가능한 한 기존 `naengjanggo-fitness.html`의 구조를 유지.
- `attendance.js`와 분리 가능한 부분은 별도 JS 파일로 분리.
- Firestore 쿼리 최소화, `onSnapshot` 대신 `getDocs`로도 구현 가능하도록 설계.
- 제휴 링크를 **자동 클릭시키지 않고**, 사용자가 의도적으로 클릭하도록 설계.

## 5. 출력 예상 형식

다음 3가지 파일을 모두 포함하는 형태로 작성해 주세요:

1. `admin.html` 전체 코드 블록  
2. `administrator.js` 또는 `recommended-products.js` (옵션)  
3. `naengjanggo-fitness.html`에 추가되는 코드 블록  
4. Firestore 컬렉션 구조 설명 (예: `recommended_products` 필드 목록 + 예시 문서)

또한, 각 함수에 `//`로 간단한 주석을 포함해 주시면 좋습니다:
- `// 제휴 상품 컬렉션 읽기`
- `// 관리자 패널 CRUD 로직`

## 6. 참고 (이미 진행된 사항)

- 현재 네이버 쇼핑커넥트 제휴 링크는 이미 발급되어 있음.
- `attendance.js`와 `naengjanggo-fitness.html`에 Firestore/출석 로직이 이미 존재함.
- 관리자 모드는 새 `admin.html` 또는 `naengjanggo-fitness.html` 내부에 분리된 섹션으로 구현해 주셔도 됩니다.
# naengjanggo-fitness – 네이버 쇼핑커넥트 추천 상품 예시 및 UI 구조

## 1. Firestore 컬렉션: `recommended_products` 예시 문서

`recommended_products` 컬렉션에는 아래와 같은 형태의 문서를 저장하고자 합니다.  
AntiGravity AI 에이전트께서는 이 구조를 기준으로 **Firestore Schema 및 CRUD 코드**를 설계해 주시면 됩니다.

### 1.1 전체 컬렉션 설명

- 컬렉션 이름: `recommended_products`
- 역할:  
  - 네이버 쇼핑커넥트 제휴 상품을 저장하는 컬렉션  
  - `naengjanggo-fitness.html`에서 `visible: true`인 상품만 읽어와 UI에 표시  
  - `admin.html`에서 관리자가 추가/수정/삭제

### 1.2 예시 문서 1 (프로틴 바)

```json
{
  "name": "프로틴 바 12입 (고단백, 저칼로리)",
  "image_url": "https://shopping-phinf.pstatic.net/.../protein-bar.png",
  "naver_link": "https://shopping.naver.com/.../product/protein-bar",
  "category": "protein",
  "order": 1,
  "visible": true,
  "description": "운동 후 간편하게 먹을 수 있는 고단백 프로틴 바"
}

