export function trimNumber(number: number) {
  return (Math.round(100 * number) / 100).toFixed(2);
}
