/**
 * Dummy Verification API
 * GET /api/subscription/verify
 */
export default async function verify(paymentKey, orderId) {
    console.log(`[API] Verifying payment for Order: ${orderId}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                status: 'COMPLETED',
                plan: 'Pro'
            });
        }, 800);
    });
}
