/**
 * products.js - 사용자 화면 제휴 상품 로드 및 렌더링
 */

async function loadRecommendedProducts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 로딩 표시 (선택 사항)
    container.innerHTML = '<div class="loading-products">상품을 불러오는 중...</div>';

    try {
        // Firebase 초기화 확인
        if (typeof db === 'undefined') {
            console.error("Firestore 'db' 객체가 정의되지 않았습니다.");
            container.innerHTML = '<div class="error-products">시스템 초기화 중... 잠시 후 다시 시도해 주세요.</div>';
            return;
        }

        // Firestore에서 visible: true인 상품만 가져오기 (인덱스 오류 방지를 위해 정렬은 메모리에서 수행)
        const querySnapshot = await db.collection('recommended_products')
            .where('visible', '==', true)
            .get();

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        // 클라이언트 사이드 정렬 (정렬 순서 기준)
        products.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

        if (products.length === 0) {
            container.innerHTML = '<div class="no-products">추천 상품이 준비 중입니다.</div>';
            return;
        }

        // 반응형 카드 UI 렌더링
        container.innerHTML = products.map(p => `
            <div class="product-card-v2">
                <div class="product-badge">추천 상품</div>
                <div class="product-img-wrap">
                    <img src="${p.image_url}" alt="${p.name}" class="product-img" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
                </div>
                <div class="product-info">
                    <h4 class="product-name">${p.name}</h4>
                    <p class="product-desc">${p.description || ''}</p>
                    <a href="${p.naver_link}" target="_blank" rel="noopener sponsored" class="product-link">
                        네이버에서 보기 🛒
                    </a>
                    <p class="affiliate-notice">제휴 링크를 통해 구매 시 수수료가 지급될 수 있습니다.</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("제휴 상품 로드 실패:", error);
        container.innerHTML = '<div class="error-products">상품을 불러오지 못했습니다.</div>';
    }
}

// 초기 로딩 시 실행될 수 있도록 함수 노출
window.loadRecommendedProducts = loadRecommendedProducts;
