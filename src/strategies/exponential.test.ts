import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { exponential } from "./exponential.ts";

Deno.test("exponential should resolve at least for 10 milliseconds", async () => {
  const t = Date.now();

  const { next } = exponential()();

  const delay = await next();

  assertEquals(delay >= 10, true);
});
