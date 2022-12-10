
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
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        var basicText = this.basicText = new PIXI.Text('Начать игру', style);
        basicText.x = 140;
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

    }

    onButtonDown()
    {
        this.start();
    }

    start()
    {
        var cards = this.cards = this._CardView.returnAllCards();

        for (let index = 0; index < cards.length; index++)
        {
                cards[index].onButtonDown();
                cards[index].buttonSelected = false;
        }

        this._getAnimationTickerUp().start();
        this.basicText.visible = false;
        this.graphics.visible = false;
    }

    _getAnimationTickerUp()
    {
        return this.AnimationTickerUp || this._initAnimationTickerUp()
    }

    _initAnimationTickerUp()
    {
        var lTicker = this.AnimationTickerUp = new PIXI.Ticker();
        var lTimerValue_int = 0;

        lTicker.add(() => //one tick is 1
        {
            lTimerValue_int +=1;

            if (lTimerValue_int === 100)
            {
                console.log('всё')
                this.returnCards();
            }
        })


        return this.AnimationTickerUp;
    }

    returnCards()
    {
        //this._getAnimationTickerUp().stop();
        console.log(this.cards)

        for (let index = 0; index < this.cards.length; index++)
        {
            this.cards[index].startCloseAnimation();

        }

    }
}

new Application();
