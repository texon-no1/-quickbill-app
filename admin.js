/**
 * admin.js - 관리자 패널 로직
 */

// naengjanggo-fitness.html에 있는 Firebase 설정을 동일하게 가져옵니다.
const firebaseConfig = {
    apiKey: "AIzaSyCbqYYIjXDEsM10bC8HxvG3s3ZqoeKi3TA",
    authDomain: "zolaman-diet.firebaseapp.com",
    projectId: "zolaman-diet",
    storageBucket: "zolaman-diet.firebasestorage.app",
    messagingSenderId: "672708651050",
    appId: "1:672708651050:web:19e4141cf805464b4ebb53",
    measurementId: "G-9PYEVTVDP8"
};

// **중요**: 실제 앱에서는 API Key가 코드에 포함되어 있으므로, 
// 여기서도 naengjanggo-fitness.html의 설정을 참조하도록 구현합니다.
// (나중에 빌드 시스템이 있다면 환경변수를 쓰겠지만, 현재는 Vanilla JS 환경임)

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// UI Elements
const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const loadingOverlay = document.getElementById('loading');
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');

// State
let allProducts = [];

// 1. 인증 상태 감시
auth.onAuthStateChanged((user) => {
    if (user) {
        // [보안] 특정 관리자 이메일 검사 추가 가능
        console.log("Logged in as:", user.email);
        loginSection.classList.add('hidden');
        adminSection.classList.remove('hidden');
        loadProducts();
    } else {
        loginSection.classList.remove('hidden');
        adminSection.classList.add('hidden');
    }
});

// 2. 로그인/로그아웃
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(e => alert("로그인 실패: " + e.message));
}

function logout() {
    if (confirm("로그아웃 하시겠습니까?")) auth.signOut();
}

// 3. 상품 목록 로드
async function loadProducts() {
    showLoading(true);
    try {
        const snapshot = await db.collection('recommended_products').orderBy('order', 'asc').get();
        allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderProductList();
    } catch (e) {
        console.error("상품 로드 에러:", e);
        alert("상품을 불러오지 못했습니다. Firestore 보안 규칙을 확인해 주세요.");
    }
    showLoading(false);
}

// 4. 상품 목록 렌더링
function renderProductList() {
    if (allProducts.length === 0) {
        productList.innerHTML = `<div class="p-8 text-center text-gray-400 bg-white rounded-2xl shadow-sm">등록된 상품이 없습니다.</div>`;
        return;
    }

    productList.innerHTML = allProducts.map(p => `
        <div class="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 mb-3 border ${p.visible ? '' : 'bg-gray-50 opacity-60'}">
            <img src="${p.image_url}" class="w-16 h-16 rounded-lg object-cover bg-gray-100" onerror="this.src='https://via.placeholder.com/100?text=No+Img'">
            <div class="flex-1">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${p.category}</span>
                    <span class="text-xs font-bold ${p.visible ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded">${p.visible ? '공개' : '비공개'}</span>
                    <span class="text-xs text-gray-400">순서: ${p.order}</span>
                </div>
                <h3 class="font-bold text-gray-800">${p.name}</h3>
                <p class="text-xs text-gray-500 truncate max-w-[200px]">${p.naver_link}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="editProduct('${p.id}')" class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">편집</button>
                <button onclick="deleteProduct('${p.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">삭제</button>
            </div>
        </div>
    `).join('');
}

// 5. 상품 저장 (추가/수정)
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('edit-id').value;

    const productData = {
        name: document.getElementById('p-name').value,
        category: document.getElementById('p-category').value,
        image_url: document.getElementById('p-image').value,
        naver_link: document.getElementById('p-link').value,
        description: document.getElementById('p-desc').value,
        order: Number(document.getElementById('p-order').value) || 1,
        visible: document.getElementById('p-visible').checked,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    showLoading(true);
    try {
        if (editId) {
            await db.collection('recommended_products').doc(editId).update(productData);
            alert("상품이 수정되었습니다.");
        } else {
            productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('recommended_products').add(productData);
            alert("새 상품이 등록되었습니다.");
        }
        resetForm();
        loadProducts();
    } catch (e) {
        console.error("저장 에러:", e);
        if (e.code === 'permission-denied') {
            alert("저장 실패: 권한이 없습니다.\nFirebase Console에서 보안 규칙(Security Rules)에 본인의 이메일(" + currentUser.email + ")이 등록되어 있는지 확인해 주세요.");
        } else {
            alert("저장 실패: " + e.message);
        }
    }
    showLoading(false);
});

// 6. 편집 모드 전환
function editProduct(id) {
    const p = allProducts.find(x => x.id === id);
    if (!p) return;

    document.getElementById('edit-id').value = p.id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-image').value = p.image_url;
    document.getElementById('p-link').value = p.naver_link;
    document.getElementById('p-desc').value = p.description || "";
    document.getElementById('p-order').value = p.order;
    document.getElementById('p-visible').checked = p.visible;

    btnSubmit.innerText = "수정하기";
    btnCancel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 7. 삭제
async function deleteProduct(id) {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;

    showLoading(true);
    try {
        await db.collection('recommended_products').doc(id).delete();
        loadProducts();
    } catch (e) {
        alert("삭제 실패: " + e.message);
    }
    showLoading(false);
}

// 유틸리티
function resetForm() {
    productForm.reset();
    document.getElementById('edit-id').value = "";
    btnSubmit.innerText = "상품 저장";
    btnCancel.classList.add('hidden');
}

function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}
