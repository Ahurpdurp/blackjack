import { Player } from "./player";
import { RulesEngine } from "./rulesEngine";
import { Shoe } from "./shoe";
import { Action, Status } from "./types";

export class ActionEngine {
  static implementPlayerAction(
    action: Action,
    player: Player,
    players: Player[],
    shoe: Shoe
  ): void {
    ActionEngine[action](player, shoe, players);
  }

  static hit(player: Player, shoe: Shoe): void {
    player.addCard(shoe.dealCards(1)[0]);
    if (player.total() > 21 && player.softTotal() > 21) {
      player.finalValue = player.softTotal();
      player.outcome = Status.BUST;
    } else if (player.total() === 21 || player.softTotal() === 21) {
      player.finalValue = 21;
      player.outcome = Status.STAYED;
    }
  }

  static stand(player: Player): void {
    player.outcome = Status.STAYED;
  }

  static double(player: Player, shoe: Shoe): void {
    player.doubled = true;
    this.hit(player, shoe);
    if (player.outcome !== Status.BUST) {
      player.outcome = Status.STAYED;
    }
  }

  static split(player: Player, shoe: Shoe, players: Player[]): void {
    const newPlayer = new Player(player.hand.splice(1, 1));
    player.addCard(shoe.dealCards(1)[0]);
    newPlayer.addCard(shoe.dealCards(1)[0]);
    players.push(newPlayer);
  }

  static none(): void {
    return;
  }
}