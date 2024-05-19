export default function numberToDuration(input: number) {
  const hours = Math.floor(input / 60);
  const minutes = input % 60;

  if (input === 0) {
    return "no data";
  }

  let result = "";

  if (hours !== 0) {
    result += hours + "h ";
  }

  if (minutes !== 0) {
    result += minutes + "m ";
  }

  return result.slice(0, -1);
}
