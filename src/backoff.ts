import { Strategy } from "./strategies/index.ts";

export type Backoff = {
  start: () => Promise<BackoffResult>;
  stop: () => void;
};

export type BackoffStep = {
  retry: number;
  delay: number;
};

export type BackoffResult = {
  retry: number;
  success: boolean;
  maxRetries: number;
  delay: number | null;
  stopped: boolean;
};

export type BackoffPredicate = (step: BackoffStep) => Promise<boolean>;

export type BackoffParameters = {
  predicate: BackoffPredicate;
  maxRetries: number;
  strategy: Strategy;
};

export function backoff({
  predicate,
  maxRetries,
  strategy,
}: BackoffParameters): Backoff {
  let stopped = false;
  let isRunning = false;
  const { next, reset } = strategy();
  const list = Array.from(Array(maxRetries).keys()).map((n) => n + 1);

  async function start(): Promise<BackoffResult> {
    if (isRunning) {
      return { retry: 0, success: false, maxRetries, delay: 0, stopped: false };
    }

    isRunning = true;

    for (const retry of list) {
      const delay = await next();
      const success = await predicate({ retry, delay }).catch(() => false);

      if (success === true || stopped) {
        isRunning = false;
        return { retry, success, maxRetries, delay, stopped };
      }
    }

    isRunning = false;

    return {
      retry: maxRetries,
      success: false,
      maxRetries,
      delay: null,
      stopped: false,
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
