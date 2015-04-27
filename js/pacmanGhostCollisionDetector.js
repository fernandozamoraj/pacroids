/**
 * Created by FernandoZ on 4/26/2015.
 */
function PacmanGhostCollisionDetector(game, pacman, pinky, blinky, inky, clyde){

    var ghosts = [pinky, blinky, inky, clyde];

    function detectCollision(){

        game.log("PGCD: entered detect collision");
        for(var i =0; i < ghosts.length; i++){
            if(ghosts[i].collidesWith(pacman)){

                game.log("PGCD: collision detected");
                return true;
            }
        }


        game.log("Exiting checkIfGhostAndPacmanCollide");
        return false;
    }

    this.checkIfGhostAndPacmanCollided = function(){
        var pacmanAndGhostCollided =  detectCollision();

        game.log("PGCD: entered checkIfGhostAndPacmanCollide");
        if(pacmanAndGhostCollided){
            if(game.isInPowerMode()){
                game.updateGhostCaught();
            }
            else{
                game.killPacman();
            }
        }

        game.log("PGCD: exiting checkIfGhostAndPacmanCollide");
    }
}