import type {PortfolioItem} from './portfolio';
export function validatePortfolioItem(item:PortfolioItem):string|null{if(!item.title.trim()||!item.category.trim())return 'عنوان و دسته‌بندی الزامی هستند.';if(!/^https:\/\//i.test(item.imageUrl))return 'نشانی تصویر باید HTTPS باشد.';return null;}
