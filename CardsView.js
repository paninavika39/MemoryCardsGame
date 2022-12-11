import CardSprite from "./CardSprite.js";

class CardView extends PIXI.Container
{
    constructor()
    {
        super();

        var url ='images/';
        var frontFace =[1, 2, 3, 4, 5, 6, 7, 8];
        var format = '.png';

        var coord_arr = [];
        var cards_arr = [];
        var card;

        this.cards_arr = [];

        //Создаём 8 пар карточек и 16 координат (x, y)...
        for (var i_row = 0; i_row < 4; i_row++)
        {
            cards_arr[i_row] = [];
            coord_arr[i_row]= [];

            for (var j_col = 0; j_col < 4; j_col++)
            {
                card = new CardSprite(url + frontFace[i_row < 2 ? j_col : j_col + 4] + format, frontFace[i_row < 2 ? j_col : j_col + 4]);
                cards_arr[i_row][j_col] = card;
                coord_arr[i_row][j_col] = [93 + j_col*138, 146 + i_row*182];

                this.cards_arr.push(card);
                this.addChild(card);
            }
        }
        //...Создаём 8 пар карточек и 16 координат (x, y)

        //Рандомно расставляем карточки по созданным координатам...
        var cardHelp_arr = cards_arr;
        var coordHelp_arr = coord_arr;

        for (var i_row = 0; i_row < 4; i_row++)
        {
            for (var j_col = 0; j_col < 4; j_col++)
            {
                while (coordHelp_arr[i_row][j_col])
                {
                    var a = Math.floor(Math.random() * 4)
                    var b = Math.floor(Math.random() * 4)

                    if (cardHelp_arr[a][b])
                    {
                        var card = cardHelp_arr[a][b];
                        card.x = coordHelp_arr[i_row][j_col][0];
                        card.y = coordHelp_arr[i_row][j_col][1];
                        cardHelp_arr[a][b] = null;
                        coordHelp_arr[i_row][j_col] = null;
                    }
                }
            }
        }
        //...Рандомно расставляем карточки по созданным координатам
    }

    returnAllCards()
    {
        return this.cards_arr;
    }
}

export default CardView;