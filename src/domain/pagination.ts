export type PageRequest={page:number;pageSize:number};
export function paginate<T>(items:readonly T[],{page,pageSize}:PageRequest):T[]{if(!Number.isSafeInteger(page)||page<1||!Number.isSafeInteger(pageSize)||pageSize<1)return [];return items.slice((page-1)*pageSize,page*pageSize);}
