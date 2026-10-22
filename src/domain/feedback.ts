export type Feedback={tailorId:string;rating:number;comment:string};
export function validateFeedback(value:Feedback):string|null{if(!Number.isInteger(value.rating)||value.rating<1||value.rating>5)return 'امتیاز باید بین ۱ تا ۵ باشد.';if(value.comment.trim().length>1000)return 'نظر طولانی است.';return null;}
