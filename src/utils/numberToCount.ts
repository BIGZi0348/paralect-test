export default function numberToCount(input: number) {
  if (input === null || input === undefined) {
    return "(0)";
  }

  const result =
    Math.abs(input) >= 1.0e9
      ? (Math.abs(input) / 1.0e9).toFixed(1) + "B"
      : // six zeroes for millions
      Math.abs(input) >= 1.0e6
      ? (Math.abs(Number(input)) / 1.0e6).toFixed(1) + "M"
      : // three zeroes for thousands
      Math.abs(input) >= 1.0e3
      ? (Math.abs(input) / 1.0e3).toFixed(1) + "K"
      : Math.abs(input);

  return "(" + result + ")";
}
