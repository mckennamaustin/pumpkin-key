export default function join(first, second) {
  if (second && second.length > 0) {
    return first + ' ' + second;
  }

  return first;
}
