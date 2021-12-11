const { checkFieldsAndType } = require("../utils/utils");

describe("checkFieldsAndType", () => {
  test("returns a boolean", () => {
    expect(typeof checkFieldsAndType()).toBe("boolean");
  });
  test("returns true when passed a refObj and a body with the same key", () => {
    const body = {
      key: "value",
    };
    const refObj = {
      key: "string",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(true);
  });
  test("returns false when passed a refObj and a body with a different key", () => {
    const body = {
      key: "value",
    };
    const refObj = {
      different: "string",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(false);
  });
  test("returns true when passed a refObj and a body with multiple identical keys", () => {
    const body = {
      first: "value",
      second: "value",
    };
    const refObj = {
      first: "string",
      second: "string",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(true);
  });
  test("returns false when passed a refObj and a body with different keys", () => {
    let body = {
      first: "value",
      third: "value",
    };
    let refObj = {
      first: "string",
      second: "string",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(false);
  });
  test("returns true when passed a refObj and a body with same type values and keys", () => {
    const body = {
      first: "value",
      second: true,
    };
    const refObj = {
      first: "string",
      second: "boolean",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(true);
  });
  test("returns false when passed a refObj and a body with differents type values and keys", () => {
    const body = {
      first: "value",
      second: "value",
    };
    const refObj = {
      first: "string",
      second: "boolean",
    };
    expect(checkFieldsAndType(body, refObj)).toBe(false);
  });
});
