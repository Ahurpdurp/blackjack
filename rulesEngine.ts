import { hardTotalAction } from "./hardTotalRules";
import { Dealer, Player } from "./player";
import { softTotalAction } from "./softTotalRules";
import { splitAction } from "./splitRules";
import { Status, Action } from "./types";

export class RulesEngine {
  // maybe in the future make this not static
  static blackjackCheck(player: Player): boolean {
    if (player.hand.length === 2 && player.total() === 21) {
      player.outcome = Status.BLACKJACK;
      player.finalValue = 21;
      return true;
    }
    return false;
  }

  static determineAction(player: Player, dealer: Dealer): Action {
    if (this.blackjackCheck(player)) {
      return Action.NONE;
    } else if (player.isSplittable()) {
      const splitOutcome = splitAction(player, dealer);
      if (splitOutcome === Action.SPLIT) {
        return Action.SPLIT;
      }
    } else if (player.hasSoftTotal()) {
      return softTotalAction(player, dealer);
    } else {
      return hardTotalAction(player, dealer);
    }

    return Action.NONE;
  }
}
