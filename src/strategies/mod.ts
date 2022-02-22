export interface Strategy {
  (): {
    next: () => Promise<number>;
    reset: () => void;
  };
}
export { exponential } from "./exponential.ts";
export { linear } from "./linear.ts";
