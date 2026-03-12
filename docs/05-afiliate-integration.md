# docs/05-afiliate-integration.md

## 1. 목표

- CoachBuddy에 **냉장고파먹기 앱에서 사용한 쿠팡 파트너스·네이버 스토어 연동 방식**을 그대로 재사용
- 구조:
  - AI 분석 결과에 따라 “추천 상품/장비/영양제”를 표시
  - 각 상품은 쿠팡 파트너스 링크 또는 네이버 스토어 링크로 연결
  - 실제 발생 수수료는 쿠팡/네이버 플랫폼에서 자동으로 처리되도록 설계

---

## 2. 연동 방식 개요 (냉장고파먹기 기준)

냉장고파먹기에서 사용한 구조는 다음과 같습니다.

- 상품 데이터는 `app.js`에 더미 객체 배열로 정의:
  - `const shopItems = [...]`
  - 각 항목은:
    - ID, 이름, 카테고리, 이미지, 설명, 쿠팡/네이버 URL, `isCoupang` 플래그
- UI는:
  - `.product-card` 컴포넌트에서
    - `a` 태그에 `href="{item.affiliateUrl}"`을 바인딩
    - `target="_blank"` 속성 추가
- CSS는:
  - `.product-card`에
    - 이미지, 텍스트, 버튼으로 구성
    - 카드형 레이아웃 + 반응형

이 구조를 CoachBuddy에도 그대로 가져다 쓰고,  
AI 추천 샵 카드에 동일 스타일/데이터 구조를 적용합니다.

---

## 3. 적용 대상 페이지

아래 페이지들에 동일 구조를 적용해 주세요.

- `student.html`
  - AI 추천 샵(affiliate shop) 섹션
- `analysis.html`
  - 메트릭 하단에 “AI 추천 상품” 카드
- 필요 시 `index.html` 또는 `welcome.html`에
  - 일부 프로모션용 상품 카드

---

## 4. 1단계: js/app.js에 상품 데이터 구조 정의

### 4.1. `shopItems` 배열 정의

```js
// app.js

const shopItems = [
  {
    id: "SUP001",
    category: "nutrition",
    name: "하체 근력 강화 단백질",
    description: "하체 근력 강화에 도움을 주는 단백질 보충제",
    image: "/assets/products/protein.jpg",
    isCoupang: true,
    affiliateUrl: "https://link.coupang.com/...",
    label: "쿠팡 파트너스"
  },
  {
    id: "EQU001",
    category: "equipment",
    name: "무릎 보호대",
    description: "농구 경기 중 무릎 보호를 위한 보호대",
    image: "/assets/products/knee-guard.jpg",
    isCoupang: false,
    affiliateUrl: "https://store.naver.com/...",
    label: "네이버 스토어"
  },
  {
    id: "ECO001",
    category: "economy",
    name: "가성비 런닝화",
    description: "가성비 뛰어난 농구/러닝용 신발",
    image: "/assets/products/running-shoes.jpg",
    isCoupang: true,
    affiliateUrl: "https://link.coupang.com/...",
    label: "쿠팡 파트너스"
  }
];
