export default function generateGenresString(
  genresData: any[],
  genres?: {
    id: number;
    name: string;
  }[]
) {
  if (genresData === undefined || genresData.length === 0) {
    return "no data";
  }

  let result = "";
  if (typeof genresData[0] === "number" && typeof genres !== "undefined") {
    for (let index = 0; index < genresData.length; index++) {
      const genre: number = genresData[index];
      const element = genres.find((element) => element.id === genre);
      if (typeof element === "undefined") {
        return "no data";
      } else {
        result = result + ", " + element.name;
      }
    }
  } else {
    for (let index = 0; index < genresData.length; index++) {
      const genre: { id: number; name: string } = genresData[index];
      result = result + ", " + genre.name;
    }
  }
  return result.substring(2);
}
