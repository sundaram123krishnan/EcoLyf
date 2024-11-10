import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function arraySum(numbers: number[]): number {
	return numbers.reduce((sum, num) => sum + num, 0);
}
