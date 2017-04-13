(function() {
    var Wizard = function(color) {
    this.initialize(color);
    }
    Wizard.prototype = new createjs.Shape();
    Wizard.prototype.Shape_initialize = Wizard.prototype.initialize;
    Wizard.prototype.points = 4;
    
    Wizard.prototype.initialize = function(color) {
    this.Shape_initialize();
    this.graphics.beginFill(color).drawRect(0,0,20, 20);
    }
    Wizard.prototype.die = function(){
    createjs.Tween.get(this).to({alpha:0},100).call(function(e){
    this.parent.removeChild(this);
    });
    }
    window.Wizard = Wizard;
}());