export async function processCheckout(cartItems: any[], userInfo: any) {
  // Simulated checkout logic
  return {
    success: true,
    message: 'Order placed successfully!',
    orderId: Math.floor(Math.random() * 1000000),
    user: userInfo,
    items: cartItems,
  };
}
