export function wait(
  {
    milliSeconds,
  }: {
    milliSeconds: number;
  },
): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(milliSeconds), milliSeconds);
  });
}
