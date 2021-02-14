import { backoff, BackoffStep } from "./backoff.ts";
import { exponential, linear } from "./strategies/index.ts";

function predicate({ retry, delay }: BackoffStep): Promise<boolean> {
  console.log(retry, delay);
  return new Promise((resolve) => {
    setTimeout(() => resolve(retry > 5), 1_000);
  });
}

const { start } = backoff({
  predicate,
  maxRetries: 5,
  strategy: exponential(),
});

const { start: startLinear } = backoff({
  predicate,
  maxRetries: 5,
  strategy: linear(),
});

start().then((arg) => console.log(arg));
startLinear().then((arg) => console.log(arg));
