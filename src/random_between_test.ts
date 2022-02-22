import { assertEquals } from "./dev_deps.ts";
import { randomBetween } from "./random_between.ts";

Deno.test("randomBetween should return a random number between 0 and 1", () => {
  assertEquals(randomBetween() >= 0, true);
  assertEquals(randomBetween() <= 1, true);
});

Deno.test("randomBetween should return a random number between 10 and 15", () => {
  assertEquals(randomBetween({ start: 10, end: 15 }) >= 10, true);
  assertEquals(randomBetween({ start: 10, end: 15 }) <= 15, true);
});
