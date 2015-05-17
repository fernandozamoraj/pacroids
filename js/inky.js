/**
 * Created by mac on 4/26/15.
 */
/**
 * Created by mac on 4/25/15.
 */
/**
 * Created by mac on 4/23/15.
 */
function Inky(scene, game, config, pacman, moveHelper){

    var sprite = GhostBase(scene, game, config, pacman, moveHelper, config.INKY_IMAGE_FILE, config.INKY_SPEED, config.INKY_AI_TIMER);

    sprite.init = function(){
        this.setPosition(config.PACMAN_START_X, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.INKY_SPEED);
    };

    //move towards pacman
    //close the bigger distance
    sprite.createPossibleMovesQueue =  function(){
        var movesQueue = [];
        var inkyTarget = game.getInkyTarget();
        var targetIsSouth = this.y < inkyTarget.y;
        var targetIsEastward = this.x < inkyTarget.x;

        if(targetIsEastward){
            movesQueue.push(config.EAST);
        }

        if(targetIsSouth){
            movesQueue.push(config.SOUTH);
        }


        //Brute force approach here
        //since I don't want to check what is already in the queuee
        //I will just add them all in
        movesQueue.push(config.EAST);
        movesQueue.push(config.WEST);
        movesQueue.push(config.SOUTH);
        movesQueue.push(config.NORTH);

        return movesQueue;
    };

    return sprite;

}