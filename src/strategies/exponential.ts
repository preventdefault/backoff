import { Strategy } from "./mod.ts";
import { randomBetween } from "../random_between.ts";
import { wait } from "../wait.ts";

export function exponential({
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
            (2 ** iteration++ + (jitter ? randomBetween() : 0)) * waitFactor,
          ),
          maxWait,
        ),
      }),

    reset: () => iteration = 0,
  });
}
