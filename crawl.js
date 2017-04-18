var stage, queue;

    //const ARROW_KEY_LEFT = 37;
    //const ARROW_KEY_UP = 38;
    //const ARROW_KEY_RIGHT = 39;
    //const ARROW_KEY_DOWN = 40;


function init(){
    stage = new createjs.Stage(document.getElementById('canvas'));
    startGame();
    alert("Asdads");
    whut();

    var wiz = new Wizard('#0F0');
    stage.addChildren(wiz);
    wiz.addEventListener()
}

/*function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
    
}*/

function move(){

}