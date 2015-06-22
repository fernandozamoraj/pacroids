/**
 * Created by FernandoZ on 4/26/2015.
 */
function PacmanGhostCollisionDetector(game, pacman, pinky, blinky, inky, clyde){

    var ghosts = [pinky, blinky, inky, clyde];
    var config = game.getConfig();

    //using a dummy sprite instead of the pacman sprite because
    //since the pacman sprite uses an anmiation sprite sheet it has too large an area for collision
    var dummySprite = new EnhancedSprite(game.getScene(), config.PACMAN_FILE_2, config.TILE_WIDTH, config.TILE_HEIGHT);

    var _ghostThatGotCaught;

    function detectCollision(){

        _ghostThtGotCaught = null;
        game.log("PGCD: entered detect collision");
        for(var i =0; i < ghosts.length; i++){
            if(ghosts[i].collidesWith(dummySprite)){
                _ghostThatGotCaught = ghosts[i];
                game.log("PGCD: collision detected");
                return true;
            }
        }


        game.log("Exiting checkIfGhostAndPacmanCollide");
        return false;
    }

    this.checkIfGhostAndPacmanCollided = function(){
        dummySprite.setPosition(pacman.x, pacman.y);
        var pacmanAndGhostCollided =  detectCollision();

        game.log("PGCD: entered checkIfGhostAndPacmanCollide");
        if(pacmanAndGhostCollided){
            if(game.isInPowerMode()){
                game.updateGhostCaught(_ghostThatGotCaught);
            }
            else{
                game.killPacman();
            }
        }

        game.log("PGCD: exiting checkIfGhostAndPacmanCollide");
    }
}