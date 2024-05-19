import numberToCount from "@/utils/numberToCount";

describe("numberToCount", () => {
  test("Returns '(0)' if entered undefined", () => {
    expect(numberToCount(undefined!)).toBe("(0)");
  });
  test("Returns '(0)' if entered null", () => {
    expect(numberToCount(null!)).toBe("(0)");
  });
  test("Returns '(0)' if entered 0", () => {
    expect(numberToCount(0)).toBe("(0)");
  });
  test("Returns '(1)' if entered 1", () => {
    expect(numberToCount(1)).toBe("(1)");
  });
  test("Returns '(100)' if entered 100", () => {
    expect(numberToCount(100)).toBe("(100)");
  });
  test("Returns '(1.5K)' if entered 1500", () => {
    expect(numberToCount(1500)).toBe("(1.5K)");
  });
  test("Returns '(123.4K)' if entered 123400", () => {
    expect(numberToCount(123400)).toBe("(123.4K)");
  });
  test("Returns '(1.0M)' if entered 1000000", () => {
    expect(numberToCount(1000000)).toBe("(1.0M)");
  });
  test("Returns '(1.0B)' if entered 1000000000", () => {
    expect(numberToCount(1000000000)).toBe("(1.0B)");
  });
});
