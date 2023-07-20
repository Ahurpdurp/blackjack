import { hardTotalAction } from "../rules/hardTotalRules";
import { Dealer, Player } from "../classes/player";
import { softTotalAction } from "../rules/softTotalRules";
import { splitAction } from "../rules/splitRules";
import { Status, Action } from "../util/types";

export class RulesEngine {
  // maybe in the future make this not static
  static blackjackCheck(player: Player): boolean {
    if (player.hand.length === 2 && player.total() === 21) {
      player.outcome = Status.BLACKJACK;
      return true;
    }
    return false;
  }

  static determinePlayerAction(
    player: Player,
    dealer: Dealer,
    surrenderAllowed: boolean = false,
    trueCount: number,
    countingCards: boolean = false
  ): Action {
    if (this.blackjackCheck(player)) {
      return Action.NONE;
    } else if (player.isSplittable() && !player.splitChecked) {
      const splitOutcome = splitAction(
        player,
        dealer,
        trueCount,
        countingCards
      );
      if (splitOutcome === Action.SPLIT) {
        return Action.SPLIT;
      } else {
        player.splitChecked = true;
      }
    } else if (player.hasSoftTotal() && player.softTotal() < 11) {
      return softTotalAction(player, dealer);
    } else {
      return hardTotalAction(player, dealer, surrenderAllowed);
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
    }
    // no ace, stand on 17
    else if (dealer.total() === 17 && dealer.softTotal() === 17) {
      return Action.STAND;
    }
    // hit on soft 17
    else if (dealer.total() === 17 && dealer.softTotal() === 7) {
      return Action.HIT;
    }
    // stand on hard 17 with ace in hand
    else if (dealer.total() === 27 && dealer.softTotal() === 17) {
      return Action.STAND;
    }
    // always hit if below 17
    else if (dealer.total() <= 16 || dealer.softTotal() <= 16) {
      return Action.HIT;
    }

    return Action.NONE;
  }
}
