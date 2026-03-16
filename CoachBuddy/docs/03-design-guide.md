# CoachBuddy Design System Guide (High-Contrast Dark Theme)

이 문서는 CoachBuddy 애플리케이션의 고대비 다크 테마 디자인 시스템에 대한 가이드라인을 제공합니다.

---

## 1. Design Principles (디자인 원칙)

- **High Contrast (고대비)**: 순수 블랙 배경과 형광 라임색 포인트 컬러를 사용하여 가독성과 전문성을 극대화합니다.
- **Glassmorphism (글래스모피즘)**: 헤더와 모달 등에 반투명 블러 효과를 적용하여 깊이감을 부여합니다.
- **Micro-interactions (마이크로 인터랙션)**: 선명한 호버 상태 변화와 부드러운 트랜지션으로 사용자 경험을 개선합니다.

---

## 2. Color Tokens (색상 토큰)

| 토큰명 | 색상값 | 용도 |
| :--- | :--- | :--- |
| `--primary-color` | `#C6FF00` (Lime) | 주요 포인트 컬러, 버튼, 강조 텍스트 |
| `--primary-dark` | `#A5D600` | 버튼 호버 상태 |
| `--bg-dark` | `#000000` | 기본 배경색 |
| `--bg-card` | `#0D0D0D` | 카드 및 섹션 배경색 |
| `--border-color` | `#222222` | 구분선 및 테두리 |
| `--text-main` | `#FFFFFF` | 기본 텍스트 |
| `--text-secondary`| `#E0E0E0` | 보조 설명 텍스트 |
| `--text-muted` | `#888888` | 비활성 또는 부가 정보 |

---

## 3. Typography (타이포그래피)

- **Font Family**: `Inter`, sans-serif
- **Levels**:
  - `h1`: `clamp(2.5rem, 5vw, 4rem)`, 900 weight, -2px tracking
  - `h2`: `2.2rem`, 800 weight
  - `h3`: `1.5rem`, 700 weight
- **Utilities**:
  - `.text-small`: `0.9rem`
  - `.text-muted`: 보조 설명용 회색조
  - `.text-primary`: 라임색 강조용

---

## 4. Components (주요 컴포넌트)

### Cards
- **Normal**: `background: var(--bg-card); border: 1px solid var(--border-color);`
- **Hover**: `border-color: var(--primary-color); transform: translateY(-4px);`

### Buttons
- **Primary**: `background: var(--primary-color); color: #000; font-weight: 600;`
- **Secondary**: `background: #222; color: var(--text-main);`
- **Pro Badge**: `background: var(--primary-color); color: #000; font-weight: 900;`

### Headers & Modals
- **Glass Effect**: `background: var(--glass-bg); backdrop-filter: var(--glass-blur);`

---

## 5. Maintenance Strategy (유지보수 전략)

- **Do Not Use Inline Styles**: 모든 스타일은 `style.css`에서 정의된 변수와 클래스를 사용해야 합니다.
- **Utility Classes**: 여백(`mb-1`, `mt-1`), 정렬(`text-left`), 너비(`w-full`) 등 공통 유틸리티를 활용하여 일관성을 유지합니다.
- **Constraint**: 색상을 직접 코드(`HEX`, `RGB`)로 입력하는 대신 반드시 `var(--...)` 토큰을 사용하세요.
