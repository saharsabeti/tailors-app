export function tomanToRial(toman:number):number|null{return Number.isSafeInteger(toman)&&toman>=0&&Number.isSafeInteger(toman*10)?toman*10:null;}
