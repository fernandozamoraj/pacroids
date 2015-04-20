/**
 * Created by mac on 4/19/15.
 */
function Game(){

    var _scene;
    var _pacmanConfig;
    var _maze;
    var _pacman;
    

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
        _maze = new Maze(_scene, _pacmanConfig );
        _pacman = Pacman(_scene, _maze, _pacmanConfig);
        

    };


    this.start = function(){
        _scene.start();
        _pacman.init();
        _maze.init();
    };

    this.update = function(){
        _scene.clear();
        _pacman.checkKeys();
        _maze.update();
        _pacman.update();
        _pacman.updateChildren();
        _pacman.displayPosition();

    };
}