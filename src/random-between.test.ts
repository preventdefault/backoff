import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { randomBetween } from "./random-between.ts";

Deno.test("randomBetween should return a random number between 0 and 1", () => {
  assertEquals(randomBetween() >= 0, true);
  assertEquals(randomBetween() <= 1, true);
});

Deno.test("randomBetween should return a random number between 10 and 15", () => {
  assertEquals(randomBetween({ start: 10, end: 15 }) >= 10, true);
  assertEquals(randomBetween({ start: 10, end: 15 }) <= 15, true);
});
