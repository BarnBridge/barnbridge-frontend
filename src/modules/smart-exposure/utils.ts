export function calcTokensRatio(targetRatio: string): [number, number] {
  return [100 / (1 + Number(targetRatio) / 10 ** 18), 100 - 100 / (1 + Number(targetRatio) / 10 ** 18)];
}
