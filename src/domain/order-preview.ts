import { type Order, type OrderDraft, validateOrderDraft } from './orders';
import { nextPreviewOrderId } from './order-id';
export function createPreviewOrder(draft: OrderDraft): Order {
  const error = validateOrderDraft(draft);
  if (error) throw new Error(error);
  return { ...draft, description:draft.description.trim(), id:nextPreviewOrderId(), status:'draft', createdAt:new Date().toISOString() };
}
