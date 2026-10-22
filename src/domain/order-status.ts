import type { OrderStatus } from './orders';
export const orderStatusLabels: Record<OrderStatus,string> = { draft:'پیش‌نویس', requested:'درخواست‌شده', quoted:'قیمت‌گذاری‌شده', accepted:'تأییدشده', in_progress:'در حال دوخت', ready:'آماده تحویل', delivered:'تحویل‌شده', cancelled:'لغوشده' };
