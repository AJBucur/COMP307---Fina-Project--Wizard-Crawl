(function () {
   
    window.game = window.game || {};

    var Orb = function (color, target, startPos) {
        this.target = target;
        this.startPos = startPos;
        this.initialize(color);
        
    }
    var p = Orb.prototype = new createjs.Shape();
    p.count = 0;
    p.speed = 5;
    p.vx = 0.0;
    p.vy = 0.0;
    p.target = new createjs.Point();
    p.startPos = new createjs.Point();
    p.Shape_initialize = p.initialize;

    p.initialize = function (color) {
        this.Shape_initialize();
        
        // var dx = this.target.x - this.x;
	    // var dy = this.target.y - this.y;
        // var radians = Math.atan2(dy, dx);

        // this.vx = Math.cos(radians) * this.speed;
        // this.vy = Math.sin(radians) * this.speed;

        this.x = this.startPos.x;
        this.y = this.startPos.y;

        this.alpha = Math.random();
        this.graphics.beginStroke('#FFF').beginFill(color).drawCircle(0, 0, 10);
        this.on('tick', this.pulse);

        console.log(this.parent);
        
        this.trackPos();        

    }
    p.move = function(){
        this.pulse();

        this.x += this.vx;
        this.y += this.vy;
    }

    p.trackPos = function(){
        var dx = this.target.x - this.x;
        var dy = this.target.y - this.y;
        var radians = Math.atan2(dy, dx);

        this.vx = Math.cos(radians) * this.speed;
        this.vy = Math.sin(radians) * this.speed;

        // console.log(dx + " " +  dy + " " +  this.x + " "  + this.y);
    }
    
    p.pulse = function () {
        this.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }

    p.die = function(){
        this.parent.removeChild(this);
    }

    window.Orb = Orb;
}());