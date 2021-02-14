import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { wait } from "./wait.ts";

Deno.test({
  name:
    "wait should wait given milliseconds until the returned promise resolves",
  async fn() {
    const t = Date.now();

    const delay = await wait({ milliSeconds: 50 });

    assertEquals(delay, 50);
    assertEquals(Date.now() - t >= 50, true);
  },
});
