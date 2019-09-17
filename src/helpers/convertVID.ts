export default function convertVID(value: string | number) {
  return (+value / 10 ** 18).toFixed(2);
}
