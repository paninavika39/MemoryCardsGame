import CardView from "./cards/CardsView.js";
import { StartGamePopup, FinishGamePopup } from './BasicPopups.js';

class Application
{
    constructor()
    {
        this.cardPairs = 0;

        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb,
            autoResize: true
        });
        
        document.body.appendChild(this.app.view);

        this.cardView = new CardView();

        this.cardView.on('rigthPair', () => {
            this.cardPairs += 1;

            if (this.cardPairs === 8) {
                this.finishGamePopup.visible = true;
            }
        })

        this.app.stage.addChild(this.cardView);

        this.startGamePopup = new StartGamePopup();

        this.startGamePopup.on('startGame', () => {
            this.openCards();
        });

        this.app.stage.addChild(this.startGamePopup);

        this.finishGamePopup = new FinishGamePopup();

        this.app.stage.addChild(this.finishGamePopup);
    }

    async openCards() {
        this.cardView.openCards();

        await new Promise(resolve => setTimeout(resolve, 3000));

        this.cardView.closeCards();
    }
}

new Application();
