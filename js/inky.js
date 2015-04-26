/**
 * Created by mac on 4/26/15.
 */
/**
 * Created by mac on 4/25/15.
 */
/**
 * Created by mac on 4/23/15.
 */
function Inky(scene, config, pacman, moveHelper){

    var sprite = new GhostBase(scene, config, pacman, moveHelper, config.INKY_IMAGE_FILE, config.INKY_SPEED, config.INKY_AI_TIMER);

    sprite.init = function(){
        this.setPosition(config.PACMAN_START_X, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.INKY_SPEED);
    };

    //move towards pacman
    //close the bigger distance
    sprite.createPossibleMovesQueue =  function(){
        var movesQueue = [];

        var horizontalDirection;
        var verticalDirection;

        var horizontalDistance = Math.abs(pacman.x - this.x);
        var verticalDistance = Math.abs(pacman.y - this.y);
        var pacmanIsSouth = this.y < pacman.y;
        var pacmanIsEastward = this.x < pacman.x;

        if(pacmanIsSouth){
            verticalDirection = config.SOUTH;
        }
        else
        {
            verticalDirection = config.NORTH;
        }

        if (pacmanIsEastward) {
            horizontalDirection = config.EAST;
        }
        else {
            horizontalDirection = config.WEST;
        }

        if(this.distanceTo(pacman) > 300 &&  horizontalDistance > verticalDistance){
            movesQueue.push(verticalDirection);
            movesQueue.push(horizontalDirection);
        }
        else{
            movesQueue.push(horizontalDirection);
            movesQueue.push(verticalDirection);
        }

        //Brute force approach here
        //since I don't want to check what is already in the queuee
        //I will just add them all in
        movesQueue.push(config.SOUTH);
        movesQueue.push(config.WEST);
        movesQueue.push(config.NORTH);
        movesQueue.push(config.EAST);

        return movesQueue;
    };

    return sprite;

}