(function () {
    window.game = window.game || {};
   
    var EnemyTower = function(image) {
        this.initialize(image);
    }
    EnemyTower.prototype = new createjs.Bitmap();
    
    EnemyTower.prototype.Shape_initialize = EnemyTower.prototype.initialize;
    EnemyTower.prototype.health = 3;
    EnemyTower.prototype.isAlive = true;
    EnemyTower.prototype.speed = 300;
    
    EnemyTower.prototype.initialize = function(image) {
        this.Shape_initialize();
        this.image = image;
        //this.graphics.beginStroke('#FFF').beginFill(color).drawRect(0,0,50, 50);
    }
    
    EnemyTower.prototype.die = function(){
        createjs.Tween.get(this).to({alpha:0},100).call(function(e){
            this.parent.removeChild(this);
        });
    }
    window.EnemyTower = EnemyTower;
}());