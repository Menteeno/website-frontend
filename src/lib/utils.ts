import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {lang} from '@/lib/lang'
import { Replacements } from 'lang.js';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function trans(key: string, params: Replacements | undefined = undefined) {
    return lang.get(key, params)
}

export function trans_choice(key: string, count: number, params: Replacements | undefined = undefined) {
    return lang.choice(key, count, params)
}
