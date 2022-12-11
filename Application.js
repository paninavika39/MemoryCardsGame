
import CardSprite from "./CardSprite.js";
import CardView from "./CardsView.js";

class Application
{
    constructor()
    {
        this.app = new PIXI.Application({
          width: 700,
          height: 1000
        });

        document.body.appendChild(this.app.view);

        var s = PIXI.Sprite.from("./images/фон2.jpg");
        this.app.stage.addChild(s);

        this.ticker = PIXI.Ticker.shared;
        this.ticker.autoStart = false;

        this._CardView = new CardView();
        this._CardView.x = 50;
        this._CardView.y = 140;
        this.app.stage.addChild(this._CardView);


        var s = PIXI.Sprite.from("./images/фон.png");
        s.scale.x = 0.8;
        s.scale.y = 0.8;
        this.app.stage.addChild(s);
        this.buttonSelectedArray = [];

        this._cardsCount = 0;

        var graphics = this.graphics = new PIXI.Graphics();
        // Rectangle
        graphics.lineStyle(4, 0x000000);

        graphics.beginFill(0x000000);
        graphics.drawRect(110, 430, 482, 200);
        graphics.endFill();

        this.app.stage.addChild(graphics);


        var graphics2 = this.graphics2 = new PIXI.Graphics();
        // Rectangle
        graphics2.beginFill(0x000000);
        graphics2.drawRect(0, 0, 1000, 1000);
        graphics2.endFill();

        graphics2.alpha = 0.8;
        this.app.stage.addChild(graphics2);

        graphics.interactive = true;
        graphics.buttonMode = true;

        var style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 70,
            fontWeight: 'bold',
            fill: ['#94b329', '#ffffff'], // gradient
        });

        var basicText = this.basicText = new PIXI.Text('Начать игру', style);
        basicText.x = 150;
        basicText.y = 500;

        var basicText2 = this.basicText2 = new PIXI.Text('Вы выиграли!', style);
        basicText2.x = 125;
        basicText2.y = 500;

        this.basicText2.visible = false;
        this.graphics.visible = true;
        this.graphics2.visible = true;
        graphics.on('pointerdown', ()=> this.onButtonDown());

        this.app.stage.addChild(basicText);
        this.app.stage.addChild(basicText2);

        this._ticker = new PIXI.Ticker();
    }

    onButtonDown()
    {
        var cards = this.cards = this._CardView.returnAllCards();

        for (let i_card = 0; i_card < cards.length; i_card++)
        {
            cards[i_card].onButtonDown();
            cards[i_card].buttonSelected = true;
            cards[i_card].on('pointerdown', ()=> this._onButtonDown(cards[i_card]));
        }

        this._initAnimationTickerUp();

        this.basicText.visible = false;
        this.graphics.visible = false;
        this.graphics2.visible = false;
        this.basicText2.visible = false;
    }

    _onButtonDown(aCard)
    {
        if (aCard.buttonSelected || this.buttonSelectedArray.length == 2)
        {
            return;
        }

        aCard.onButtonDown();
        this.buttonSelectedArray.push(aCard);

        if (this.buttonSelectedArray.length == 2)
        {
            var card0 = this.buttonSelectedArray[0];
            var card1 = this.buttonSelectedArray[1];

            if (card0.cardId == card1.cardId)
            {
                this._cardsCount += 1;

                if (this._cardsCount == 8)
                {
                    this.graphics2.visible = true;
                    this.basicText2.visible = true;
                }

                this.buttonSelectedArray = [];

                return;
            }
            else
            {
                var lTicker = this._ticker;
                var lTimerValue_int = 0;

                lTicker.add(() => //one tick is 1
                {
                    lTimerValue_int +=1;

                    if (lTimerValue_int === 50)
                    {
                        card0.startCloseAnimation();
                        card1.startCloseAnimation();

                        card0.buttonSelected = false;
                        card1.buttonSelected = false;

                        this.buttonSelectedArray = [];

                        lTicker.stop();
                    }
                })

                lTicker.update(0);
                lTicker.start();
            }
        }
    }

    _initAnimationTickerUp()
    {
        var lTicker = this._ticker;
        var lTimerValue_int = 0;

        lTicker.add(() =>
        {
            lTimerValue_int +=1;

            if (lTimerValue_int === 200)
            {
                this.returnCards();
                lTicker.stop();
            }
        })

        lTicker.update(0);
        lTicker.start();
    }

    returnCards()
    {
        for (let i_card = 0; i_card < this.cards.length; i_card++)
        {
            this.cards[i_card].startCloseAnimation();
            this.cards[i_card].buttonSelected = false;
        }
    }
}

new Application();
