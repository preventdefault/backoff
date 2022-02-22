import { exponential, Strategy } from "./strategies/mod.ts";

export type Backoff = {
  start: () => Promise<BackoffResult>;
  stop: () => void;
};

export type BackoffRetry = {
  retry: number;
};

export type BackoffResult = {
  retries: number;
  success: boolean;
};

export type BackoffPredicate = (retry: BackoffRetry) => Promise<boolean>;

export type BackoffParameters = {
  maxRetries?: number;
  strategy?: Strategy;
};

export function backoff(predicate: BackoffPredicate, {
  maxRetries = 5,
  strategy = exponential(),
}: BackoffParameters = {}): Backoff {
  let stopped = false;
  let isRunning = false;

  const { next, reset } = strategy();

  const retries = Array.from(Array(maxRetries).keys()).map((n) => n + 1);

  async function start(): Promise<BackoffResult> {
    if (isRunning) {
      return { retries: 0, success: false };
    }

    isRunning = true;

    for (const retry of retries) {
      await next();

      const success = await predicate({ retry }).catch(() => false);

      if (success === true || stopped) {
        isRunning = false;

        return { retries: retry, success };
      }
    }

    isRunning = false;

    return {
      retries: maxRetries,
      success: false,
    };
  }

  return {
    start,
    stop: () => {
      stopped = true;
      reset();
    },
  };
}
