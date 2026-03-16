/**
 * Dummy Checkout API
 * POST /api/subscription/checkout
 */
export default async function checkout(planId) {
    console.log(`[API] Initiating checkout for plan: ${planId}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                checkoutUrl: 'https://mock-payment-gateway.com/pay/12345',
                orderId: 'ORD-' + Math.random().toString(36).substr(2, 9)
            });
        }, 1000);
    });
}
