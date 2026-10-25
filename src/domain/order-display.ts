import type {Order} from './orders';
export function summarizeOrder(order:Order):string{return order.description.trim().slice(0,85)+(order.description.length>85?'…':'');}
