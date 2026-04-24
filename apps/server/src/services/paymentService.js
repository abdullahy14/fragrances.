import { db } from '../data/db.js';
import { brevoService } from './brevoService.js';

export const paymentService = {
  updateStatus(orderId, status) {
    const payment = db.payments.find((p) => p.orderId === orderId);
    const order = db.orders.find((o) => o.id === orderId);
    if (!payment || !order) return null;
    payment.status = status;
    order.paymentStatus = status;
    if (status === 'APPROVED') {
      brevoService.sendEmail({ to: order.customerInfo.email, subject: 'Payment approved', template: brevoService.templates.PAYMENT_CONFIRMATION, payload: { orderId } });
    }
    if (status === 'REJECTED') {
      brevoService.sendEmail({ to: order.customerInfo.email, subject: 'Payment rejected', template: brevoService.templates.PAYMENT_REJECTION, payload: { orderId } });
    }
    return payment;
  }
};
