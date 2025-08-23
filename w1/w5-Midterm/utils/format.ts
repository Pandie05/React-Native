// utils/format.ts
export const formatPrice = (p: number | string | undefined | null) => {
  const n = Number(p);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : "—";
};
