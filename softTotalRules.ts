import { Dealer, Player } from "./player";
import { Action, cardType } from "./types";
const { STAND, HIT, DOUB } = Action;
const softTotalPlayerMap: { [key: number]: number } = {
  20: 0,
  19: 1,
  18: 2,
  17: 3,
  16: 4,
  15: 5,
  14: 6,
  13: 7,
};

const softTotalDealerMap: { [key: cardType]: number } = {
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
  [STAND, STAND, STAND, STAND, DOUB, STAND, STAND, STAND, STAND, STAND],
  [DOUB, DOUB, DOUB, DOUB, DOUB, STAND, STAND, HIT, HIT, HIT],
  [HIT, DOUB, DOUB, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, DOUB, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, DOUB, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, HIT, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
  [HIT, HIT, HIT, DOUB, DOUB, HIT, HIT, HIT, HIT, HIT],
];

export function softTotalAction(player: Player, dealer: Dealer): Action {
  let total = 0;
  // only the first ace has a value of 11
  let aceFound = false;

  for (const card of player.hand) {
    total += aceFound ? card.secondaryValue : card.value;
    if (card.text === "A" && !aceFound) {
      aceFound = true;
    }
  }

  return rulesMatrix[softTotalPlayerMap[total]][
    softTotalDealerMap[dealer.faceUpCard.text]
  ];
}
