import { db } from '../data/db.js';

export const financialService = {
  computeDashboard() {
    const revenue = db.orders.reduce((sum, o) => sum + o.total, 0);
    const cogs = db.orders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.itemCost * i.quantity, 0), 0);
    const expenses = db.expenses.filter((e) => e.type === 'OPERATIONAL').reduce((sum, e) => sum + e.amount, 0);
    const fundedCapital = db.capitalEntries.reduce((sum, c) => sum + c.amount, 0);
    const netProfit = revenue - cogs - expenses;
    const netPosition = fundedCapital + netProfit;
    const activeCampaigns = db.campaigns.filter((c) => c.active).length;
    return { fundedCapital, revenue, expenses, netProfit, netPosition, costOfGoodsSold: cogs, activeCampaigns };
  }
};
