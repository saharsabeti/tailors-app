export type QuoteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';
export type Quote = { id: string; orderId: string; amountToman: number; deliveryDays: number; status: QuoteStatus };
export function validateQuote(quote: Quote): string | null {
  if (!Number.isSafeInteger(quote.amountToman) || quote.amountToman <= 0) return 'مبلغ پیشنهاد معتبر نیست.';
  if (!Number.isInteger(quote.deliveryDays) || quote.deliveryDays < 1) return 'زمان تحویل معتبر نیست.';
  return null;
}
