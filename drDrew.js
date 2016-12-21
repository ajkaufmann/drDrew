var isMoveR,
    isMoveL,
    isMoveUp,
    isAddPlatform = false;

    // used this code for initial guidance on character/level design:
    // http://indiegamr.com/retro-style-plattform-runner-game-for-mobile-with-easeljs-part-1/

var currentScore = parseInt(sessionStorage.getItem('score'));

function handleKeyDown(e) {
    // execute things on KeyDown
    // e.g.
    switch (e.keyCode) {
        case 39: // right arrow key
            //     console.log("rightKey down");
            isMoveR = true;
            // drDrew.moveR();
            break;
        case 37: // left arrow key
            // drDrew.moveL();
            isMoveL = true;
            // console.log("leftKey down");
            break;
        case 38: // up arrow key
            isMoveUp = true;
            break;
        case 32: // space bar

            break;
        case 40: // down arrow key
            // console.log("downKey down");
            break;
        default:
            // console.log("keycode" + e.keyCode);
            break;
    }
    // console.log("keyDown!");
}


function handleKeyUp(e) {
    // execute things on KeyUp
    switch (e.keyCode) {
        case 39: // right arrow key
            //console.log("rightKey up");
            isMoveR = false;
            drDrew.velocity.x = 0;
            break;
        case 37: // left arrow key
            isMoveL = false;
            drDrew.velocity.x = 0;
            // console.log("leftKey up");
            break;
        case 38: // up arrow key
            // isMoveUp = true;

            //console.log("upKey up");
            break;
        case 40: // down arrow key
            // console.log("downKey up");
            break;
        case 32: // space bar
            isAddPlatform = true;
            break;
            // console.log("downKey up");
            break;
        case 27: // esc key
            // createjs.Ticker.paused ? false : true;
            // console.log("escKey up");
            // console.log("ticker is paused: " + createjs.Ticker.paused);
            // console.log("ticker time: " + createjs.Ticker.getTime);
            break;
        default:
            //     console.log("keycode" + e.keyCode);
            break;
    }
    // console.log("keyUp!");
    isMoveUp = false;
}

(function(window) {
    function drDrewCreate(image) {
        this.initialize(image);
    }
    drDrewCreate.prototype = new createjs.Bitmap();

    // save the original initialize-method so it won't be gone after
    // overwriting it
    drDrewCreate.prototype.Bitmap_initialize = drDrewCreate.prototype.initialize;

    // initialize the object
    drDrewCreate.prototype.initialize = function(image) {
        this.Bitmap_initialize(image);
        this.name = 'drDrew';
        this.snapToPixel = true;
        this.velocity = {
            x: 0,
            y: 5
        };
        this.width = this.scaleX * this.getBounds().width;
        this.height = this.scaleY * this.getBounds().height;
        this.onPlatform = false;
        this.addPlat = false;
        this.rLim = canvas.width;
        this.lLim = 0;
        this.score = 0;
        this.curTime = 0;
        this.tokenHit = false;
        this.fellOff = false;
        this.hitEnemy = false;
    }

    drDrewCreate.prototype.tick = function() {
        console.log("the score is (death): " + this.score);
        this.score = parseInt(sessionStorage.getItem('score'));
        console.log("DREW SCORE: " + this.score);
        // console.log("On platform? " + this.onPlatform);
        if (this.y >= canvas.height && !this.fellOff) {
            this.fellOff = true;
            // FIXME this code isnt working right, the score isnt being recorded properly
            // even with fixed values, it doesn't insert into the database!
            // var score = parseInt(sessionStorage.getItem('score'));
            var score = parseInt(this.score);
            console.log("ths.score: " + score);
            var username = prompt("Game Over \nPlease enter your name", "Type name here");
            // $(document).ready(function() {
            $.post("score_page.php", {
                score: score,
                username: username
            }, function(data) {
                // alert("DATA RETURNED");

            });
              window.location.href = 'score_page.php'
            // });
        }
        if (this.onPlatform) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += 1;
            this.y += this.velocity.y;
            //console.log(this.y);
        }
        // console.log(this.curTime);

        if (isMoveR) this.moveR();
        else if (isMoveL) this.moveL();
        if (isMoveUp && this.onPlatform) {
            this.moveUp();
            isMoveUp = false;
        }
        if (isAddPlatform) {
            this.addPlatform();
            isAddPlatform = false;
        }
        for (var i = 0; i < platforms.length; i++) {
            this.collision(platforms[i]);
        }
    }

    var velocityMax = 10;
    var velocityInc = 1;
    drDrewCreate.prototype.moveR = function() {
        if (this.x < canvas.width - this.getBounds().width * this.scaleX) {
            this.velocity.x < velocityMax ? this.velocity.x += velocityInc : this.velocity.x = velocityMax;
            this.x += this.velocity.x;
        }
    }

    drDrewCreate.prototype.moveL = function() {
        if (this.x > 0) {
            this.velocity.x > -velocityMax ? this.velocity.x -= velocityInc : this.velocity.x = -velocityMax;
            this.x += this.velocity.x;
        }
    }

    drDrewCreate.prototype.moveUp = function() {
        if (this.velocity.y <= 0) this.velocity.y += -15;
        if (this.y > 0) {
            this.y += this.velocity.y;
            this.onPlatform = false;
        }
    }

    // this will reset the position of the drDrewCreate
    // we can call this e.g. whenever a key is pressed
    drDrewCreate.prototype.reset = function() {
        this.y = 10;
        this.x = 100;
        console.log("DrewResetCall");
    }

    drDrewCreate.prototype.collision = function(thing) {
        if (checkCollision(this, thing)) {

            // console.log("Thingname:" + thing.name);
            //act differently depending on what type of object it is.
            if (thing.name == "Enemy" && !this.hitEnemy) {
                this.hitEnemy = true;
                var score = parseInt(sessionStorage.getItem('score'));
                var username = prompt("Game Over \nPlease enter your name", "Enemy Hit!");
                $.post("score_page.php", {
                    score: score,
                    username: username
                }, function(data) {
                    //nothing
                });
                window.location.href = 'score_page.php';


            } else if (thing.name == "Platform") {
                if (this.y < thing.y) {
                    this.velocity.y = 0;
                    var blockHeight = thing.getBounds().height * thing.scaleY;
                    var blockCenter = thing.y - blockHeight / 2;
                    this.y = blockCenter - (.5) * (blockHeight + this.getBounds().height * this.scaleY);
                    this.onPlatform = true;
                } else {
                    this.velocity.y *= -.3;
                }
            } else if (thing.name == "Token" && !this.tokenHit) {
                this.tokenHit = true;
                sessionStorage.setItem('score', parseInt(sessionStorage.getItem('score')) + 50); //add 50 for beating level
                sessionStorage.setItem('score', parseInt(sessionStorage.getItem('score')) - drDrew.curTime); //subtract time it took
                sessionStorage.setItem('level', parseInt(sessionStorage.getItem('level')) + 1);
                console.log("hit: " + sessionStorage.getItem('userScore'));
                window.location.href = 'pencil_game.html'

            } else {
                console.log("will this ever trigger?");
            }
        }
        //console.log("inside collision!");
    }

    drDrewCreate.prototype.addPlatform = function() {
        console.log("ADD PLATFORM");
        this.addPlat = true;
    }

    window.drDrewCreate = drDrewCreate;
}(window));
