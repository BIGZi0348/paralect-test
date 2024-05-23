import truncateString from "@/utils/truncateString";

describe("truncateString", () => {
  test("Returns '1234' if entered '1234' and 4", () => {
    expect(truncateString("1234", 4)).toBe("1234");
  });
  test("Returns '123...' if entered '1234' and 3", () => {
    expect(truncateString("1234", 3)).toBe("123...");
  });
});
