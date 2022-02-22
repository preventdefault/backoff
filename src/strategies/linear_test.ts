import { assertEquals } from "../dev_deps.ts";
import { linear } from "./linear.ts";

Deno.test("linear should resolve at least in 10 milliseconds", async () => {
  const t = Date.now();

  const { next } = linear()();

  await next();

  console.log(Date.now() - t);

  assertEquals(Date.now() - t >= 10, true);
});

Deno.test("linear should consider the jitter option", async () => {
  const t = Date.now();

  const { next } = linear({ jitter: false })();

  await next();

  assertEquals(Date.now() - t >= 10, true);
});

Deno.test("linear should consider the maxWait option", async () => {
  const t = Date.now();

  const { next } = linear({ maxWait: 10, jitter: false })();

  await next();

  assertEquals(Date.now() - t >= 10, true);

  await next();

  assertEquals(Date.now() - t >= 20, true);

  await next();

  assertEquals(Date.now() - t >= 30, true);
});

Deno.test("linear should consider the waitFactor option", async () => {
  const t = Date.now();

  const { next } = linear({ waitFactor: 50, jitter: false })();

  await next();

  assertEquals(Date.now() - t >= 50, true);

  await next();

  assertEquals(Date.now() - t >= 150, true);

  await next();

  assertEquals(Date.now() - t >= 300, true);
});

Deno.test("linear should provide a reset function to restart the iteration", async () => {
  const t = Date.now();

  const { next, reset } = linear({ jitter: false })();

  await next();
  await next();

  reset();

  await next();

  assertEquals(Date.now() - t >= 10, true);
});
