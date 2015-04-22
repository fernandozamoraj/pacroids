/**
 * Created by mac on 4/19/15.
 */
function XButton(scene, imagePath, x, y,  width, height){

    var TIMESPAN = 20;
    var clickInfo = {};

    var _buttonSprite = new EnhancedSprite(scene, imagePath, width, height);
    var _canvas = _buttonSprite.context.canvas;
    var _lastClickedTimer = new Timer();
    _lastClickedTimer.start();

    

    function doTouchStart(event) {
        event.prevenDefault();

        _clickInfo.x = event.targetTouches[0].pageX;
        _clickInfo.y = event.targetTouches[0].pageY;

        checkClickedWIthinButtonBounds();

    }

    function checkClickedWIthinButtonBounds(){

        if(_clickInfo.x > x && _clickInfo.x < x + (width/2) &&
           _clickInfo.y > y && _clickInfo.y < y +(height/2)){
            _lastClickedTimer.reset();
        }
    }

    this.isDown = function(){
        return _lastClickedTimer.getTimeElapsed() < TIMESPAN;
    }

    this.update = function(){
       _buttonSprite.update();
    };

    this.init = function(){
       _buttonSprite.setPosition(x, y);
       _buttonSprite.setSpeed(0);


       _canvas.addEventListener("touchstart", doTouchStart, false);

    };
}