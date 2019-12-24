export function convertToVID(value: string | number): string {
  return (+value / 10 ** 18).toFixed(2);
}

export function VIDBalance(value: string | number): string {
  const balance =
    Math.floor((+value / 10 ** 18) * Math.pow(10, 4)) / Math.pow(10, 4);

  if (balance < 0) {
    return '0';
  }

  return balance.toString();
}

export function convertToWEI(value: string | number): string {
  return (+value * 10 ** 18).toString();
}
