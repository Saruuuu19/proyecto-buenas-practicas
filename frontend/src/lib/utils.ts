export function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}