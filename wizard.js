const ARROW_KEY_A = 65;
const ARROW_KEY_D = 68;
const ARROW_KEY_S = 83;
const ARROW_KEY_W = 87;
const ARROW_KEY_LEFT = 37;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_DOWN = 40;
const ARROW_KEY_UP = 38;

var playerHealth = 3;
var lives;
var enemy;
var queue;
var isInv = false;
var bullets = [];
var ebullets = [];
var stage,padel;
var leftKeyDown,rightKeyDown,downKeyDown,upKeyDown = false;

function preload() {
    
    var manifest = [
        {src:"assets/orb.mp3", id:"orbSound"},
        {src:"assets/music.mp3", id:"music"}
    ];
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(manifest);
    queue.addEventListener("complete", init);
    //createjs.Sound.registerManifest(manifest, "sounds/");
}


function init() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
    start();
}

function start() {

    // createjs.Sound.play("music",createjs.Sound.INTERRUPT_NONE,0,-1,0,.5,0);
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    lives = new createjs.Text("Lives: " + playerHealth, "16px Arial");
    lives.textAlign = 'center';
    lives.textBaseline = 'middle';
    lives.x = 30;
    lives.y = 10;
    stage.addChild(lives);

    stage.mouseEventsEnabled = true;
    padel = new createjs.Shape();
    padel.graphics.beginStroke('#FFF').beginFill('#00FF00').drawCircle(0, 0, 20, 20);
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
        var ebullet = new Orb('#00F', new createjs.Point (padel.x, padel.y), 
            new createjs.Point (enemy2.x, enemy2.y));
        ebullets.push(ebullet);
        stage.addChild(ebullet);
    }, 1800);

    stage.on("stagemousedown", function (e){
        createjs.Sound.play("orbSound",createjs.Sound.INTERRUPT_NONE,0,0,0,.5,0);
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
            stage.removeChild(bullets[i]);
            bullets.splice(i,1);
            // console.log("dead bullet");
        }

         if (bullets[i].y < 0 || bullets[i].y > stage.canvas.height){
            bullets.splice(i,1);
            // console.log("dead bullet");
        }

        var pt1 = enemy.globalToLocal(bullets[i].x, bullets[i].y);

        if (enemy.hitTest(pt1.x, pt1.y)){
            console.log("hit");
        }

        var pt2 = enemy2.globalToLocal(bullets[i].x, bullets[i].y);

        if (enemy2.hitTest(pt2.x, pt2.y)){
            console.log("hit");
        }
    }

    for (var i = 0; i <ebullets.length; i++){
        ebullets[i].move();
        if (ebullets[i].x < 0 || ebullets[i].x > stage.canvas.width){
            ebullets.splice(i,1);
            // console.log("dead bullet");
        }

         if (ebullets[i].y < 0 || ebullets[i].y > stage.canvas.height){
            ebullets.splice(i,1);
            // console.log("dead bullet");
        }

        if (!isInv){
            var hitPt = padel.globalToLocal(ebullets[i].x, ebullets[i].y);

            if (padel.hitTest(hitPt.x, hitPt.y)){
                isInv = true;
                gotHit();
                console.log("got hit");
            }
        }
        
    }
    enemy.followPlayer(padel.x, padel.y);
    stage.update();
}

function gotHit(){
        padel.alpha = 0.5;
        setTimeout(function() {
        padel.alpha = 1;
        playerHealth--;
        isInv = false;
        lives.text =  "Lives: " + playerHealth;

        if (playerHealth < 1) {
        var text = new createjs.Text("Game Over", "20px Arial", "#ff7700");
        text.textBaseline = "middle";
        text.textAlign = "center";
        text.x = stage.canvas.width / 2;
        text.y = stage.canvas.height / 2;
        stage.addChild(text);
        }

    }, 3000);
    
}
