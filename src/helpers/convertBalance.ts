export function convertToVID(value: string | number): string {
  return (+value / 10 ** 18).toFixed(2);
}

export function convertToWEI(value: string | number): string {
  return (+value * 10 ** 18).toString();
}
