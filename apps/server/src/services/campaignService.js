export const campaignService = {
  applyCampaigns(cartItems, campaigns) {
    let discount = 0;
    for (const campaign of campaigns.filter((c) => c.active)) {
      const eligible = cartItems.filter((i) => campaign.applicableProductIds?.includes(i.productId));
      const qty = eligible.reduce((sum, i) => sum + i.quantity, 0);
      if (campaign.minimumCartQuantity && qty < campaign.minimumCartQuantity) continue;

      if (campaign.type === 'PERCENTAGE') {
        const total = eligible.reduce((sum, i) => sum + i.price * i.quantity, 0);
        discount += (total * campaign.discountValue) / 100;
      }
      if (campaign.type === 'FIXED') discount += campaign.discountValue;
      if (campaign.type === 'BUY_X_GET_Y') {
        const setSize = campaign.buyQuantityX + campaign.freeQuantityY;
        const groups = Math.floor(qty / setSize);
        const cheapest = [...eligible].sort((a, b) => a.price - b.price)[0];
        discount += groups * campaign.freeQuantityY * (cheapest?.price || 0);
      }
    }
    return Math.max(discount, 0);
  }
};
