import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric price into a consistent currency string (e.g. `$60`).
 * Safely handles missing or invalid input by falling back to `$0`.
 */
export function formatCurrency(value?: number | null): string {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return `$${amount.toLocaleString("en-US")}`;
}
