// Número de orden con dos cifras: 0 -> '01'.
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}
