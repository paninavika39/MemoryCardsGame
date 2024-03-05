
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
        s.scale.x = 0.8;
        s.scale.y = 0.8;
        //s.interactive = true;
        s.eventMode = 'static'; // Устанавливаем режим событий
        // Устанавливаем объект как интерактивный
        // Добавляем обработчик события mousedown
        //s.on('mousedown', this.onButtonDown());
        s.buttonMode = true;

        this.addChild(s);

        this.store = [];
        var container = new PIXI.Container();
        for (var i = 0; i < 10; i++)
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(1, 0xFFFFFF);
            graphics.beginFill(0xFFCC5A);
            graphics.drawRect(-40, -70 + i*12, 80, 11);
            graphics.endFill();
            this.store.push(graphics);
            container.addChild(graphics);

        }
        this.addChild(container);

        this.buttonSelected_bl = false;

        this._ticker1 = new PIXI.Ticker();
        this._ticker2 = new PIXI.Ticker();

    }

    set buttonSelected(aChoice)
    {
        this.buttonSelected_bl = aChoice;
    }

    get buttonSelected()
    {
        return this.buttonSelected_bl;
    }

    onButtonDown()
    {
        if (this.buttonSelected_bl)
        {
            return;
        }

        this.buttonSelected_bl = true;
        this._getTicker();
    }

    _getTicker()
    {
        var lTicker = this._ticker1;
        var lTimerValue_int = 0;

        lTicker.add(() =>
        {
            for (var i = 0; i < 10 ; i++)
            {
                if (lTimerValue_int > 0 && lTimerValue_int < 13)
                {
                    this.store[10-i-1].y -= (10-i-1);
                }
            }

            if(lTimerValue_int === 22)
            {
                lTicker.stop();
            }

            lTimerValue_int +=1;

        })

        lTicker.update(0);
        lTicker.start();
    }

    startCloseAnimation()
    {
        var lTicker = this._ticker2;
        var lTimerValue_int = 0;

        lTicker.add(() =>
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