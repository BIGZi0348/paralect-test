import generateGenresString from "@/utils/generateGenresString";

describe("generateGenresString", () => {
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  test("Returns 'no data' if entered undefined", () => {
    expect(generateGenresString(undefined!, genres)).toBe("no data");
  });
  test("Returns 'no data' if entered []", () => {
    expect(generateGenresString([], genres)).toBe("no data");
  });
  test("Returns 'no data' if entered [999] // bad input", () => {
    expect(generateGenresString([999], genres)).toBe("no data");
  });
  test("Returns 'Action' if entered [28]", () => {
    expect(generateGenresString([28], genres)).toBe("Action");
  });
  test("Returns 'Action, Western' if entered [28, 37]", () => {
    expect(generateGenresString([28, 37], genres)).toBe("Action, Western");
  });
  test("Returns 'Action, Western' if entered [{ id: 28, name: 'Action' },{ id: 37, name: 'Western' }]", () => {
    expect(
      generateGenresString([
        { id: 28, name: "Action" },
        { id: 37, name: "Western" },
      ])
    ).toBe("Action, Western");
  });
});
