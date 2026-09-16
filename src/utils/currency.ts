// Australian locale → comma thousands separators (1,250,000). The `$` is a UI
// adornment, so the formatter emits digits only (no currency style).
export const LOCALE = 'en-AU';

const nf = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

// Integer → grouped digits. null/NaN render as empty (nothing to show).
export function formatCurrency(n: number | null) {
  return n === null || Number.isNaN(n) ? '' : nf.format(n);
}

// Any typed/pasted string → raw integer. Cents are dropped (truncate at the
// first decimal point) so a pasted "$1,250,000.00" reads as 1,250,000 rather
// than being inflated by the trailing "00"; the remaining symbol/separators are
// stripped. Empty (no digits) becomes null.
export function parseCurrency(str: string) {
  const [integerPart] = String(str).split('.');
  const digits = integerPart?.replace(/\D/g, '');
  return digits === '' ? null : Number(digits);
}
