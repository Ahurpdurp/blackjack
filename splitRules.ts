import { Dealer, Player } from "./player";
import { Action, cardType } from "./types";
const { SPLIT, NONE } = Action;
const splitPlayerMap: { [key: cardType]: number } = {
  A: 0,
  10: 1,
  9: 2,
  8: 3,
  7: 4,
  6: 5,
  5: 6,
  4: 7,
  3: 8,
  2: 9,
};

const splitDealerMap: { [key: cardType]: number } = {
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
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT],
  [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, SPLIT, SPLIT, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE, NONE],
  [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
  [NONE, NONE, NONE, SPLIT, SPLIT, NONE, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
];

export function splitAction(player: Player, dealer: Dealer): Action {
  return rulesMatrix[splitPlayerMap[player.hand[0].text]][
    splitDealerMap[dealer.faceUpCard.text]
  ];
}
