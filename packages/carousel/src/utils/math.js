export function ringDistance(i, j, ringLength) {
  return Math.min(Math.abs(i - j), ringLength - Math.abs(i - j));
}
