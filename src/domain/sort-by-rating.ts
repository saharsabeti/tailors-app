import type {Tailor} from '../data/tailors';
import {parseRating} from './ratings';
export function sortByRating(items:readonly Tailor[]):Tailor[]{return [...items].sort((a,b)=>(parseRating(b.rating)??-1)-(parseRating(a.rating)??-1));}
