/**
 * Created by mac on 4/18/15.
 */
function Pacman(scene, maze, config, joyStick){
    var sprite = new EnhancedSprite(scene, config.PACMAN_FILE_2, 32, 32);
    var animationTimer = 0;
    var _powerTimer = new Timer();
    _powerTimer.start();
    var _boostedOnce = false;

    function inPowerMode(){
        return _boostedOnce && _powerTimer.getElapsedTime() < config.POWER_TIME;
    }

    function getDirectionFromSwipeInput(direction) {
        var THRESHOLD = 10;
        var diffX = joyStick.getDiffX();
        var diffY = joyStick.getDiffY();

        //need to determine which was more powerful vertical or horizontal
        var goVertical = (Math.abs(diffX)) < (Math.abs(diffY));

        if (goVertical === true) {
            if (diffY < -(THRESHOLD)) {
                direction = config.NORTH;
            }
            else if (diffY > THRESHOLD) {
                direction = config.SOUTH;
            }

        }
        else {
            if (diffX < -(THRESHOLD)) {
                direction = config.WEST;
            }
            else if (diffX > THRESHOLD) {
                direction = config.EAST;
            }
        }
        return direction;
    }

    function getDirectionFromKeyboardInput(direction) {
        if (keysDown[K_UP] === true) {
            direction = config.NORTH;
         }
        else if (keysDown[K_DOWN] === true) {
            direction = config.SOUTH;
        }
        else if (keysDown[K_LEFT] === true) {
            direction = config.WEST;
        }
        else if (keysDown[K_RIGHT] === true) {
            direction = config.EAST;
        }
        return direction;
    }

    function getKeyedInDirection(currentDirection){
        var direction = currentDirection;

        if(isTouchScreen()){
            direction = getDirectionFromSwipeInput(direction);
        }
        else{
            direction = getDirectionFromKeyboardInput(direction);
        }

        return direction;
    }

    function isTouchScreen(){
        return joyStick;
    }

    function movingHorizontal(){
        return (sprite.getMoveAngle() === config.WEST || sprite.getMoveAngle() === config.EAST);
    }

    function movingVertical(){
        return (sprite.getMoveAngle() === config.NORTH || sprite.getMoveAngle() === config.SOUTH);
    }

    //Centers pacman in the middle of the road
    //without this function pacman can end up to far up or down
    //while traveling east or west
    function hingeToHorizontalTrack() {
        //If direction changed from vertical to horizontal or vice versa
        //hinge the sprite to the center of the traveling lane
        if (movingHorizontal()) {

            var alignmentOnY = Math.floor(this.y / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
            if (alignmentOnY !== this.y) {
                this.setPosition(this.x, alignmentOnY);
            }
        }
    }

    function hingeToVerticalTrack() {
        if (movingVertical()) {
            var alignmentOnX = Math.floor(this.x / config.TILE_HEIGHT) * config.TILE_HEIGHT + 16;
            if (alignmentOnX !== this.x) {
                this.setPosition(alignmentOnX, this.y);
            }
        }
    }

    //TODO: use spritesheet instead of switching images
    //switching images causes flicker
    function switchPacmanImageForChompingAnimation() {
        animationTimer = animationTimer + 1;

        if (animationTimer === 1) {
            this.setImage(config.PACMAN_FILE_2);
        }
        else if (animationTimer === 3) {
            this.setImage(config.PACMAN_FILE_1);
        }

        if (animationTimer >= 5) {
            animationTimer = 0;
        }
    }

    sprite.isBlocked = function(){

        var testX = this.x;
        var testY = this.y;

        if(this.getMoveAngle() === config.WEST){
            testX = this.x - (config.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === config.EAST){
            testX = this.x + (config.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === config.NORTH){
            testY = this.y - (config.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === config.SOUTH){
            testY = this.y + (config.PACMAN_REGULAR_SPEED + 16);
        }

        return maze.isValidMove(testX, testY) === false;
    };

    sprite.checkKeysAndUpdatePosition = function(){

        var previousSpeed;
        var previousDirection;
        var MOVINGSPEED = inPowerMode() ? config.PACMAN_FAST_SPEED : config.PACMAN_REGULAR_SPEED;
        switchPacmanImageForChompingAnimation.call(this);

        //Check for block prior to checking for keys to know if
        //this needs to stop
        if(this.isBlocked()){
            this.setSpeed(0);
        }

        previousSpeed = this.getSpeed();
        previousDirection = this.getMoveAngle();

        var newDirection = getKeyedInDirection(this.getMoveAngle());
        this.setAngle(newDirection);
        this.setSpeed(MOVINGSPEED);

        //Check for blockage after changing direction
        if(this.isBlocked()){

            //revert to previous speed and direction if blocked
            this.setSpeed(previousSpeed);
            this.setAngle(previousDirection);
        }

        //hinging is necessary to remain on track
        //otherwise there is a littlbe bit of play to move
        //perpendicular to the direction of travel
        hingeToHorizontalTrack.call(this);
        hingeToVerticalTrack.call(this);

    };

    sprite.updateChildren = function(){

    };

    sprite.boostSpeed = function(){
        _powerTimer.reset();
        _boostedOnce = true;
    };

    sprite.init = function(){
        this.setPosition(config.PACMAN_START_X, config.PACMAN_START_Y);
        this.setSpeed(0);

    };

    //TODO: fix this later so that the score is outside
    sprite.displayPosition = function(score){
        var fontFamily = "courier new";
        var fontSize = "25";
        var fontColor = "#ffffff";
        var textValue = "HIGH SCORE        " + score.toString() + "        " + score.toString();

        this.writeText(fontFamily, fontSize, fontColor, textValue, 26, 20);
    };

    return sprite;
}

