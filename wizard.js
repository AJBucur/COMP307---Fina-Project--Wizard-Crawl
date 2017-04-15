    const ARROW_KEY_A = 65;
    const ARROW_KEY_D = 68;
    const ARROW_KEY_S = 83;
    const ARROW_KEY_W = 87;
    const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;
    const ARROW_KEY_UP = 38;
    
    var enemy;

    var stage,padel;
    var leftKeyDown,rightKeyDown,downKeyDown,upKeyDown = false;

    function init() {
        stage = new createjs.Stage(document.getElementById('canvas'));
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(60);
        start();
    }
    function start() {
        padel = new createjs.Shape();
        padel.graphics.beginFill('#00FF00').drawCircle(0, 0, 20, 20);
        padel.width = 20;
        padel.x = padel.nextX = 0;
        padel.y = stage.canvas.height - 20;
        stage.addChild(padel);

        enemy = new Enemy('#00F');
        enemy.x = enemy.y = 300;
        stage.addChild(enemy);

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
            if(nextX < 0){
                nextX = 0;
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
        }
        else if(downKeyDown) {
            nextY = padel.y + 10;
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
        enemy.followPlayer(padel);
        stage.update();
    }