(function () {
   
    var Orb = function (color, target) {
        this.initialize(color);
        this.target = target;
    }
    var p = Orb.prototype = new createjs.Shape();
    p.count = 0;
    p.speed = 5;
    p.target = new createjs.Point();
    p.Shape_initialize = p.initialize;

    p.initialize = function (color) {
        this.Shape_initialize();
        
        color = '#F00';
        this.alpha = Math.random();
        this.graphics.beginFill(color).drawCircle(0, 0, 5);
        this.on('tick', this.pulse);
    }
    p.move = function(){
        this.pulse();
        var dx = this.target.x - this.x;
	    var dy = this.target.y - this.y;
        var radians = Math.atan2(dy, dx);

        var vx = Math.cos(radians) * this.speed;
        var vy = Math.sin(radians) * this.speed;

        this.x += vx;
        this.y += vy;
    }

    p.pulse = function () {
        this.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }

    p.die = function(){
        this.parent.removeChild(this);
    }

    window.Orb = Orb;
}());