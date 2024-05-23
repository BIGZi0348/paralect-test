import generateArrayOfYears from "@/utils/generateArrayOfYears";

describe("generateArrayOfYears", () => {
  test("Returns type {label: string; value: string;}[] ", () => {
    const temp = generateArrayOfYears();

    expect(temp).toBeInstanceOf(Object);
    expect(typeof temp[0].label).toBe("string");
    expect(typeof temp[0].value).toBe("string");
  });
});
