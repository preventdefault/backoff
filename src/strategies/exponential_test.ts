import { assertEquals } from "../dev_deps.ts";
import { exponential } from "./mod.ts";

Deno.test("exponential should resolve at least in 10 milliseconds", async () => {
  const t = Date.now();

  const { next } = exponential()();

  const delay = await next();

  assertEquals(delay >= 10, true);
  assertEquals(Date.now() - t >= 10, true);
});

Deno.test("exponential should consider the jitter option", async () => {
  const t = Date.now();

  const { next } = exponential({ jitter: false })();

  const delay = await next();

  assertEquals(delay === 10, true);
  assertEquals(Date.now() - t >= 10, true);
});

Deno.test("exponential should consider the maxWait option", async () => {
  const t = Date.now();

  const { next } = exponential({ maxWait: 10 })();

  await next();
  await next();
  const delay = await next();

  assertEquals(delay === 10, true);
  assertEquals(Date.now() - t >= 10, true);
});

Deno.test("exponential should consider the waitFactor option", async () => {
  const t = Date.now();

  const { next } = exponential({ waitFactor: 50, jitter: false })();

  await next();
  await next();
  const delay = await next();

  assertEquals(delay === 200, true);
  assertEquals(Date.now() - t >= 200, true);
});

Deno.test("exponential should provide a reset function to restart the iteration", async () => {
  const t = Date.now();

  const { next, reset } = exponential({ jitter: false })();

  await next();
  await next();

  reset();

  const delay = await next();

  assertEquals(delay === 10, true);
  assertEquals(Date.now() - t >= 10, true);
});
