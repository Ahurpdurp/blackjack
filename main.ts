import { Shoe } from "./shoe";
import { Dealer, Player } from "./player";
import { Status, Action } from "./types";
import { RulesEngine } from "./rulesEngine";
import { ActionEngine } from "./actionEngine";

const maxTurns: number = 1;
let wins: number = 0;
let losses: number = 0;
let turnNumber: number = 1;
let balance: number = 1000;
const betSize: number = 10;

const shoe = new Shoe(3);

for (let i = 0; i < maxTurns; i++) {
  const players: Player[] = [new Player(shoe.dealCards(2))];

  const dealer = new Dealer(shoe.dealCards(2));

  //   while (
  //     players.some((player: Player) => player.outcome === Result.STILL_PLAYING)
  //   ) {
  players
    .filter((player: Player) => player.outcome === Status.STILL_PLAYING)
    .forEach((player: Player) => {
      const action = RulesEngine.determineAction(player, dealer);
      console.log("actionman", action, player.hand, dealer.hand);
      ActionEngine.implementPlayerAction(action, player, players, shoe);
      console.log("it works?", player.hand, dealer.hand, player.outcome);
    });
  //   }
}
