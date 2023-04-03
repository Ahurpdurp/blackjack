import { Shoe } from "./classes/shoe";
import { Dealer, Player } from "./classes/player";
import { Status, OutcomeOption } from "./util/types";
import { RulesEngine } from "./engines/rulesEngine";
import { ActionEngine } from "./engines/actionEngine";
import { WinnerEngine } from "./engines/winnerEngine";

const maxTurns: number = 100;
let wins: number = 0;
// doesn't account for double down being 2 and bj being 1.5
let netWins: number = 0;
let losses: number = 0;
let netLosses: number = 0;
let pushes: number = 0;
let totalHands: number = 0;
let balance: number = 1000;
const betSize: number = 10;
let doubles: number = 0;
let splits: number = 0;

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

    if (player.doubled) {
      doubles += 1;
    }

    if (player.isSplit) {
      splits += 1;
    }

    if (outcome === OutcomeOption.PLAYER) {
      wins += multiplier;
      netWins += 1;
      balance += betSize * multiplier;
    } else if (outcome === OutcomeOption.DEALER) {
      losses += multiplier;
      netLosses += 1;
      balance -= betSize * multiplier;
    } else if (outcome === OutcomeOption.PUSH) {
      pushes += 1;
    }
    // console.log(
    //   "outcome",
    //   turnNumber,
    //   outcome,
    //   wins,
    //   losses,
    //   balance,
    //   pushes,
    //   player.debugHand(),
    //   dealer.debugHand()
    // );
  });
  totalHands += players.length;
}

console.log(
  `total hands: ${totalHands}, final outcome: wins ${wins}, losses: ${losses}, balance: ${balance}, pushes: ${pushes}, doubles: ${doubles}, splits: ${splits}, win ratio: ${(
    (wins * 100) /
    (wins + losses)
  ).toFixed(2)}, win ratio with pushes: ${((wins * 100) / totalHands).toFixed(
    2
  )}, net win ratio: ${((netWins * 100) / (netWins + netLosses)).toFixed(
    2
  )}, loss ratio: ${((losses * 100) / (wins + losses)).toFixed(
    2
  )}, net win ratio with pushes: ${((netWins * 100) / totalHands).toFixed(
    2
  )}, net loss ratio with pushes: ${((netLosses * 100) / totalHands).toFixed(
    2
  )}, push ratio: ${((pushes * 100) / totalHands).toFixed(2)}`
);
