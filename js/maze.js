/**
 * Created by mac on 4/18/15.
 */
function Maze(scene, config){


    var map = [
    [23,17,17,17,17,17,17,17,17,28,17,17,17,17,17,17,17,17,20], //1
    [16,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,18], //2
    [16,33,14,15,00,14,19,15,00,01,00,14,19,15,00,14,15,33,18], //3
    [16,00,13,12,00,13,17,12,00,08,00,13,17,12,00,13,12,00,18], //4
    [16,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18], //5
    [16,00,09,11,00,10,00,09,02,04,02,11,00,10,00,09,11,00,18], //6
    [16,00,00,00,00,01,00,00,00,01,00,00,00,01,00,00,00,00,18], //7
    [22,19,19,15,00,07,02,11,00,08,00,09,02,05,00,14,19,19,21], //8
    [32,32,32,16,00,01,32,32,32,32,32,32,32,01,00,18,32,32,32], //9
    [17,17,17,12,00,08,32,14,19,19,19,15,32,08,00,13,17,17,17], //10
    [32,32,32,32,00,32,32,18,32,32,32,16,32,32,00,32,32,32,32], //11
    [19,19,19,15,00,10,32,13,17,17,17,12,32,10,00,14,19,19,19], //12
    [32,32,32,16,00,01,32,32,32,32,32,32,32,01,00,18,32,32,32], //13
    [23,17,17,12,00,08,32,09,02,04,02,11,32,08,00,13,17,17,20], //14
    [16,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,18], //15
    [16,33,09,25,00,09,02,11,00,08,00,09,02,11,00,24,11,33,18], //16
    [16,00,00,01,00,00,00,00,00,00,00,00,00,00,00,01,00,00,18], //17
    [31,11,00,08,00,10,00,09,02,04,02,11,00,10,00,08,00,09,29], //18
    [16,00,00,00,00,01,00,00,00,01,00,00,00,01,00,00,00,00,18], //19
    [16,00,09,02,02,06,02,11,00,08,00,09,02,06,02,02,11,00,18], //20
    [16,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18], //21
    [22,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,21]]; //22

    var tiles = new Array();
    var powerPelletTimer = 0;

    function togglePowerPellets(){
        powerPelletTimer = powerPelletTimer + 1;

        if(powerPelletTimer <= 4){
            tiles[39].setImage(config.POWER_PELLET_SMALL);
            tiles[55].setImage(config.POWER_PELLET_SMALL);
            tiles[286].setImage(config.POWER_PELLET_SMALL);
            tiles[302].setImage(config.POWER_PELLET_SMALL);
        }
        else if(powerPelletTimer <= 8){
            tiles[39].setImage(config.POWER_PELLET_LARGE);
            tiles[55].setImage(config.POWER_PELLET_LARGE);
            tiles[286].setImage(config.POWER_PELLET_LARGE);
            tiles[302].setImage(config.POWER_PELLET_LARGE);
        }
    }

    this.init = function(){
        var rows = 0;
        var columns = 0;
        var tempSprite;
        var tilePath = "";

        for(rows = 0; rows < 22; rows++){
            console.log("row " + rows);
            columns = 0;
            for(; columns < 19; columns++ ){

                tilePath = "./img/maze/Tile" + map[rows][columns] + ".PNG";
                tempSprite = new Sprite(scene, tilePath, 32, 32);
                tempSprite.setPosition(columns*32+16, rows*32+16);
                tempSprite.setSpeed(0);
                tiles.push(tempSprite);

            }
        }
    };

    this.update = function(){
        var i = 0;
        var tilesCount = 19*22;

        togglePowerPellets();

        if(powerPelletTimer >= 8 ){
            powerPelletTimer = 0;
        }

        //console.log(tiles);
        //console.log(tiles.length);
        for(i = 0; i < tiles.length; i++ ){
            tiles[i].update();
        }
    };

    this.isValidMove = function(x, y){
       var row = Math.floor( y/config.TILE_WIDTH);
       var column = Math.floor( x/config.TILE_WIDTH);

        //mid screen tunne
        if(row === 10 && (x < 0 || x > 520))
        {
            return true;
        }

        console.log("Row " + row);
        console.log("Col " + column);

       return canMoveThere( row, column );
    };


    this.getValueAt = function(row, column){
        return map[row][column];
    };

    function canMoveThere(row, column){
        return isPelletPowerPelletOrEmptySpace(row, column);
    }

    function isPelletPowerPelletOrEmptySpace(row, column){
        return (map[row][column] === 0 || map[row][column]===32 || map[row][column]===33 );
    }

}