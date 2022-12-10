
import CardSprite from "./CardSprite.js";
import CardView from "./CardsView.js";

class Application
{
    constructor()
    {
        this.app = new PIXI.Application({
          width: 600,
          height: 700,
          backgroundColor: 0x006400
      });

        document.body.appendChild(this.app.view);

        this.ticker = PIXI.Ticker.shared;
        this.ticker.autoStart = false;

        this._CardView = new CardView();
        this.app.stage.addChild(this._CardView);

        var graphics = this.graphics = new PIXI.Graphics();
        // Rectangle
        graphics.lineStyle(4, 0x000000);

        graphics.beginFill(0x000000);
        graphics.drawRect(110, 270, 380, 200);
        graphics.endFill();

        this.app.stage.addChild(graphics);

        graphics.interactive = true;
        graphics.buttonMode = true;

        var style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
        });

        var basicText = this.basicText = new PIXI.Text('Начать игру', style);
        basicText.x = graphics.x+110;
        basicText.y = 270;


        this.app.stage.addChild(basicText);

        this.basicText.visible = true;
        this.graphics.visible = true;

        graphics.on('pointerdown', (e)=> this.onButtonDown(e))

        console.log(this.graphics.visible)

       /* var s = PIXI.Sprite.from("./images/фон.png");
        s.scale.x = 0.7;
        s.scale.y = 0.7;
        this.app.stage.addChild(s);*/
        this.buttonSelectedArray = [];

    }

    onButtonDown()
    {
        var cards = this.cards = this._CardView.returnAllCards();

        for (let index = 0; index < cards.length; index++)
        {
                cards[index].onButtonDown();
                cards[index].buttonSelected = false;
                cards[index].on('pointerdown', (e)=> this.BUTTON(cards[index]))
        }

        this._initAnimationTickerUp().start();
        this.basicText.visible = false;
        this.graphics.visible = false;
    }

    BUTTON(aCard)
    {
        if (aCard.buttonSelected || this.buttonSelectedArray.length == 2)
        {
            return;
        }

        aCard.onButtonDown();
        this.buttonSelectedArray.push(aCard);

        if (this.buttonSelectedArray.length == 2)
        {
            if (this.buttonSelectedArray[0].cardId == this.buttonSelectedArray[1].cardId)
            {
                this.buttonSelectedArray = [];

                return;
            }
            else
            {
                var lTicker = new PIXI.Ticker();
                var lTimerValue_int = 0;

                lTicker.add(() => //one tick is 1
                {
                    lTimerValue_int +=1;

                    if (lTimerValue_int === 50)
                    {
                        this.buttonSelectedArray[0].startCloseAnimation();
                        this.buttonSelectedArray[1].startCloseAnimation();

                        this.buttonSelectedArray[0].buttonSelected = false;
                        this.buttonSelectedArray[1].buttonSelected = false;

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
        var lTicker = this.AnimationTickerUp = new PIXI.Ticker();
        var lTimerValue_int = 0;

        lTicker.add(() =>
        {
            lTimerValue_int +=1;

            if (lTimerValue_int === 200)
            {
                this.returnCards();
            }
        })


        return this.AnimationTickerUp;
    }

    returnCards()
    {
        for (let index = 0; index < this.cards.length; index++)
        {
            this.cards[index].startCloseAnimation();
        }
    }
}

new Application();
