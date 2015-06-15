/**
 * Created by fernandoz on 5/15/2015.
 */
//Purpose of this class is to set the target for each ghost
function TargetManager(pacman, maze){

    var initialTarget = {x:0, y:0};
    var blinkyTarget = { x: initialTarget.x, y:initialTarget.y};
    var inkyTarget = { x: initialTarget.x, y:initialTarget.y};
    var pinkyTarget = { x: initialTarget.x, y:initialTarget.y};
    var clydeTarget = { x: initialTarget.x, y:initialTarget.y};

    var topLeftCorner = {x:0,y:0};
    var topRightCorner = {x:32*19,y:0};
    var bottomLeftCorner = {x:0,y:32*20};
    var bottomRightCorner = {x:32*19,y:32*22};

    var timer = 0;
    var mode = "UNDEF";
    var attackMode = false;

    this.setAttackMode = function() {
        mode = "Attack Mode";
        blinkyTarget.x = pacman.x;
        blinkyTarget.y = pacman.y;

        pinkyTarget.x = pacman.x;
        pinkyTarget.y = pacman.y;

        inkyTarget.x = pacman.x;
        inkyTarget.y = pacman.y;

        clydeTarget.x = pacman.x;
        clydeTarget.y = pacman.y;
    }

    this.setGuardMode = function(){

        mode = "Guard Mode";
        blinkyTarget.x = topLeftCorner.x;
        blinkyTarget.y = topLeftCorner.y;

        pinkyTarget.x = topRightCorner.x;
        pinkyTarget.y = topRightCorner.y;

        inkyTarget.x = bottomLeftCorner.x;
        inkyTarget.y = bottomLeftCorner.y;

        clydeTarget.x = bottomRightCorner.x;
        clydeTarget.y = bottomRightCorner.y;
    }

    this.setRunMode = function(){
        mode = "Run Mode";
        timer = 0;
        var pacmanVector = maze.getRowColumnVector(pacman.x, pacman.y);
        var target = {x:0,y:0};
        if(pacmanVector.Row < 9){
            target.y = bottomLeftCorner.y;
        }
        else
        {
            target.y = topLeftCorner.y;
        }

        if(pacmanVector.Column < 9){
            target.x = topRightCorner.x;
        }
        else{
            target.x = topLeftCorner.x;
        }

        blinkyTarget.x = target.x;
        blinkyTarget.y = target.y;

        pinkyTarget.x = target.x;
        pinkyTarget.y = target.y;

        inkyTarget.x = target.x;
        inkyTarget.y = target.y;

        clydeTarget.x = target.x;
        clydeTarget.y = target.y;
    }

    function toggleMode(){
        if(attackMode === true){
            attackMode = false;
        }
        else{
            attackMode = true;
        }
    }

    this.getInkyTarget = function(){
        return inkyTarget;
    }

    this.getPinkyTarget = function(){
        return pinkyTarget;
    }

    this.getBlinkyTarget = function(){
        return blinkyTarget;
    }

    this.getClydeTarget = function(){
        return clydeTarget;
    }

    this.update = function(){
        timer = timer + 1;

        if(timer % 140 === 0){
            toggleMode();
        }

        if(mode == "Attack Mode"){
            this.setAttackMode();
        }
        else if(mode == "Guard Mode"){
            this.setGuardMode();
        }
        else if(mode == "Run Mode"){
            this.setRunMode();
        }
        else{
            this.setAttackMode();
        }

        if(timer > 1400){
            timer = 0;
        }
    }

    this.getMode = function(){
        return mode;
    }
}