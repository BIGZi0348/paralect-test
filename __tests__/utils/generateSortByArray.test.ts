import generateSortByArray from "@/utils/generateSortByArray";

describe("generateSortByArray", () => {
  test("Returns type {label: string; value: string;}[] ", () => {
    const temp = generateSortByArray();

    expect(temp).toBeInstanceOf(Object);
    expect(typeof temp[0].label).toBe("string");
    expect(typeof temp[0].value).toBe("string");
  });
});
