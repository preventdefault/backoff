import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { linear } from "./linear.ts";

Deno.test("linear should resolve at least in 10 milliseconds", async () => {
  const t = Date.now();

  const { next } = linear()();

  const delay = await next();

  assertEquals(delay >= 10, true);
});

Deno.test("linear should consider the jitter option", async () => {
  const t = Date.now();

  const { next } = linear({ jitter: false })();

  const delay = await next();

  assertEquals(delay === 10, true);
});

Deno.test("linear should consider the maxWait option", async () => {
  const t = Date.now();

  const { next } = linear({ maxWait: 10 })();

  await next();
  await next();
  const delay = await next();

  assertEquals(delay === 10, true);
});

Deno.test("linear should consider the waitFactor option", async () => {
  const t = Date.now();

  const { next } = linear({ waitFactor: 50, jitter: false })();

  await next();
  await next();
  const delay = await next();

  assertEquals(delay === 150, true);
});

Deno.test("linear should provide a reset function to restart the iteration", async () => {
  const t = Date.now();

  const { next, reset } = linear({ jitter: false })();

  await next();
  await next();

  reset();

  const delay = await next();

  assertEquals(delay === 10, true);
});
