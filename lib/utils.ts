import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric price as a consistent currency string (e.g. 60 -> "$60").
 * Returns an empty string when the price is missing or not a finite number.
 */
export function formatPrice(price?: number | null): string {
  if (price === undefined || price === null || !Number.isFinite(price)) {
    return "";
  }
  return `$${price}`;
}
