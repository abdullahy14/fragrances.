import { api } from '../../services/api';

export default function CheckoutPage() {
  async function submit() {
    await api('/customer/checkout', { method: 'POST', body: JSON.stringify({ customerInfo: { email: 'customer@fragrance.local' }, shippingInfo: { address: 'Cairo' }, items: [{ productId: 'p1', price: 120, quantity: 1, itemCost: 65 }] }) });
    alert('Order created');
  }
  return <section><h1>Checkout</h1><button onClick={submit}>Place Order</button></section>;
}
