import { createHash } from "../src/index";

test("hash produces base64", async () => {
  const h = await createHash("test");
  expect(typeof h).toBe("string");
  expect(h.length).toBeGreaterThan(10);
});
