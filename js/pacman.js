/**
 * Created by mac on 4/18/15.
 */
function Pacman(scene, maze){
    var sprite = new EnhancedSprite(scene, pacmanConfig.PACMAN_FILE_2, 32, 32);
    var animationTimer = 0;

    function getKeyDirection(currentDirection){
        var direction = currentDirection;

        if(keysDown[K_LEFT]){
            direction = pacmanConfig.WEST;
        }
        if(keysDown[K_RIGHT]){
            direction = pacmanConfig.EAST;
        }
        if(keysDown[K_UP]){
            direction = pacmanConfig.NORTH;
        }
        if(keysDown[K_DOWN]){
            direction = pacmanConfig.SOUTH;
        }

        return direction;

    }

    function movingHorizontal(){
        return (sprite.getMoveAngle() === pacmanConfig.WEST || sprite.getMoveAngle() === pacmanConfig.EAST);
    }

    function movingVertical(){
        return (sprite.getMoveAngle() === pacmanConfig.NORTH || sprite.getMoveAngle() === pacmanConfig.SOUTH);
    }

    var testXYMessage = '';

    sprite.isBlocked = function(){

        var testX = this.x;
        var testY = this.y;

        if(this.getMoveAngle() === pacmanConfig.WEST){
            testX = this.x - (pacmanConfig.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === pacmanConfig.EAST){
            testX = this.x + (pacmanConfig.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === pacmanConfig.NORTH){
            testY = this.y - (pacmanConfig.PACMAN_REGULAR_SPEED + 16);
        }
        if(this.getMoveAngle() === pacmanConfig.SOUTH){
            testY = this.y + (pacmanConfig.PACMAN_REGULAR_SPEED + 16);
        }

        console.log("testX" + testX);
        console.log("testY" + testY);

        var fontFamily = "arial";
        var fontSize = "30";
        var fontColor = "#ff0000";
        var row = Math.floor(testY/pacmanConfig.TILE_WIDTH);
        var column = Math.floor(testX/pacmanConfig.TILE_WIDTH);
        testXYMessage= "location: " + testX + " " + testY + " Row/Col " +
            Math.floor(testY/pacmanConfig.TILE_WIDTH) + " " + Math.floor(testX/pacmanConfig.TILE_WIDTH) +
            " " + maze.getValueAt(row, column);


        return maze.isValidMove(testX, testY) === false;
    };

    sprite.checkKeys = function(){

        var previousSpeed;
        var previousDirection = this.getMoveAngle();
        var alignmentOnX;
        var alignmentOnY;

        animationTimer = animationTimer + 1;



        if(animationTimer <= 3){
            this.setImage(pacmanConfig.PACMAN_FILE_2);
        }
        else if(animationTimer <= 5){
            this.setImage(pacmanConfig.PACMAN_FILE_1);
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
        this.setSpeed(pacmanConfig.PACMAN_REGULAR_SPEED);
        var wasMovingHorizontal = movingHorizontal();
        var wasMovingVertical = movingVertical();

        //Check for blockage after changin direction
        if(this.isBlocked()){
            console.log("blocked after key prese");
            this.setSpeed(previousSpeed);
            this.setAngle(previousDirection);
        }
        else{
            this.setSpeed(pacmanConfig.PACMAN_REGULAR_SPEED);
        }


        //If direction changed from vertical to horizontal or vice versa
        //hinge the sprite to the center of the traveling lane
        if(movingHorizontal()){

            alignmentOnY = Math.floor(this.y/pacmanConfig.TILE_HEIGHT)*pacmanConfig.TILE_HEIGHT+16;
            if(alignmentOnY !== this.y){
                this.setPosition(this.x, alignmentOnY);
            }
        }

        if(movingVertical()){
            alignmentOnX = Math.floor(this.x/pacmanConfig.TILE_HEIGHT)*pacmanConfig.TILE_HEIGHT+16;
            if(alignmentOnX !== this.x){
                this.setPosition(alignmentOnX, this.y);
            }
        }

        //this.setSpeed(pacmanConfig.PACMAN_REGULAR_SPEED);

    };


    sprite.init = function(){
        this.setPosition(pacmanConfig.PACMAN_START_X, pacmanConfig.PACMAN_START_Y);
        this.setSpeed(0);
    };

    sprite.displayPosition = function(){
        var fontFamily = "courier new";
        var fontSize = "25";
        var fontColor = "#ffffff";
        var textValue = "HIGH SCORE        101235        999";

        this.writeText(fontFamily, fontSize, fontColor, textValue, 26, 20);
        //this.writeText(fontFamily, fontSize, fontColor, testXYMessage, 20, 60);
    };

    return sprite;
}

