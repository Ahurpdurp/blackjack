import { Dealer, Player } from "../classes/player";
import { OutcomeOption, Status } from "../util/types";

export class WinnerEngine {
  static determineWhoWon(
    player: Player,
    dealer: Dealer
  ): // number is for the multiplier, since blackjack pays 1.5
  [OutcomeOption, number] {
    // dealer always wins on player bust
    if (player.outcome === Status.BUST) {
      return [OutcomeOption.DEALER, 1];
    }
    // player always wins on blackjack if dealer doesn't have
    else if (
      player.outcome === Status.BLACKJACK &&
      dealer.outcome !== Status.BLACKJACK
    ) {
      return [OutcomeOption.PLAYER, 1.5];
    }
    // dealer always wins on blackjack if player doesn't have
    else if (
      player.outcome !== Status.BLACKJACK &&
      dealer.outcome === Status.BLACKJACK
    ) {
      return [OutcomeOption.DEALER, 1.5];
    }
    // both blackjack is push
    else if (
      player.outcome === Status.BLACKJACK &&
      dealer.outcome === Status.BLACKJACK
    ) {
      return [OutcomeOption.PUSH, 1];
    }
    // at this point, if dealer busts then player always wins
    else if (dealer.outcome === Status.BUST) {
      return [OutcomeOption.PLAYER, 1];
    }
    // at this point, compare values and see who wins
    else if (
      dealer.outcome === Status.STAYED &&
      player.outcome === Status.STAYED
    ) {
      const multiplier = player.doubled ? 2 : 1;
      if (dealer.finalValue() === player.finalValue()) {
        return [OutcomeOption.PUSH, multiplier];
      } else if (dealer.finalValue() >= player.finalValue()) {
        return [OutcomeOption.DEALER, multiplier];
      } else if (dealer.finalValue() <= player.finalValue()) {
        return [OutcomeOption.PLAYER, multiplier];
      }
    }

    return [OutcomeOption.DEBUG, 1];
  }
}
