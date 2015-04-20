/**
 * Created by mac on 4/18/15.
 */
function Pacman(scene, maze, config){
    var sprite = new EnhancedSprite(scene, config.PACMAN_FILE_2, 32, 32);
    var animationTimer = 0;
    var _joy;

    function getKeyDirection(currentDirection){
        var direction = currentDirection;

        var xOffset = 0;
        var yOffset = 0;

        if(_joy){
            xOffset = _joy.getDiffX();
            yOffSet = _joy.getDiffY();
            
        }

        if(keysDown[K_LEFT] === true || xOffset > 0){
            direction = config.WEST;
        }
        else if(keysDown[K_RIGHT] === true || xOffset < 0){
            direction = config.EAST;
        }
        else if(keysDown[K_UP] === true){
            direction = config.NORTH;
        }
        else if(keysDown[K_DOWN] === true){
            direction = config.SOUTH;
        }

        return direction;

    }

    function movingHorizontal(){
        return (sprite.getMoveAngle() === config.WEST || sprite.getMoveAngle() === config.EAST);
    }

    function movingVertical(){
        return (sprite.getMoveAngle() === config.NORTH || sprite.getMoveAngle() === config.SOUTH);
    }

    var testXYMessage = '';

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

        console.log("testX" + testX);
        console.log("testY" + testY);

        var fontFamily = "arial";
        var fontSize = "30";
        var fontColor = "#ff0000";
        var row = Math.floor(testY/config.TILE_WIDTH);
        var column = Math.floor(testX/config.TILE_WIDTH);
        testXYMessage= "location: " + testX + " " + testY + " Row/Col " +
            Math.floor(testY/config.TILE_WIDTH) + " " + Math.floor(testX/config.TILE_WIDTH) +
            " " + maze.getValueAt(row, column);


        return maze.isValidMove(testX, testY) === false;
    };

    sprite.checkKeys = function(){

        var previousSpeed;
        var previousDirection = this.getMoveAngle();
        var alignmentOnX;
        var alignmentOnY;

        animationTimer = animationTimer + 1;

        if(animationTimer === 1){
            this.setImage(config.PACMAN_FILE_2);
        }
        else if(animationTimer === 3){
            this.setImage(config.PACMAN_FILE_1);
        }

        if(animationTimer >= 5){
            animationTimer = 0;
        }

        //Check for block prior to checking for keys to know if
        //this needs to stop
        if(this.isBlocked()){
            console.log("IT's blocked");
            this.setSpeed(0);
        }

        previousSpeed = this.getSpeed();

        var newDirection = getKeyDirection(this.getMoveAngle());
        this.setAngle(newDirection);
        this.setSpeed(config.PACMAN_REGULAR_SPEED);
        var wasMovingHorizontal = movingHorizontal();
        var wasMovingVertical = movingVertical();

        //Check for blockage after changin direction
        if(this.isBlocked()){
            console.log("blocked after key prese");
            this.setSpeed(previousSpeed);
            this.setAngle(previousDirection);
        }
        else{
            this.setSpeed(config.PACMAN_REGULAR_SPEED);
        }


        //If direction changed from vertical to horizontal or vice versa
        //hinge the sprite to the center of the traveling lane
        if(movingHorizontal()){

            alignmentOnY = Math.floor(this.y/config.TILE_HEIGHT)*config.TILE_HEIGHT+16;
            if(alignmentOnY !== this.y){
                this.setPosition(this.x, alignmentOnY);
            }
        }

        if(movingVertical()){
            alignmentOnX = Math.floor(this.x/config.TILE_HEIGHT)*config.TILE_HEIGHT+16;
            if(alignmentOnX !== this.x){
                this.setPosition(alignmentOnX, this.y);
            }
        }

        //this.setSpeed(pacmanConfig.PACMAN_REGULAR_SPEED);

    };

    sprite.updateChildren = function(){

    };

    sprite.init = function(){
        this.setPosition(config.PACMAN_START_X, config.PACMAN_START_Y);
        this.setSpeed(0);

        if(scene.touchable){
            _joy = new Joy();               
        }

    };

    sprite.displayPosition = function(){
        var fontFamily = "courier new";
        var fontSize = "25";
        var fontColor = "#ffffff";
        var textValue = "HIGH SCORE        101235        999";
        var logInfo = "";
        var diffX = 0;
        var diffY = 0;
        if(_joy){
           logInfo = "_joy is not null";
           diffY = _joy.getDiffY();
           diffX = _joy.getDiffX();

           logInfo = logInfo + " diffX/diffY " + diffX.toString() + " " + diffY.toString();
        }
        else{
            logInfo = "_joy is null";
            logInfo = logInfo + " diffX/diffY " + diffX.toString() + " " + diffY.toString();
        }

        this.writeText(fontFamily, fontSize, fontColor, textValue, 26, 20);
        this.writeText(fontFamily, fontSize, fontColor, logInfo, 26, 40);


        //this.writeText(fontFamily, fontSize, fontColor, testXYMessage, 20, 60);
    };

    return sprite;
}

