/**
 * CoachBuddy Payment SDK Mock
 * 실제 Toss Payments / KakaoPay SDK의 인터페이스를 시뮬레이션합니다.
 */

const PaymentSDK = {
    isInitialized: false,

    /**
     * SDK 초기화 시뮬레이션
     */
    init: function () {
        return new Promise((resolve) => {
            console.log("[MockSDK] Initializing...");
            setTimeout(() => {
                this.isInitialized = true;
                console.log("[MockSDK] Initialized successfully.");
                resolve(true);
            }, 500);
        });
    },

    /**
     * 결제창 모달 오픈 시뮬레이션
     */
    requestPayment: function (paymentConfig) {
        return new Promise((resolve, reject) => {
            if (!this.isInitialized) {
                return reject({ error: "SDK_NOT_INITIALIZED" });
            }

            console.log("[MockSDK] Opening payment modal for:", paymentConfig);
            this._showModal(paymentConfig, resolve, reject);
        });
    },

    /**
     * 내부 모달 UI 생성 및 비동기 처리
     */
    _showModal: function (config, resolve, reject) {
        const modalId = 'payment-mock-modal';
        if (document.getElementById(modalId)) return;

        const modalHtml = `
            <div id="${modalId}" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px);">
                <div style="background:#0D0D0D; border:1px solid #C6FF00; padding:2.5rem; border-radius:24px; max-width:400px; width:90%; color:white; text-align:center; box-shadow:0 20px 50px rgba(0,0,0,0.5);">
                    <div style="font-size:3rem; margin-bottom:1rem;">💳</div>
                    <h3 style="color:#C6FF00; margin-bottom:0.5rem; font-size:1.5rem;">Pro 플랜 결제 (테스트)</h3>
                    <p style="color:#888; margin-bottom:2rem; font-size:0.9rem;">이것은 실제 결제가 아닌 시뮬레이션입니다.</p>
                    
                    <div style="background:#1a1a1a; padding:1rem; border-radius:12px; margin-bottom:2rem; text-align:left;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                            <span style="color:#888;">상품명</span>
                            <span>${config.orderName}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-weight:bold;">
                            <span style="color:#888;">결제 금액</span>
                            <span style="color:#C6FF00;">${config.amount.toLocaleString()}원</span>
                        </div>
                    </div>

                    <div style="display:grid; gap:0.75rem;">
                        <button id="mock-pay-success" style="background:#C6FF00; color:black; border:none; padding:1rem; border-radius:12px; font-weight:bold; cursor:pointer;">결제 승인 (성공)</button>
                        <button id="mock-pay-fail" style="background:#ff4444; color:white; border:none; padding:1rem; border-radius:12px; font-weight:bold; cursor:pointer;">결제 에러 (실패)</button>
                        <button id="mock-pay-cancel" style="background:#333; color:white; border:none; padding:1rem; border-radius:12px; font-weight:bold; cursor:pointer;">취소하기</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const closeModal = () => {
            const el = document.getElementById(modalId);
            if (el) el.remove();
        };

        document.getElementById('mock-pay-success').onclick = () => {
            console.log("[MockSDK] Payment success");
            closeModal();
            resolve({
                status: "success",
                orderId: config.orderId,
                paymentKey: "mock_pk_" + Date.now(),
                amount: config.amount,
                method: config.method
            });
        };

        document.getElementById('mock-pay-fail').onclick = () => {
            console.log("[MockSDK] Payment failed");
            closeModal();
            reject({ error: "PAYMENT_FAILED", message: "카드사 승인 거절 (테스트 코드)" });
        };

        document.getElementById('mock-pay-cancel').onclick = () => {
            console.log("[MockSDK] Payment cancelled");
            closeModal();
            reject({ error: "USER_CANCELLED", message: "사용자가 결제를 취소했습니다." });
        };
    }
};

// 전역 변수로 노출 (TossPayments처럼 접근 가능하도록 함)
window.PaymentSDK = PaymentSDK;
