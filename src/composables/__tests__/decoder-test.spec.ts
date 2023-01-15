import { describe, expect, test } from "vitest";
import { useDecodeBase64 } from "../decoder";

describe("useDecodeBase64", () => {
  test("decodes a base64 encoded string", () => {
    const input = "eyJtZXNzYWdlIjoiSGVsbG8gV29ybGQifQ==";
    const expectedOutput = { message: "Hello World" };

    expect(useDecodeBase64(input)).toEqual(expectedOutput);
  });
});
