import { Strategy } from "./index.ts";
import { randomBetween } from "../random-between.ts";
import { wait } from "../wait.ts";

export function linear({
  maxWait = 32 * 1000,
  waitFactor = 10,
  jitter = true,
} = {}): Strategy {
  let iteration = 0;

  return () => ({
    next: () =>
      wait({
        milliSeconds: Math.min(
          Math.ceil(
            (++iteration + (jitter ? randomBetween() : 0)) * waitFactor,
          ),
          maxWait,
        ),
      }),

    reset: () => iteration = 0,
  });
}
