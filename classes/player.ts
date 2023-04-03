import { Card } from "./card";
import { Status } from "../util/types";

export class Player {
  hand: Card[];
  outcome: Status;
  doubled: boolean = false;
  isSplit: boolean = false;
  // we only check the split the first time in the loop
  splitChecked: boolean = false;

  constructor(cards: Card[]) {
    this.hand = cards;
    this.outcome = Status.STILL_PLAYING;
  }

  finalValue(): number {
    if (this.total() <= 21) {
      return this.total();
    } else {
      return this.softTotal();
    }
  }

  debugHand(): string {
    return `${this.hand.map((h) => h.text).join(", ")}  Outcome: ${
      this.outcome
    } Final Value: ${this.finalValue()}`;
  }

  addCard(card: Card): void {
    this.hand.push(card);
  }

  total(): number {
    let aceFound = false;
    let total = 0;

    this.hand.forEach((h) => {
      total += aceFound ? h.secondaryValue : h.value;
      if (h.text === "A") {
        aceFound = true;
      }
    });

    return total;
  }

  softTotal(): number {
    let total = 0;
    this.hand.forEach((h) => {
      total += h.secondaryValue;
    });
    return total;
  }

  isSplittable(): boolean {
    return this.hand.length === 2 && this.hand[0].text === this.hand[1].text;
  }

  hasSoftTotal(): boolean {
    return this.total() !== this.softTotal();
  }
}

export class Dealer extends Player {
  get faceUpCard(): Card {
    return this.hand[0];
  }
}
