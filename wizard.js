    const ARROW_KEY_LEFT = 65;
    const ARROW_KEY_RIGHT = 68;
    const ARROW_KEY_DOWN = 83;
    const ARROW_KEY_UP = 87;
    

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
        //handle keys
        window.onkeydown = movePadel;
        window.onkeyup = stopPadel;
    }
    function movePadel(e) {
        e = !e ? window.event : e;
        switch (e.keyCode) {
            case ARROW_KEY_LEFT:
                leftKeyDown = true;
                break;
            case ARROW_KEY_RIGHT:
                rightKeyDown = true;
                break;
            case ARROW_KEY_DOWN:
                downKeyDown = true;
                break;
            case ARROW_KEY_UP:
                upKeyDown = true;
                break;
        }
    }
    function stopPadel(e) {
        e = !e ? window.event : e;
        switch (e.keyCode) {
            case 65:
                leftKeyDown = false;
                break;
            case 68:
                rightKeyDown = false;
                break;
            case 87:
                upKeyDown = false;
                break;
            case 83:
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
        else if(upKeyDown) {
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
        stage.update();
    }