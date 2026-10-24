export function isNonEmptyString(value:unknown):value is string{return typeof value==='string'&&value.trim().length>0;}
export function isValidHttpsUrl(value:string):boolean{try{return new URL(value).protocol==='https:';}catch{return false;}}
