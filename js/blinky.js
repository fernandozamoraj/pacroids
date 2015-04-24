/**
 * Created by mac on 4/23/15.
 */
function Blinky(scene, config, pacman, moveHelper){

    var sprite = new EnhancedSprite(scene, config.BLINKY_IMAGE_FILE, 32, 32);

    var _aiTimer = 0;

    sprite.init = function(){

        this.setPosition(config.PACMAN_START_X + 64, (config.PACMAN_START_Y - (8*config.TILE_HEIGHT)));
        this.setMoveAngle(config.WEST);
        this.setSpeed(config.PACMAN_REGULAR_SPEED);
    };

    //move towards pacman
    //close the bigger distance
    sprite.moveTowardsPacman =  function(){
        var angles = [];

        var horizontalDirection;
        var verticalDirection;

        var horizontalDistance = Math.abs(pacman.x - this.x);
        var verticalDistance = Math.abs(pacman.y - this.y);

        if(this.y < pacman.y){
            verticalDirection = config.SOUTH;
        }
        else
        {
            verticalDirection = config.NORTH;
        }

        if (this.x < pacman.x) {
            horizontalDirection = config.EAST;
        }
        else {
            horizontalDirection = config.WEST;
        }

        if(horizontalDistance < verticalDistance){
            angles.push(verticalDirection);
            angles.push(horizontalDirection);
        }
        else{
            angles.push(horizontalDirection);
            angles.push(verticalDirection);
        }


        return angles;
    };

    sprite.doAI = function(){

        //NO turning allowed unless n frames have passed to prevent bouncing around
        //and jittering around
        //Except is pacman is blocked
        _aiTimer++;
        if(_aiTimer < 10  && moveHelper.isBlocked(this, config.PACMAN_REGULAR_SPEED) === false){
            return;
        }

        //Only allow ghost to do AI if it is within lined up wih the perpendicular route
        if(moveHelper.isWithinTurningBounds(this) === false){
            return;
        }


        var routes = [];
        var i = 0;

        var originalAngle = this.getMoveAngle();
        routes = this.moveTowardsPacman();


        routes.push(config.SOUTH);
        routes.push(config.WEST);
        routes.push(config.NORTH);
        routes.push(config.EAST);

        i = 0;

        //turn left or right from current direction
        if(routes[i] !== oppositeAngle(originalAngle)) {
            this.setMoveAngle(routes[0]);
        }

        //if blocked revert to original angle
        if(moveHelper.isBlocked(this, config.PACMAN_REGULAR_SPEED)){
            this.setMoveAngle(originalAngle);
        }
        else{
            _aiTimer = 0;
        }

        //if still blocked try all the alternate routes except going in the
        //opposite direction i.e. don't bounce off walls
        while(moveHelper.isBlocked(this, config.PACMAN_REGULAR_SPEED)){

            console.log("block on " + routes[i].toString());

            //pinky must never go back where he came from...
            //i.e. don't bounce off walls
            //left of right from where he came from is OK
            if(routes[i] !== oppositeAngle(originalAngle)){
                this.setMoveAngle(routes[i]);
                _aiTimer=0;
            }

            i++;
        };

        moveHelper.hingeToHorizontalTrack(this);
        moveHelper.hingeToVerticalTrack(this);

    };

    function oppositeAngle(angle){
        if(angle === config.SOUTH){
            return config.NORTH;
        }
        else if(angle === config.NORTH)
        {
            return config.NORTH;
        }
        else if(angle === config.WEST){
            return config.EAST;
        }
        else {
            return config.WEST;
        }
    }




    return sprite;

}