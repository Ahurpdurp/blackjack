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

  static determinePlayerAction(player: Player, dealer: Dealer): Action {
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

  // i think hit on soft 17 is more common, so adding this... maybe can change settings later
  static determineDealerAction(dealer: Dealer): Action {
    if (
      (dealer.total() >= 18 && dealer.total() <= 21) ||
      (dealer.softTotal() >= 18 && dealer.softTotal() <= 21)
    ) {
      return Action.STAND;
    } else if (dealer.total() === 17 && dealer.softTotal() === 17) {
      return Action.STAND;
    } else if (dealer.total() === 17 && dealer.softTotal() === 7) {
      return Action.HIT;
    } else if (dealer.total() <= 16 || dealer.softTotal() <= 16) {
      return Action.HIT;
    }

    return Action.NONE;
  }
}
