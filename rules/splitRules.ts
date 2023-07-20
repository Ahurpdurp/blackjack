import { Dealer, Player } from "../classes/player";
import { Action, cardType, DeviationType } from "../util/types";
const { SPLIT, NONE } = Action;
const { HIGHER, LOWER } = DeviationType;

const splitPlayerMap: { [key: cardType]: number } = {
  A: 0,
  K: 1,
  Q: 1,
  J: 1,
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

// for deviations: [true count threshold, greater or lower than this true count, action to perform if deviated, default action]
const deviationMatrix = [
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT],
  [
    NONE,
    NONE,
    [6, HIGHER, SPLIT, NONE],
    [5, HIGHER, SPLIT, NONE],
    [4, HIGHER, SPLIT, NONE],
    NONE,
    NONE,
    NONE,
    NONE,
    NONE,
  ],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, SPLIT, SPLIT, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE, NONE],
  [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
  [NONE, NONE, NONE, SPLIT, SPLIT, NONE, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
  [SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, SPLIT, NONE, NONE, NONE, NONE],
];

export function splitAction(
  player: Player,
  dealer: Dealer,
  trueCount: number,
  countingCards: boolean = false
): Action {
  const actionOrDeviation =
    deviationMatrix[splitPlayerMap[player.hand[0].text]][
      splitDealerMap[dealer.faceUpCard.text]
    ];

  if (!Array.isArray(actionOrDeviation)) {
    return actionOrDeviation;
  }

  const [trueCountThreshold, comparison, deviationAction, defaultAction] =
    actionOrDeviation;

  if (!countingCards) {
    return defaultAction as Action;
  }

  if (comparison === HIGHER) {
    return trueCount >= (trueCountThreshold as number)
      ? (deviationAction as Action)
      : (defaultAction as Action);
  } else if (comparison === LOWER) {
    return trueCount <= (trueCountThreshold as number)
      ? (deviationAction as Action)
      : (defaultAction as Action);
  } else {
    return defaultAction as Action;
  }
}
