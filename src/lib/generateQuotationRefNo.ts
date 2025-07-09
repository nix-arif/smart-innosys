export function constructAffirmaQuotationRefNo(
  count: number | undefined,
  username: string,
  agent: string
) {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  if (count === undefined) {
    return "";
  }
  const paddedNumber = String(count + 1).padStart(6, "0");
  if (agent === "affirma") {
    return `QAF/${currentYear}${paddedNumber}-${username.toUpperCase()}`;
  }
  return `QAF/${currentYear}${paddedNumber}`;
}

export function constructInnosysQuotationRefNo(
  count: number | undefined,
  username: string,
  agent: string
) {
  const currentYear = new Date().getFullYear().toString();
  if (count === undefined) {
    return "";
  }
  const paddedNumber = String(count + 1).padStart(6, "0");
  if (agent === "innosys") {
    return `QSI/${username.toUpperCase()}/${currentYear}-${paddedNumber}`;
  }
  return `QSI/${currentYear}-${paddedNumber}`;
}

export function constructBiomechQuotationRefNo(
  count: number | undefined,
  username: string,
  agent: string
) {
  const currentYear = new Date().getFullYear().toString();
  if (count === undefined) {
    return "";
  }
  const paddedNumber = String(count + 1).padStart(6, "0");
  if (agent === "biomech") {
    return `QBMS/${currentYear}/${paddedNumber}/${username.toUpperCase()}`;
  }
  return `QBMS/${currentYear}/${paddedNumber}`;
}
