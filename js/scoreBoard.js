/**
 * Created by mac on 4/22/15.
 */
function ScoreBoard(config){

    var _score = 0;

    this.reset = function(){
      _score = 0;
    };

    this.updateScoreForPellet = function(){
        _score = _score + config.POINTS_FOR_PELLET;
    };

    this.updateScoreForPowerPellet = function(){
      _score = _score + config.POINTS_FOR_POWER_PELLET;
    };

    this.updateScoreForGhost = function(ghostNumber){

        //points double for each ghost
        //e.g. firstGhost 200 second 400 third 800 and fourth 1600
        //this is the most brute force approach
        //I know of doing this calculation
        var points = config.POINTS_FOR_GHOST;
        var i;

        for(i = 1; i < ghostNumber; i++){
            points = points * 2;
        }

        _score = _score + points;
    };

    this.getScore = function(){
        return _score;
    }
}