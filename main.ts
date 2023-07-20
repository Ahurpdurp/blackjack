import { Shoe } from "./classes/shoe";
import { Dealer, Player } from "./classes/player";
import { Status, OutcomeOption } from "./util/types";
import { RulesEngine } from "./engines/rulesEngine";
import { ActionEngine } from "./engines/actionEngine";
import { WinnerEngine } from "./engines/winnerEngine";
import { BALANCE, BET_SIZE, MAX_TURNS } from "./util/constants";
var argv = require("minimist")(process.argv.slice(2));

const { turns, bal, betsize, surr } = argv;

const maxTurns: number = turns || MAX_TURNS;
let balance: number = bal || BALANCE;
const betSize: number = betsize || BET_SIZE;
const surrenderAllowed: boolean = !!surr;
const countingCards: boolean = true;

let wins: number = 0;
// doesn't account for double down being 2 and bj being 1.5
let netWins: number = 0;
let losses: number = 0;
let totalWinLoss: number = 0;
let netLosses: number = 0;
let pushes: number = 0;
let totalHands: number = 0;
let doubles: number = 0;
let splits: number = 0;
let surrenders: number = 0;

const shoe = new Shoe(4);

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
        const action = RulesEngine.determinePlayerAction(
          player,
          dealer,
          surrenderAllowed,
          shoe.trueCount,
          countingCards
        );
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
      console.log(
        "NOT RIGHT LOOK INTO THIS",
        player.debugHand(),
        dealer.debugHand()
      );
      process.exit();
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

      // dealer win plus .5 multiplier should always be surrender
      if (multiplier === 0.5) {
        surrenders += 1;
      }
    } else if (outcome === OutcomeOption.PUSH) {
      pushes += 1;
    }

    totalWinLoss += multiplier;
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
  `total hands: ${totalHands}, totalWinLoss: ${totalWinLoss} final outcome: wins ${wins}, losses: ${losses}, balance: ${balance}, pushes: ${pushes}, doubles: ${doubles}, splits: ${splits}, win ratio: ${(
    (wins * 100) /
    (wins + losses)
  ).toFixed(2)}, win ratio with pushes: ${((wins * 100) / totalHands).toFixed(
    2
  )}, win ratio compared to win loss total: ${(
    (wins * 100) /
    totalWinLoss
  ).toFixed(2)}, net win ratio: ${(
    (netWins * 100) /
    (netWins + netLosses)
  ).toFixed(2)}, loss ratio: ${((losses * 100) / (wins + losses)).toFixed(
    2
  )}, net win ratio with pushes: ${((netWins * 100) / totalHands).toFixed(
    2
  )}, net loss ratio with pushes: ${((netLosses * 100) / totalHands).toFixed(
    2
  )}, push ratio: ${((pushes * 100) / totalHands).toFixed(2)} ${
    surrenderAllowed ? "surrenders: " + surrenders : ""
  }`
);
