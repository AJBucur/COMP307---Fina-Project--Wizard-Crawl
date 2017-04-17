const ARROW_KEY_A = 65;
const ARROW_KEY_D = 68;
const ARROW_KEY_S = 83;
const ARROW_KEY_W = 87;
const ARROW_KEY_LEFT = 37;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_DOWN = 40;
const ARROW_KEY_UP = 38;

var enemy;
var bullets = [];
var stage,padel;
var leftKeyDown,rightKeyDown,downKeyDown,upKeyDown = false;

function init() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
    start();
}
function start() {

    stage.mouseEventsEnabled = true;
    padel = new createjs.Shape();
    padel.graphics.beginFill('#00FF00').drawCircle(0, 0, 20, 20);
    padel.width = padel.height = 20;
    padel.x = stage.canvas.width/2;
    padel.y = stage.canvas.height/2;

   

    stage.addChild(padel);

    //stage.addChild(bullets);

    enemy = new Enemy('#00F');
    enemy.x = enemy.y = 300;
    stage.addChild(enemy);

    enemy2 = new EnemyTower('#00F');
    enemy2.x = 300;
    enemy2.y = 50;
    stage.addChild(enemy2);

    setInterval(function (e){
        var bullet = new Orb('#00F', new createjs.Point (padel.x, padel.y), 
            new createjs.Point (enemy2.x, enemy2.y));
        bullets.push(bullet);
        stage.addChild(bullet);
    }, 1800);

    stage.on("stagemousedown", function (e){
        var bullet = new Orb('#F00', new createjs.Point (e.stageX, e.stageY), 
            new createjs.Point (padel.x, padel.y));
        console.log(bullet.x, bullet.y);
        bullets.push(bullet);
        stage.addChild(bullet);
    });

    //handle keys
    window.onkeydown = movePadel;
    window.onkeyup = stopPadel;
}
function movePadel(e) {
    e = !e ? window.event : e;
    switch (e.keyCode) {
        case ARROW_KEY_LEFT:
        case ARROW_KEY_A:
            leftKeyDown = true;
            break;
        case ARROW_KEY_RIGHT:
        case ARROW_KEY_D:
            rightKeyDown = true;
            break;
        case ARROW_KEY_DOWN:
        case ARROW_KEY_S:
            downKeyDown = true;
            break;
        case ARROW_KEY_UP:
        case ARROW_KEY_W:
            upKeyDown = true;
            break;
    }
}
function stopPadel(e) {
    e = !e ? window.event : e;
    switch (e.keyCode) {
        case ARROW_KEY_LEFT:
        case ARROW_KEY_A:
            leftKeyDown = false;
            break;
        case ARROW_KEY_RIGHT:
        case ARROW_KEY_D:
            rightKeyDown = false;
            break;
        case ARROW_KEY_UP:
        case ARROW_KEY_W:
            upKeyDown = false;
            break;
        case ARROW_KEY_DOWN:
        case ARROW_KEY_S:
            downKeyDown = false;
            break;
    }
}
function update() {
    var nextX = padel.x;
    var nextY = padel.y;
    
    if (leftKeyDown) {
        nextX = padel.x - 10;
        if(nextX < 0 + padel.width){
            nextX = 0 + padel.width;
        }
    }
    else if (rightKeyDown) {
        nextX = padel.x + 10;
        if(nextX > stage.canvas.width - padel.width){
            nextX = stage.canvas.width - padel.width;
        }
    }

    if(upKeyDown) { 
        nextY = padel.y - 10; 
        if (nextY < 0 + padel.height){
            nextY = 0  + padel.height;
        }
        
    }
    else if(downKeyDown) {
        nextY = padel.y + 10; 
        if(nextY > stage.canvas.height - padel.height){
            nextY = stage.canvas.height - padel.height;  
                    
        }
    }
    
    padel.nextX = nextX;
    padel.nextY = nextY;
}
function render() {
    padel.x = padel.nextX;
    padel.y = padel.nextY;
}
function tick(e) {
    update();
    render();
    
    for (var i = 0; i <bullets.length; i++){
        bullets[i].move();
        if (bullets[i].x < 0 || bullets[i].x > stage.canvas.width){
            
            bullets.splice(i,1);
            // console.log("dead bullet");
        }

         if (bullets[i].y < 0 || bullets[i].y > stage.canvas.height){
            
            bullets.splice(i,1);
            // console.log("dead bullet");
        }
    }

    enemy.followPlayer(padel.x, padel.y);
    stage.update();
}

