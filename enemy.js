(function () {
    window.game = window.game || {};
   
    var Enemy = function(color) {
        this.initialize(color);
    }
    Enemy.prototype = new createjs.Shape();
    Enemy.prototype.Shape_initialize = Enemy.prototype.initialize;
    Enemy.prototype.health = 1;
    Enemy.prototype.speed = 500;
    Enemy.prototype.isDead = false;

    Enemy.prototype.initialize = function(color) {
        this.Shape_initialize();
        this.graphics.beginFill(color).drawCircle(0,0,20);
    }
    Enemy.prototype.followPlayer = function(playerPos){
        createjs.Tween.get(this).to({x:playerPos.x, y:playerPos.y},this.speed);
    }
    Enemy.prototype.die = function(){
        createjs.Tween.get(this).to({alpha:0},100).call(function(e){
            this.parent.removeChild(this);
        });
    }
    window.Enemy = Enemy;
}());