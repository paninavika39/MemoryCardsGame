import { APP_PARAMS } from "../constants.js";
import CardSprite from "./CardSprite.js";

class CardView extends PIXI.Container {
    constructor() {
        super();

        this.cardsPairsCount = 8;
        this._cards = [];

        this.cardsPair = [];

        for (let i = 0; i < this.cardsPairsCount * 2; i++) {
            const card = new CardSprite(`src/images/${i % 8}.png`, i % 8, i);

            card.on('selectCard', (card) => {
                this.checkCardPair(card);
            })

            this._cards.push([card, (Math.floor(i / 4)) * 100, (i % 4) * 150]);

            this.addChild(card);
        }

        const firstValues = this._cards.map(subArray => subArray[0]);

        for (let i = firstValues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [firstValues[i], firstValues[j]] = [firstValues[j], firstValues[i]];
        }

        this._cards.forEach((subArray, index) => {
            subArray[0] = firstValues[index];
            subArray[0].x = subArray[1];
            subArray[0].y = subArray[2];
        });

        this.pivot.set(this.width / 2, this.height / 2);
        this.position.set(APP_PARAMS.CANVAS_WIDTH / 2, APP_PARAMS.CANVAS_HEIGHT / 2);
    }

    get cards() {
        return this._cards.map(subArray => subArray[0]);
    }

    openCards() {
        this.cards.map(c => {
            c.startOpenAnimation();
        })
    }

    closeCards() {
        this.cards.map(c => {
            c.startCloseAnimation();
        })
    }

    checkCardPair(card) {
        this.cardsPair.push(card);

        const cards = this.cards;

        if (this.cardsPair.length === 2) {
            if (this.cardsPair[0].id === this.cardsPair[1].id) {
                this.emit('rigthPair');

                this.cardsPair = [];

                return;
            } else {
                setTimeout(() => {
                    this.cardsPair.map(card => cards.find(c => c.number === card.number).startCloseAnimation());

                    this.cardsPair = [];
                }, 100);
            }
        }
    }
}

export default CardView;

