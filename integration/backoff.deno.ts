import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { backoff, BackoffStep } from "../src/backoff.ts";
import { exponential, linear } from "../src/strategies/index.ts";

function predicate({ retry, delay }: BackoffStep): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(retry > 2), 1000);
  });
}

const { start: startExponential } = backoff({
  predicate,
  maxRetries: 5,
  strategy: exponential({ jitter: false }),
});

const { start: startLinear } = backoff({
  predicate,
  maxRetries: 5,
  strategy: linear({ jitter: false }),
});

startExponential().then((arg) =>
  assertEquals(arg, {
    retry: 3,
    success: true,
    maxRetries: 5,
    delay: 40,
    stopped: false,
  })
);

startLinear().then((arg) =>
  assertEquals(arg, {
    retry: 3,
    success: true,
    maxRetries: 5,
    delay: 30,
    stopped: false,
  })
);
