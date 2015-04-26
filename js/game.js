/**
 * Created by mac on 4/19/15.
 */
function Game(){

    var _scene;
    var _pacmanConfig;
    var _maze;
    var _pacman;
    var _pacmanPelletCollisionDetector;
    var _scoreBoard;
    var _soundManager;
    var _joyStick;
    var _blinky;
    var _pinky;
    var _clyde;
    var _inky;
    var _moveHelper;

    this.log = function(messsage){
        //console.log(message);
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

        _maze.update();
        _pacman.update();
        _blinky.update();
        _pinky.update();
        _clyde.update();
        _inky.update();

        _pacman.updateChildren();
        _pacman.displayPosition(_scoreBoard.getScore());

        _pacmanPelletCollisionDetector.update();

    };
}