export default function truncateString(string: string, length: number) {
  if (string.length > length) {
    return string.slice(0, length) + "...";
  } else {
    return string;
  }
}
