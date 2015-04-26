/**
 * Created by mac on 4/23/15.
 */
function MoveHelper(maze, config){

    this.log = function(message){
        console.log(message);
    };

    this.isBlocked = function(sprite, speed){

        var testX = sprite.x;
        var testY = sprite.y;

        if(sprite.getMoveAngle() === config.WEST){
            testX = sprite.x - (speed+ 16);
        }
        if(sprite.getMoveAngle() === config.EAST){
            testX = sprite.x + (speed + 16);
        }
        if(sprite.getMoveAngle() === config.NORTH){
            testY = sprite.y - (speed + 16);
        }
        if(sprite.getMoveAngle() === config.SOUTH){
            testY = sprite.y + (speed+ 16);
        }

        return maze.isValidMove(testX, testY) === false;
    };


    //Centers pacman in the middle of the road
    //without this function pacman can end up to far up or down
    //while traveling east or west
    this.hingeToHorizontalTrack = function(sprite) {
        //If direction changed from vertical to horizontal or vice versa
        //hinge the sprite to the center of the traveling lane
        if (movingHorizontal(sprite)) {

            var alignmentOnY = Math.floor(sprite.y / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
            if (Math.abs(alignmentOnY - sprite.y) > 2) {
                sprite.setPosition(sprite.x, alignmentOnY);
            }
        }
    };

    this.hingeToVerticalTrack = function(sprite) {
        if (movingVertical(sprite)) {
            var alignmentOnX = Math.floor(sprite.x / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
            if (Math.abs(alignmentOnX - sprite.x) > 2) {
                sprite.setPosition(alignmentOnX, sprite.y);
            }
        }
    };

    //use this so that ghosts don't turn too early creating a jerk effect
    this.isWithinTurningBounds = function(sprite){
        var alignmentOnX = Math.floor(sprite.x / config.TILE_HEIGHT) * config.TILE_HEIGHT+16;
        var alignmentOnY = Math.floor(sprite.y / config.TILE_HEIGHT) * config.TILE_HEIGHT+16;
        var result = false;
        var travelingMsg = "unknown travel direction";
        var xoffset = 0;
        var yoffset = 0;

        var threshold = 1;
        this.log(sprite);
        if(sprite.getMoveAngle() === config.SOUTH || sprite.getMoveAngle() === config.NORTH){
            travelingMsg = "Traveling vertically";
            yoffset = Math.abs( sprite.y - alignmentOnY);
            this.log("Off by on Y: " + yoffset.toString());

            result =  (yoffset <= threshold);
        }

        if(sprite.getMoveAngle() === config.EAST || sprite.getMoveAngle() == config.WEST){
            travelingMsg = "Traveling horizontally";
            xoffset = Math.abs( sprite.x - alignmentOnX);
            this.log("off by on X: " + xoffset.toString());

            result =  (xoffset <= threshold);
        }



        this.log(travelingMsg);

        return result;
    };

    this.oppositeAngle = function(angle){
        var integerAngle = Math.floor(angle);

        if(integerAngle=== config.SOUTH){
            return config.NORTH;
        }
        else if(integerAngle === config.NORTH)
        {
            return config.SOUTH;
        }
        else if(integerAngle === config.WEST){
            return config.EAST;
        }
        else {
            return config.WEST;
        }
    };

    function movingHorizontal(sprite){
        return (sprite.getMoveAngle() === config.WEST || sprite.getMoveAngle() === config.EAST);
    }

    function movingVertical(sprite){
        return (sprite.getMoveAngle() === config.NORTH || sprite.getMoveAngle() === config.SOUTH);
    }
}