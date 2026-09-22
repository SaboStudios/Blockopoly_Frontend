import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price?: number | null) {
  if (price === undefined || price === null || Number.isNaN(price)) {
    return "—"
  }
  return `$${price}`
}
