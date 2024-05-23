// Couldn't find any better way then manually search for min/max release year

export default function generateArrayOfYears() {
  const arr = [];

  for (let index = 0; index < 158; index++) {
    const temp = (2031 - index).toString();
    arr.push({ label: temp, value: temp });
  }

  return arr;
}
