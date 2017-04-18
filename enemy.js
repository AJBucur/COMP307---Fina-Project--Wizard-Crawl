(function () {
    window.game = window.game || {};
   
    var Enemy = function(image) {
        this.initialize(image);
    }
    Enemy.prototype = new createjs.Bitmap();
    Enemy.prototype.Shape_initialize = Enemy.prototype.initialize;
    Enemy.prototype.health = 1;
    Enemy.prototype.speed = 2.1;
    Enemy.prototype.dx = 0;
    Enemy.prototype.dy = 0;
    Enemy.prototype.vx = 0;
    Enemy.prototype.vy = 0;
    Enemy.prototype.isDead = false;

    Enemy.prototype.initialize = function(image) {
        this.Shape_initialize();
        //this.graphics.beginStroke('#FFF').beginFill(color).drawCircle(0,0,20);
        this.image = image;
    }
    Enemy.prototype.followPlayer = function(playerPosX, playerPosY){
        // createjs.Tween.get(this).to({x:playerPos.x, y:playerPos.y},this.speed);
        
        this.dx = playerPosX - this.x;
        this.dy = playerPosY - this.y;
        var radians = Math.atan2(this.dy, this.dx);

        this.vx = Math.cos(radians) * this.speed;
        this.vy = Math.sin(radians) * this.speed;


        this.x += this.vx;
        this.y += this.vy;
    }
    Enemy.prototype.die = function(){
        createjs.Tween.get(this).to({alpha:0},100).call(function(e){
            this.parent.removeChild(this);
        });
    }
    window.Enemy = Enemy;
}());