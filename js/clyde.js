/**
 * Created by mac on 4/25/15.
 */
/**
 * Created by mac on 4/23/15.
 */
function Clyde(scene, game, config, pacman, moveHelper){

    var sprite = GhostBase(scene, game, config, pacman, moveHelper, config.CLYDE_IMAGE_FILE, config.CLYDE_SPEED, config.CLYDE_AI_TIMER);

    sprite.init = function(){

        this.setPosition(config.PACMAN_START_X, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.CLYDE_SPEED);
    };

    //move towards pacman
    //close the bigger distance
    sprite.createPossibleMovesQueue =  function(){
        var movesQueue = [];

        var clydeTarget = game.getClydeTarget();
        var targetIsSouth = this.y < clydeTarget.y;
        var targetIsEastward = this.x < clydeTarget.x;

        if(targetIsSouth){
            movesQueue.push(config.SOUTH);
        }

        if(targetIsEastward){
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