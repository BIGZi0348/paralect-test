import numberToCost from "@/utils/numberToCost";

describe("numberToCost", () => {
  test("Returns 'no data' if entered 0", () => {
    expect(numberToCost(0)).toBe("no data");
  });
  test("Returns '$1' if entered 1", () => {
    expect(numberToCost(1)).toBe("$1");
  });
  test("Returns '$10' if entered 10", () => {
    expect(numberToCost(10)).toBe("$10");
  });
  test("Returns '$100' if entered 100", () => {
    expect(numberToCost(100)).toBe("$100");
  });
  test("Returns '$1,000' if entered 1000", () => {
    expect(numberToCost(1000)).toBe("$1,000");
  });
  test("Returns '$10,000' if entered 10000", () => {
    expect(numberToCost(10000)).toBe("$10,000");
  });
  test("Returns '$100,000' if entered 100000", () => {
    expect(numberToCost(100000)).toBe("$100,000");
  });
  test("Returns '$1,000,000' if entered 1000000", () => {
    expect(numberToCost(1000000)).toBe("$1,000,000");
  });
});
