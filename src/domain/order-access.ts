export type Actor={id:string;role:'customer'|'tailor'|'admin'};
export function canViewOrder(actor:Actor,ownerId:string,tailorOwnerId:string):boolean{return actor.role==='admin'||(actor.role==='customer'&&actor.id===ownerId)||(actor.role==='tailor'&&actor.id===tailorOwnerId);}
