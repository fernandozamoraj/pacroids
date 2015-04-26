/**
 * Created by mac on 4/23/15.
 */
function Blinky(scene, config, pacman, moveHelper){

    var sprite = new EnhancedSprite(scene, config.BLINKY_IMAGE_FILE, 32, 32);

    var _aiTimer = 0;

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

    sprite.doAI = function(){


        if(this.aiIsALlowedAtThisMoment() === false)
            return;



        var originalAngle = this.getMoveAngle();
        var movesQueue = this.createPossibleMovesQueue();

        attemptTheFIrstMoveInTheQueue(this, movesQueue, originalAngle);
        cycleThroughAlternateMoves(this, movesQueue, originalAngle);

        console.log("Original Angle: " + originalAngle.toString());
        console.log("New Angle: " + this.getMoveAngle());
        moveHelper.hingeToHorizontalTrack(this);
        moveHelper.hingeToVerticalTrack(this);

    };

    sprite.aiIsALlowedAtThisMoment = function(){
        //NO turning allowed unless n frames have passed to prevent bouncing around
        //and jittering around
        //Except is pacman is blocked
        _aiTimer++;
        if(_aiTimer < config.BLINKY_AI_TIMER  && moveHelper.isBlocked(this, config.BLINKY_SPEED) === false){
            return false;
        }

        //Only allow ghost to do AI if it is within lined up wih the perpendicular route
        if(moveHelper.isWithinTurningBounds(this) === false){
            return false;
        }

        return true;
    };

    function attemptTheFIrstMoveInTheQueue(sprite, routes, originalAngle) {


        //turn left or right from current direction
        if (routes[0] != oppositeAngle(originalAngle)) {
            sprite.setMoveAngle(routes[0]);
        }

        //if blocked revert to original angle
        if (moveHelper.isBlocked(sprite, config.PACMAN_REGULAR_SPEED)) {
            sprite.setMoveAngle(originalAngle);
        }
        else {
            _aiTimer = 0;
        }
    }

    function cycleThroughAlternateMoves(sprite, routes, originalAngle) {

        var i = 1;
       //if still blocked try all the alternate routes except going in the
        //opposite direction i.e. don't bounce off walls
        while (moveHelper.isBlocked(sprite, config.BLINKY_SPEED)) {

            console.log("block on " + routes[i].toString());

            //pinky must never go back where he came from...
            //i.e. don't bounce off walls
            //left of right from where he came from is OK
            if (routes[i] != oppositeAngle(originalAngle)) {
                sprite.setMoveAngle(routes[i]);
                _aiTimer = 0;
            }

            i++;
        }

    }


    function oppositeAngle(angle){
        return moveHelper.oppositeAngle(angle);
    }

    return sprite;

}