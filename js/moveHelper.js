/**
 * Created by mac on 4/23/15.
 */
function MoveHelper(maze, config){

    this.isBlocked = function(sprite, speed){

        console.log("Entered is blocked");
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
            if (alignmentOnY !== sprite.y) {
                sprite.setPosition(sprite.x, alignmentOnY);
            }
        }
    };

    this.hingeToVerticalTrack = function(sprite) {
        if (movingVertical(sprite)) {
            var alignmentOnX = Math.floor(sprite.x / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
            if (alignmentOnX !== sprite.x) {
                sprite.setPosition(alignmentOnX, sprite.y);
            }
        }
    };

    //use this so that ghosts don't turn too early creating a jerk effect
    this.isWithinTurningBounds = function(sprite){
        var alignmentOnX = Math.floor(sprite.x / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
        var alignmentOnY = Math.floor(sprite.y / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;

        var threshold = 1;
        if(sprite.getMoveAngle() === config.SOUTH || sprite.getMoveAngle() && config.NORTH){
            return Math.abs( sprite.x - alignmentOnX) < threshold;
        }

        if(sprite.getMoveAngle() === config.EAST || sprite.getMoveAngle() && config.WEST){
            return Math.abs( sprite.y - alignmentOnY) < threshold;
        }
    };

    function movingHorizontal(sprite){
        return (sprite.getMoveAngle() === config.WEST || sprite.getMoveAngle() === config.EAST);
    }

    function movingVertical(sprite){
        return (sprite.getMoveAngle() === config.NORTH || sprite.getMoveAngle() === config.SOUTH);
    }



}