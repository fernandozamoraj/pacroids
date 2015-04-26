/**
 * Created by mac on 4/22/15.
 */
function PacmanPelletCollisionDetector(pacman, maze, scoreBoard, soundManager){

    this.log = function(message){
        log(message);
    };

    function log(message){
        //console.log(message);
    }

    function checkIfPacmanAtePellet(){

        //eat pellet is a multi step process
        //because all parties must acknoledge the eat pellet action
        //sound manager needs to make a sound
        //scoredboard needs to update score
        //and the maze needs to update the tile as an empty space
        if(maze.isPellet(pacman.x, pacman.y)){
            maze.eatPellet(pacman.x, pacman.y);
            scoreBoard.updateScoreForPellet();
            soundManager.playPelletAteSound();
        }

        if(maze.isPowerPellet(pacman.x, pacman.y)){
            log("is power pellet");
            maze.eatPellet(pacman.x, pacman.y);
            scoreBoard.updateScoreForPowerPellet();
            soundManager.playPelletAteSound();
            pacman.boostSpeed();
        }
        else{
            log("is not power pellet");
        }
    }

    this.update = function(){
        checkIfPacmanAtePellet();
    };
}