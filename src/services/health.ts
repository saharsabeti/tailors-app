import { API_BASE_URL } from '../config/api';
export type Connectivity = { ok: boolean; message: string };
export async function checkBackendConnection(signal?: AbortSignal): Promise<Connectivity> {
  const base = API_BASE_URL.trim().replace(/\/+$/, '');
  if (!base) return {ok:false,message:'آدرس بک‌اند تنظیم نشده؛ برنامه در حالت نمایشی است.'};
  try {
    // Keep route aligned with the actual list call; do not assume a /health endpoint exists.
    const response = await fetch(base+'/api/v1/tailors', {method:'GET',signal,headers:{Accept:'application/json'}});
    return response.ok ? {ok:true,message:'ارتباط با API برقرار شد.'} : {ok:false,message:`خطای API: ${response.status}`};
  } catch(e) {
    if(signal?.aborted) throw e;
    return {ok:false,message:'ارتباط با سرور برقرار نشد.'};
  }
}
