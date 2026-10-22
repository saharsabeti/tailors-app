import type{Order}from './orders';
export function countByStatus(orders:readonly Order[]):Record<string,number>{return orders.reduce<Record<string,number>>((result,order)=>{result[order.status]=(result[order.status]??0)+1;return result;},{});}
