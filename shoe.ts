import { deck } from "./constants";
import { cardType } from "./types";
import { Card } from "./card";

export class Shoe {
  cardList: Card[] = [];

  constructor(shoeSize: number = 4) {
    const decks: cardType[] = [];
    for (let i = 0; i < shoeSize; i++) {
      decks.push(...deck);
    }

    decks.forEach((d) => this.cardList.push(new Card(d)));

    this.shuffleCards();
  }

  dealCards(numberOfCards: number): Card[] {
    return this.cardList.splice(0, numberOfCards);
  }

  shuffleCards(): void {
    const newCardList: Card[] = [];
    let counter = this.cardList.length;

    while (counter > 0) {
      const tempIndex = Math.floor(Math.random() * counter);
      newCardList.push(...this.cardList.splice(tempIndex, 1));
      counter -= 1;
    }

    this.cardList = newCardList;
  }
}
