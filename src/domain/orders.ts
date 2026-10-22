export type OrderStatus = 'draft' | 'requested' | 'quoted' | 'accepted' | 'in_progress' | 'ready' | 'delivered' | 'cancelled';
export type OrderDraft = { tailorId: string; description: string; requestedDate?: string };
export type Order = OrderDraft & { id: string; status: OrderStatus; createdAt: string };
const transitions: Record<OrderStatus, readonly OrderStatus[]> = {
  draft: ['requested', 'cancelled'], requested: ['quoted', 'cancelled'],
  quoted: ['accepted', 'cancelled'], accepted: ['in_progress', 'cancelled'],
  in_progress: ['ready', 'cancelled'], ready: ['delivered'], delivered: [], cancelled: [],
};
export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return transitions[from].includes(to);
}
export function validateOrderDraft(value: OrderDraft): string | null {
  if (!value.tailorId.trim()) return 'خیاط انتخاب نشده است.';
  if (value.description.trim().length < 10) return 'توضیحات سفارش باید حداقل ۱۰ کاراکتر باشد.';
  if (value.description.length > 2000) return 'توضیحات سفارش بیش از حد طولانی است.';
  return null;
}
