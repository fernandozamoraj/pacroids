/**
 * Created by mac on 4/19/15.
 */
function Game(){

    var _scene;
    var _pacmanConfig;
    var _maze;
    var _pacman;
    var _pacmanPelletCollisionDetector;
    var _pacmanGhostCollisionDetector;
    var _scoreBoard;
    var _soundManager;
    var _joyStick;
    var _blinky;
    var _pinky;
    var _clyde;
    var _inky;
    var _moveHelper;
    var _powerMode;

    this.log = function(message){
        console.log(message);
    };

    this.getScene = function(){
      return _scene;
    };

    this.getMaze = function(){
        return _maze;
    };

    this.getConfig = function(){
        return _pacmanConfig;
    };

    this.getPacman = function(){
        return _pacman;
    };

    this.init = function(){
        _pacmanConfig = new PacmanConfig();


        _scene = new Scene();
        _scene.setSize(_pacmanConfig.SCREEN_WIDTH, _pacmanConfig.SCREEN_HEIGHT);
        _scene.setBG('#000000');

        if(_scene.touchable){
            _joyStick = new Joy();
        }

        _powerMode = {
            ghostsCaught: 0,
            timer: _pacmanConfig.POWER_TIME + 1,
            update: function(){
                if(this.timer < _pacmanConfig.POWER_TIME + 1){
                    timer += 1;
                }
                else{
                   this.ghostsCaught = 0;
                }
            },
            isInPowerMode: function(){
                return this.timer < _pacmanConfig.POWER_TIME;
            }
        };

        _maze = new Maze(_scene, _pacmanConfig );
        _moveHelper = new MoveHelper(_maze, _pacmanConfig);
        _pacman = Pacman(_scene, _maze, _pacmanConfig, _joyStick);
        _blinky = new Blinky(_scene, _pacmanConfig, _pacman, _moveHelper);
        _pinky = new Pinky(_scene, _pacmanConfig, _pacman, _moveHelper);
        _clyde = new Clyde(_scene, _pacmanConfig, _pacman, _moveHelper);
        _inky = new Inky(_scene, _pacmanConfig, _pacman, _moveHelper);

        _scoreBoard = new ScoreBoard(_pacmanConfig);
        _soundManager = new SoundManager(_pacmanConfig);
        _pacmanPelletCollisionDetector = new PacmanPelletCollisionDetector(_pacman, _maze, _scoreBoard, _soundManager);
        _pacmanGhostCollisionDetector = new PacmanGhostCollisionDetector(this, _pacman, _pinky, _blinky, _inky, _clyde);

    };


    this.start = function(){
        _scene.start();
        _pacman.init();
        _maze.init();
        _blinky.init();
        _pinky.init();
        _clyde.init();
        _inky.init();

    };

    this.update = function(){

        _scene.clear();
        _pacman.checkKeysAndUpdatePosition();
        _blinky.doAI();
        _pinky.doAI();
        _clyde.doAI();
        _inky.doAI();

        _pacmanGhostCollisionDetector.checkIfGhostAndPacmanCollided();

        _maze.update();
        _pacman.update();
        _blinky.update();
        _pinky.update();
        _clyde.update();
        _inky.update();

        _pacman.updateChildren();
        _pacman.displayPosition(_scoreBoard.getScore());

        _pacmanPelletCollisionDetector.update();

        _powerMode.update();

    };

    this.updateGhostCaught = function(){
        _powerMode.ghostsCaught++;
        _scoreBoard.updateScoreForGhost(_powerMode.ghostsCaught);
    };

    this.startPowerMode = function(){
        if(powerMode.timer > config.POWER_TIMER){
            _powerMode.ghostsCaught = 0;
        }

        _powerMode.timer = 0;
    }

    this.isInPowerMode = function(){
        return _powerMode.isInPowerMode();
    }


    this.killPacman = function(){
        _pacman.die();
    };
}