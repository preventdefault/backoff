export function randomBetween({ start = 0, end = 1 } = {}) {
  return Math.max(Math.random() * end, start);
}
