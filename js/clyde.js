/**
 * Created by mac on 4/25/15.
 */
/**
 * Created by mac on 4/23/15.
 */
function Clyde(scene, config, pacman, moveHelper){

    var sprite = GhostBase(scene, config, pacman, moveHelper, config.CLYDE_IMAGE_FILE, config.CLYDE_SPEED, config.CLYDE_AI_TIMER);

    sprite.init = function(){

        this.setPosition(config.PACMAN_START_X, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.CLYDE_SPEED);
    };

    //move towards pacman
    //close the bigger distance
    sprite.createPossibleMovesQueue =  function(){
        var movesQueue = [];

        var pacmanIsSouth = this.y < pacman.y;
        var pacmanIsEastward = this.x < pacman.x;

        if(pacmanIsSouth){
            movesQueue.push(config.SOUTH);
        }

        if(pacmanIsEastward){
            movesQueue.push(config.EAST);
        }

        //Brute force approach here
        //since I don't want to check what is already in the queuee
        //I will just add them all in
        movesQueue.push(config.SOUTH);
        movesQueue.push(config.NORTH);
        movesQueue.push(config.WEST);
        movesQueue.push(config.EAST);


        return movesQueue;
    };

    return sprite;

}