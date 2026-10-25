import type {Tailor} from '../data/tailors';
export function sortTailorsByName(items:readonly Tailor[]):Tailor[]{return [...items].sort((a,b)=>a.name.localeCompare(b.name,'fa'));}
