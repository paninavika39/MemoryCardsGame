
class CardSprite extends PIXI.Container
{
    constructor(frontFace, cardId)
    {
        super();

        this.cardId = cardId;


        var texture = PIXI.Texture.from(frontFace);
        var s = PIXI.Sprite.from(texture);

       s.anchor.x = 0.5;
       s.anchor.y = 0.5;
       s.scale.x = 0.4;
       s.scale.y = 0.4;

        s.interactive = true;
        s.buttonMode = true;

        s
        .on('pointerover', (e)=> this.onButtonOver(e))
        .on('pointerout', (e)=> this.onButtonOut(e))
        .on('pointerdown', (e)=> this.onButtonDown(e))

        this.addChild(s);

        this.store = [];
        this.Conatiner = new PIXI.Container();
        for (var i = 0; i < 10; i++)
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(1, 0xFFFFFF);
            graphics.beginFill(0xFFCC5A);
            graphics.drawRect(-40, -70 + i*12, 80, 11);
            graphics.endFill();
            this.store.push(graphics);
            this.Conatiner.addChild(graphics);

        }
        this.addChild(this.Conatiner)

        //this.addChild(s2);

        this.buttonSelected_bl = false;

        this.Ticker = null;
        return this;
    }

    set buttonSelected(aChoice)
    {
        this.buttonSelected_bl = aChoice
    }

    get buttonSelected()
    {
        return this.buttonSelected_bl;
    }


    onButtonOver()
    {

    }

    onButtonOut()
    {

    }

    onButtonDown()
    {
        if (this.buttonSelected_bl)
        {
            return;
        }

        if (this.Conatiner.visible)
        {
            this.buttonSelected_bl = true;
            this._initAnimationTicker().update(0);
            this._initAnimationTicker().start();
        }

    }

    _getAnimationTicker()
    {
        return this.Ticker || this._initAnimationTicker()
    }

    _initAnimationTicker()
    {
        var lTicker = this.Ticker = new PIXI.Ticker();
        var lTimerValue_int = 0;

        lTicker.add(() => //one tick is 1
        {
            for (var i = 0; i < 10 ; i++)
            {
                if (lTimerValue_int > 0 && lTimerValue_int < 13)
                {
                    this.store[10-i-1].y -= (10-i-1);
                }
            }

            lTimerValue_int +=1;

        })

        return this.Ticker;
    }

    startCloseAnimation()
    {
        var lTicker = this.Ticker2 = new PIXI.Ticker();
        var lTimerValue_int = 0;

        lTicker.add(() => //one tick is 1
        {
            for (var i = 0; i < 10 ; i++)
            {
                if (lTimerValue_int > 0 && lTimerValue_int < 13)
                {
                    this.store[10-i-1].y += (10-i-1);
                }
            }

            lTimerValue_int +=1;

            if(lTimerValue_int === 22)
            {
                lTicker.stop();
            }

        })

        lTicker.start();
    }

}

export default CardSprite;