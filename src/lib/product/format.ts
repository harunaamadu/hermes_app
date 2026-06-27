export function formatPrice(value: number) {
  const [whole, fraction = "00"] = value.toFixed(2).split(".");
  return { whole, fraction };
}

export function calcDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}