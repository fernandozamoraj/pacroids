/**
 * Created by mac on 4/23/15.
 */
function Pinky(scene, config, pacman, moveHelper){

    var sprite = GhostBase(scene, config, pacman, moveHelper, config.PINKY_IMAGE_FILE, config.PINKY_SPEED, config.PINKY_AI_TIMER);


    sprite.init = function(){

        this.setPosition(config.PACMAN_START_X + 32, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.PINKY_SPEED);
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

        if(horizontalDistance < verticalDistance){
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