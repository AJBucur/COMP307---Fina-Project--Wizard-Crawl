(function () {
    window.game = window.game || {};
   
    var EnemyTower = function(color) {
        this.initialize(color);
    }
    EnemyTower.prototype = new createjs.Shape();
    EnemyTower.prototype.Shape_initialize = EnemyTower.prototype.initialize;
    EnemyTower.prototype.health = 2;
    EnemyTower.prototype.speed = 300;
    EnemyTower.prototype.initialize = function(color) {
        this.Shape_initialize();
        this.graphics.beginFill(color).drawRect(0,0,20, 20);
    }
    
    EnemyTower.prototype.shoot = function(){
        
    }

    EnemyTower.prototype.die = function(){
        createjs.Tween.get(this).to({alpha:0},100).call(function(e){
            this.parent.removeChild(this);
        });
    }
    window.EnemyTower = EnemyTower;
}());