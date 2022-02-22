import { assertEquals } from "../src/dev_deps.ts";
import { backoff, BackoffRetry } from "../src/backoff.ts";
import { exponential, linear } from "../src/strategies/mod.ts";

Deno.test("backoff with exponential strategy that resolves successfully after the third retry", async () => {
  const predicate = ({ retry }: BackoffRetry): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(retry > 2), 100);
    });
  };

  const { start } = backoff(predicate, {
    maxRetries: 5,
    strategy: exponential({ jitter: false }),
  });

  const result = await start();

  assertEquals(result, {
    retries: 3,
    success: true,
  });
});

Deno.test("backoff with exponential strategy that resolves not successfully", async () => {
  const predicate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(false), 100);
    });
  };

  const { start } = backoff(predicate, {
    maxRetries: 5,
    strategy: exponential({ jitter: false }),
  });

  const result = await start();

  assertEquals(result, {
    retries: 5,
    success: false,
  });
});

Deno.test("backoff with linear strategy", async () => {
  const predicate = ({ retry }: BackoffRetry): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(retry > 2), 100);
    });
  };

  const { start } = backoff(predicate, {
    maxRetries: 5,
    strategy: linear({ jitter: false }),
  });

  const result = await start();

  assertEquals(result, {
    retries: 3,
    success: true,
  });
});
