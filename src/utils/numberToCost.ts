export default function numberToCost(input: number) {
  if (input === 0) {
    return "no data";
  }
  // i hecking love regex
  return "$" + input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
