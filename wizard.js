const ARROW_KEY_A = 65;
const ARROW_KEY_D = 68;
const ARROW_KEY_S = 83;
const ARROW_KEY_W = 87;
const ARROW_KEY_LEFT = 37;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_DOWN = 40;
const ARROW_KEY_UP = 38;

window.game = window.game || {};

var playerHealth = 3;
var lives;
var enemy;
var enemies = [];
var enemies2 = [];
var queue;
var isInv = false;
var bullets = [];
var ebullets = [];
var stage,wizard;
var leftKeyDown,rightKeyDown,downKeyDown,upKeyDown = false;

function preload() {
    
    var manifest = [
        {src:"assets/orb.mp3", id:"orbSound"},
        {src:"assets/music.mp3", id:"music"},
        {src:"assets/tower.png", id:"tower"},
        {src:"assets/wizard.png", id:"wizard"},
        {src:"assets/monster.png", id:"monster"}
    ];
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(manifest);
    queue.addEventListener("complete", buildStartMenu);
    //createjs.Sound.registerManifest(manifest, "sounds/");
}

function init() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    
    preload();
}

function buildStartMenu() {
    var button = new ui.SimpleButton('PLAY GAME');
    button.regX = button.width / 2;
    button.regY = button.height / 2;
    button.x = canvas.width / 2;
    button.y = canvas.height / 2;
    button.on('click', start);
    stage.addChild(button);
    stage.update();
}

function start() {
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
    stage.removeAllChildren();
    createjs.Sound.play("music",createjs.Sound.INTERRUPT_NONE,0,-1,0,.5,0);
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    lives = new createjs.Text("Lives: " + playerHealth, "16px Arial");
    lives.textAlign = 'center';
    lives.textBaseline = 'middle';
    lives.x = 30;
    lives.y = 10;
    stage.addChild(lives);

    stage.mouseEventsEnabled = true;
    wizard = new createjs.Bitmap(queue.getResult('wizard'));
    //wizard.graphics.beginStroke('#FFF').beginFill('#00FF00').drawCircle(0, 0, 20, 20);
    //wizard.width = wizard.height = 20;
    wizard.x = stage.canvas.width/2;
    wizard.y = stage.canvas.height/2;
    stage.addChild(wizard);

    enemy = new Enemy(queue.getResult('monster'));
    enemy.x = enemy.y = 300;
    stage.addChild(enemy);

    enemy2 = new EnemyTower(queue.getResult('tower'));
    enemy2.x = 300;
    enemy2.y = 50;
    stage.addChild(enemy2);

    setInterval(function (e){
        var ebullet = new Orb('#00F', new createjs.Point (wizard.x, wizard.y), 
            new createjs.Point (enemy2.x, enemy2.y));
        ebullets.push(ebullet);
        stage.addChild(ebullet);
    }, 1800);

    stage.on("stagemousedown", function (e){
        createjs.Sound.play("orbSound",createjs.Sound.INTERRUPT_NONE,0,0,0,.5,0);
        var bullet = new Orb('#F00', new createjs.Point (e.stageX, e.stageY), 
            new createjs.Point (wizard.x, wizard.y));
        console.log(bullet.x, bullet.y);
        bullets.push(bullet);
        stage.addChild(bullet);
    });

    //handle keys
    window.onkeydown = movewizard;
    window.onkeyup = stopwizard;
}
function movewizard(e) {
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
function stopwizard(e) {
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
    
    for (var i = 0; i <enemies2.length; i++){
        while(enemies2[i].isAlive){
            setInterval(function (e){
                var ebullet = new Orb('#00F', new createjs.Point (wizard.x, wizard.y), 
                new createjs.Point (enemies2[i].x, enemies2[i].y));
                ebullets.push(ebullet);
                stage.addChild(ebullet);
            }, 1800);
        }
    }
    
    var nextX = wizard.x;
    var nextY = wizard.y;
    
    if (leftKeyDown) {
        nextX = wizard.x - 10;
        if(nextX < 0 + wizard.width){
            nextX = 0 + wizard.width;
        }
    }
    else if (rightKeyDown) {
        nextX = wizard.x + 10;
        if(nextX > stage.canvas.width - wizard.width){
            nextX = stage.canvas.width - wizard.width;
        }
    }

    if(upKeyDown) { 
        nextY = wizard.y - 10; 
        if (nextY < 0 + wizard.height){
            nextY = 0  + wizard.height;
        }
        
    }
    else if(downKeyDown) {
        nextY = wizard.y + 10; 
        if(nextY > stage.canvas.height - wizard.height){
            nextY = stage.canvas.height - wizard.height;  
                    
        }
    }
    
    wizard.nextX = nextX;
    wizard.nextY = nextY;
}
function render() {
    wizard.x = wizard.nextX;
    wizard.y = wizard.nextY;
}
function tick(e) {
    update();
    render();
    
    if (playerHealth <= 0){
        gameOverScreen();
    }

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
            stage.removeChild(enemy);
        }

        var pt2 = enemy2.globalToLocal(bullets[i].x, bullets[i].y);

        if (enemy2.hitTest(pt2.x, pt2.y)){
            console.log("hit");
            stage.removeChild(enemy2);
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
            var hitPt = wizard.globalToLocal(ebullets[i].x, ebullets[i].y);

            if (wizard.hitTest(hitPt.x, hitPt.y)){
                isInv = true;
                gotHit();
                console.log("got hit");
            }
        }
        
    }
    enemy.followPlayer(wizard.x, wizard.y);
    stage.update();
}

function gotHit(){
        wizard.alpha = 0.5;
        setTimeout(function() {
        wizard.alpha = 1;
        playerHealth--;
        isInv = false;
        lives.text =  "Lives: " + playerHealth;

        if (playerHealth < 1) {
        var text = new createjs.Text("Game Over", "100px Arial", "#ff7700");
        text.textBaseline = "middle";
        text.textAlign = "center";
        text.x = stage.canvas.width / 2;
        text.y = stage.canvas.height / 2;
        stage.addChild(text);
        }

    }, 3000);
    
}

function spawnEnemies(){
    if (enemies.length < 5){
        var enemy = new Enemy('#00F');
        enemy.x = enemy.y = 300;
        enemies.push(enemy);
        stage.addChild(enemy);
    }

    if (enemies2.length < 5){

    }
}

function gameOverScreen(){
    
    stage.canvas.width = 750;
    stage.canvas.height = 300;

    createjs.Sound.removeAllSounds();
    stage.removeAllChildren();
    
    var gameOverText = new createjs.Text("GAME OVER", "16px Arial");
    gameOverText.textAlign = 'center';
    gameOverText.textBaseline = 'middle';
    gameOverText.x = stage.canvas.width / 2;
    gameOverText.y = 150;
    stage.addChild(gameOverText);

    var button = new ui.SimpleButton('Return to main', "40px Arial");
    button.regX = button.width / 2;
    button.regY = button.height / 2;
    button.x = canvas.width / 2;
    button.y = canvas.height / 2;
    button.on('click', function(e){
        stage.removeAllChildren();
        buildStartMenu();
        console.log("Button clicked");
    });
    stage.addChild(button);
    stage.update();
}
