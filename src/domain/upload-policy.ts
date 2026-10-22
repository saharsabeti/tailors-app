export const MAX_PORTFOLIO_IMAGE_BYTES=8*1024*1024;
export const allowedImageMimeTypes=['image/jpeg','image/png','image/webp'] as const;
export function canUploadImage(mime:string,size:number):boolean{return allowedImageMimeTypes.some(type=>type===mime)&&Number.isSafeInteger(size)&&size>0&&size<=MAX_PORTFOLIO_IMAGE_BYTES;}
