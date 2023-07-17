import { Card } from "../classes/card";
import { cardType } from "../util/types";

const rulesMatrix: { [key: cardType]: number } = {
  A: -1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 0,
  8: 0,
  9: 0,
  10: -1,
  J: -1,
  Q: -1,
  K: -1,
};

export function calculateNewRunningCount(
  runningCount: number,
  newCard: Card
): number {
  return runningCount + rulesMatrix[newCard.text];
}
