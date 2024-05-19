import numberToDuration from "@/utils/numberToDuration";

describe("numberToDuration", () => {
  test("Returns 'no data' if entered 0", () => {
    expect(numberToDuration(0)).toBe("no data");
  });
  test("Returns '1m' if entered 1", () => {
    expect(numberToDuration(1)).toBe("1m");
  });
  test("Returns '59m' if entered 59", () => {
    expect(numberToDuration(59)).toBe("59m");
  });
  test("Returns '1h' if entered 60", () => {
    expect(numberToDuration(60)).toBe("1h");
  });
  test("Returns '1h 1m' if entered 61", () => {
    expect(numberToDuration(61)).toBe("1h 1m");
  });
  test("Returns '2h 2m' if entered 122", () => {
    expect(numberToDuration(122)).toBe("2h 2m");
  });
});
