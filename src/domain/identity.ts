export function initialsFromName(name:string):string {const parts=name.trim().split(/\s+/).filter(Boolean);return parts.slice(0,2).map(x=>Array.from(x)[0]).join('')||'؟';}
