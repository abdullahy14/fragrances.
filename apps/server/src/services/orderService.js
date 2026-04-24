import { db, createId } from '../data/db.js';
import { PAYMENT_STATUS, ORDER_STATUS, SHIPPING_STATUS } from '../utils/enums.js';
import { campaignService } from './campaignService.js';
import { brevoService } from './brevoService.js';

export const orderService = {
  createOrder(userId, payload) {
    const subtotal = payload.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = campaignService.applyCampaigns(payload.items, db.campaigns);
    const total = Math.max(subtotal - discount, 0);
    const order = {
      id: createId('ord'),
      userId,
      items: payload.items,
      customerInfo: payload.customerInfo,
      shippingInfo: payload.shippingInfo,
      status: ORDER_STATUS.PENDING,
      shippingStatus: SHIPPING_STATUS.NOT_SHIPPED,
      paymentStatus: PAYMENT_STATUS.PENDING,
      subtotal,
      discount,
      total,
      createdAt: new Date().toISOString()
    };
    db.orders.push(order);
    db.payments.push({ id: createId('pay'), orderId: order.id, status: PAYMENT_STATUS.PENDING, amount: total });
    db.shippings.push({ id: createId('ship'), orderId: order.id, status: SHIPPING_STATUS.NOT_SHIPPED });
    brevoService.sendEmail({ to: payload.customerInfo.email, subject: 'Order confirmation', template: brevoService.templates.ORDER_CONFIRMATION, payload: { orderId: order.id } });
    return order;
  }
};
