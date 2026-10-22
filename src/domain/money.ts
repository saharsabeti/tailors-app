export function formatToman(value: number): string {
  if (!Number.isFinite(value) || value < 0) return 'مبلغ نامعتبر';
  return `${new Intl.NumberFormat('fa-IR', { maximumFractionDigits:0 }).format(value)} تومان`;
}
