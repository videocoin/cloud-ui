function truncateBalance(num: number, places = 2): number {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

export default truncateBalance;
