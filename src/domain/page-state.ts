export type LoadState<T>={status:'idle'}|{status:'loading'}|{status:'success';data:T}|{status:'error';message:string};
export function success<T>(data:T):LoadState<T>{return {status:'success',data};}
