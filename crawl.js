var stage, queue;

function preload() {
    queue = new createjs.LoadQueue();
    queue.addEventListener("complete", init);
    queue.loadManifest([]);
    alert("asdkfaksjdfjas");
    init();
}

function init(){
    stage = new createjs.Stage(document.getElementById('canvas'));
    startGame();
    alert("Asdads");
    whut();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
    
}