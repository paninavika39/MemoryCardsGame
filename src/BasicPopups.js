import { APP_PARAMS } from "./constants.js";

class BasicPopup extends PIXI.Container {
    constructor(text) {
        super();

        const bg = new PIXI.Graphics();

        bg.beginFill(0x000000);
        bg.drawRect(-APP_PARAMS.CANVAS_WIDTH / 2, -APP_PARAMS.CANVAS_HEIGHT / 2, APP_PARAMS.CANVAS_WIDTH, APP_PARAMS.CANVAS_HEIGHT);
        bg.endFill();
        bg.alpha = 0.8;

        this.addChild(bg);

        const graphics = new PIXI.Graphics();

        graphics.lineStyle(4, 0x000000);
        graphics.beginFill(0x000000);
        graphics.drawRect(-APP_PARAMS.POPUP_WIDTH / 2, -APP_PARAMS.POPUP_HEIGHT / 2, APP_PARAMS.POPUP_WIDTH, APP_PARAMS.POPUP_HEIGHT);
        graphics.endFill();
        graphics.eventMode = 'static'; 
        graphics.buttonMode = true;
        graphics.on('pointertap', this.onClick.bind(this));

        this.addChild(graphics);

        const style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 70,
            fontWeight: 'bold',
            fill: ['#94b329', '#ffffff']
        });

        this.basicText = new PIXI.Text(text, style);

        this.basicText.anchor.set(0.5);

        this.addChild(this.basicText);

        this.position.set(APP_PARAMS.CANVAS_WIDTH / 2, APP_PARAMS.CANVAS_HEIGHT / 2);

        this._visible = false;
    }

    onClick() {
        console.log('Click');
    }

    /**
     * @param {boolean} value
     */
    set _visible(value) {
        this.visible = value;
    }
}

class StartGamePopup extends BasicPopup {
    constructor() {
        super('Начать игру');
        this._visible = true;
    }

    onClick() {
        this._visible = false;

        this.emit('startGame');
    }
}

class FinishGamePopup extends BasicPopup {
    constructor() {
        super('Вы выиграли!');
    }
}

export { BasicPopup, StartGamePopup, FinishGamePopup };
