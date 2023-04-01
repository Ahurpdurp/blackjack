import { Dealer, Player } from "../classes/player";
import { Action, cardType } from "../util/types";
const { STAND, HIT, DOUB } = Action;
const hardTotalPlayerMap: { [key: number]: number } = {
  21: 0,
  20: 0,
  19: 0,
  18: 0,
  17: 0,
  16: 1,
  15: 2,
  14: 3,
  13: 4,
  12: 5,
  11: 6,
  10: 7,
  9: 8,
  8: 9,
  7: 9,
  6: 9,
  5: 9,
};

const hardTotalDealerMap: { [key: cardType]: number } = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  10: 8,
  J: 8,
  Q: 8,
  K: 8,
  A: 9,
};

const rulesMatrix = [
  [STAND, STAND, STAND, STAND, STAND, STAND, STAND, STAND, STAND, STAND],
  [STAND, STAND, STAND, STAND, STAND, HIT, HIT, HIT, HIT, HIT],
  [STAND, STAND, STAND, STAND, STAND, HIT, HIT, HIT, HIT, HIT],
  [STAND, STAND, STAND, STAND, STAND, HIT, HIT, HIT, HIT, HIT],
  [STAND, STAND, STAND, STAND, STAND, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, STAND, STAND, STAND, HIT, HIT, HIT, HIT, HIT],
  [DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB],
  [DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, DOUB, HIT, HIT],
  [HIT, DOUB, DOUB, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, HIT, HIT, HIT, HIT, HIT, HIT, HIT, HIT],
];

export function hardTotalAction(player: Player, dealer: Dealer): Action {
  return rulesMatrix[hardTotalPlayerMap[player.total()]][
    hardTotalDealerMap[dealer.faceUpCard.text]
  ];
}
