class CardSprite extends PIXI.Container {
    constructor(frontFace, id, number) {
        super();

        this.storeCount = 10;
        this.cardWidth = 85;
        this.cardHeight = 100;

        this.store = [];

        this._ticker = new PIXI.Ticker();

        this._id = id;
        this._number = number;

        this._buttonSelected = false;

        this.setSprite(frontFace);
        this.createStore();
    }

    set buttonSelected(aChoice) {
        this._buttonSelected = aChoice;
    }

    get buttonSelected() {
        return this._buttonSelected;
    }

    get id() {
        return this._id;
    }

    get number() {
        return this._number;
    }

    setSprite(face) {
        const sprite = PIXI.Sprite.from(PIXI.Texture.from(face));

        sprite.width = this.cardWidth;
        sprite.height = this.cardHeight;
        sprite.eventMode = 'static'; 
        sprite.buttonMode = true;
        sprite.on('pointertap', this.onClick.bind(this));

        this.addChild(sprite);
    }

    createStore() {
        const container = new PIXI.Container();
        
        for (let i = 0; i < this.storeCount; i++) {
            const graphics = new PIXI.Graphics();
            
            graphics.lineStyle(1, 0xFFFFFF);
            graphics.beginFill(0xFFCC5A);
            graphics.drawRect(0, i*10, this.cardWidth, this.cardHeight / this.storeCount);
            graphics.endFill();
            
            this.store.push(graphics);
            
            container.addChild(graphics);
        }
        
        this.addChild(container);
    }

    onClick() {
        if (this._buttonSelected) {
            return;
        }

        this._animate('open', true);
        this._buttonSelected = true;
    }

    startOpenAnimation() {
        this._animate('open');
    }

    startCloseAnimation() {
        this._animate('close');

        this._buttonSelected = false;
    }

    _animate(direction, isPlayer) {
        const ticker = this._ticker;
        
        let timer_value = 0;

        ticker.add(() => {
            if (timer_value >= 0 && timer_value < 10) {
                for (let i = this.storeCount; i > 0; i--) {
                        this.store[i-1].y += direction === 'close' ? (i-1) : (-i+1)
                    }
            }

            if(timer_value === 10) {
                ticker.stop();

                if (direction === 'open' && isPlayer) {
                    this.emit('selectCard', {id: this.id, number: this._number});
                }
            }

            timer_value +=1;

        })

        ticker.update(0);
        ticker.start();
    }
}

export default CardSprite;