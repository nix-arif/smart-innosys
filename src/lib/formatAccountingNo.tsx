export const formatAccounting = (value: number): string => {
  const absValue = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `(${absValue})` : absValue;
};
