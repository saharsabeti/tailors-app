export function normalizeOrderDescription(text:string):string{return text.trim().replace(/\s+/g,' ');}
export function descriptionLength(text:string):number{return Array.from(normalizeOrderDescription(text)).length;}
