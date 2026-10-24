import type {OrderStatus} from './orders';
export type OrderAuditEntry={orderId:string;previous:OrderStatus;next:OrderStatus;at:string;actorId:string};
export function auditLabel(entry:OrderAuditEntry):string{return `${entry.previous} → ${entry.next}`;}
