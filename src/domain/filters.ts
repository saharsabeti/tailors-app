import type {Tailor} from '../data/tailors';
export function filterByCity(items:readonly Tailor[],city:string):Tailor[]{return city?items.filter(item=>item.location===city):[...items];}
export function distinctCities(items:readonly Tailor[]):string[]{return [...new Set(items.map(i=>i.location))].sort((a,b)=>a.localeCompare(b,'fa'));}
