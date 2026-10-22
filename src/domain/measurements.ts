export type Measurement={label:string;centimeters:number};
export function validateMeasurement(value:Measurement):boolean{return value.label.trim().length>0&&Number.isFinite(value.centimeters)&&value.centimeters>0&&value.centimeters<=300;}
