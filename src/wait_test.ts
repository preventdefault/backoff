import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { wait } from "./wait.ts";

Deno.test("wait should wait given milliseconds until the returned promise resolves", async () => {
  const t = Date.now();

  const delay = await wait({ milliSeconds: 50 });

  assertEquals(delay, 50);
  assertEquals(Date.now() - t >= 50, true);
});
