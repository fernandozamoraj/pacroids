/**
 * Created by mac on 4/23/15.
 */
function Blinky(scene, game, config, pacman, moveHelper){

    var sprite = GhostBase(scene, game, config, pacman, moveHelper, config.BLINKY_IMAGE_FILE, config.BLINKY_SPEED, config.BLINKY_AI_TIMER);

    sprite.init = function(){

        this.setPosition(config.PACMAN_START_X + 64, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.BLINKY_SPEED);
        moveHelper.hingeToHorizontalTrack(this);
        moveHelper.hingeToVerticalTrack(this);
    };

    //move towards pacman
    //close the bigger distance
    sprite.createPossibleMovesQueue =  function(){
        var movesQueue = [];

        var horizontalDirection;
        var verticalDirection;
        var blinkyTarget = game.getClydeTarget();
        var horizontalDistance = Math.abs(blinkyTarget.x - this.x);
        var verticalDistance = Math.abs(blinkyTarget.y - this.y);
        var targetIsSouth = this.y < blinkyTarget.y;
        var targetIsEastward = this.x < blinkyTarget.x;

        if(targetIsSouth){
            verticalDirection = config.SOUTH;
        }
        else
        {
            verticalDirection = config.NORTH;
        }

        if (targetIsEastward) {
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