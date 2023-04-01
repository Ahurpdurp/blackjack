import { Shoe } from "./shoe";
import { Dealer, Player } from "./player";
import { Status, Action, OutcomeOption } from "./types";
import { RulesEngine } from "./rulesEngine";
import { ActionEngine } from "./actionEngine";
import { WinnerEngine } from "./winnerEngine";

const maxTurns: number = 10;
let wins: number = 0;
let losses: number = 0;
let pushes: number = 0;
let turnNumber: number = 1;
let balance: number = 1000;
const betSize: number = 10;

const shoe = new Shoe(3);

for (let i = 0; i < maxTurns; i++) {
  const players: Player[] = [new Player(shoe.dealCards(2))];

  const dealer = new Dealer(shoe.dealCards(2));

  const dealerBlackjack = RulesEngine.blackjackCheck(dealer);

  while (
    players.some((player: Player) => player.outcome === Status.STILL_PLAYING) &&
    !dealerBlackjack
  ) {
    players
      .filter((player: Player) => player.outcome === Status.STILL_PLAYING)
      .forEach((player: Player) => {
        // console.log("looping infinitely player...", player, dealer);
        const action = RulesEngine.determinePlayerAction(player, dealer);
        ActionEngine.implementAction(action, player, players, shoe);
      });
  }

  while (dealer.outcome === Status.STILL_PLAYING && !dealerBlackjack) {
    // console.log("looping infinitely dealer...", dealer);
    const action = RulesEngine.determineDealerAction(dealer);
    ActionEngine.implementAction(action, dealer, players, shoe);
  }

  players.forEach((player) => {
    const [outcome, multiplier] = WinnerEngine.determineWhoWon(player, dealer);
    if (outcome === OutcomeOption.DEBUG) {
      console.log("alrightwtf", player.debugHand(), dealer.debugHand());
    }
    if (outcome === OutcomeOption.PLAYER) {
      wins += multiplier;
      balance += betSize * multiplier;
    } else if (outcome === OutcomeOption.DEALER) {
      losses += multiplier;
      balance -= betSize * multiplier;
    } else if (outcome === OutcomeOption.PUSH) {
      pushes += 1;
    }
    console.log(
      "outcome",
      turnNumber,
      outcome,
      wins,
      losses,
      balance,
      player.debugHand(),
      dealer.debugHand()
    );
  });
}
