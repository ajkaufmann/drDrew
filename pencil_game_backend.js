var stage,
    canvas,
    drDrew,
    enemy,
    currentTime,
    img = new Image();

var platforms = [];

var addedPlatforms = 0;
var platformLimit = 2;

function initializeGame() {
    // creating the canvas-element
    canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.backgroundColor = "#ff0000";
    var theTime = document.createElement("P1");
    var linebreak = document.createElement("br");
    theTime.setAttribute("id", "timeSpot")
    document.body.appendChild(canvas);
    document.body.appendChild(linebreak);
    document.body.appendChild(theTime);

    stage = new createjs.Stage(canvas);

    img = new Image();
    img.onload = onImageLoaded;
    // console.log("hello");
    console.log(sessionStorage.getItem('userColor'));
    img.src = 'images/pencil_' + sessionStorage.getItem('userColor') + ".png";

    function onImageLoaded(e) {
        drDrew = new drDrewCreate(img);
        var lvl = sessionStorage.getItem('level');
        //console.log(lvl);
        switch (lvl) {
            case '1':
                console.log("INSIDE CASE 1");
                console.log("VAR:" + sessionStorage.getItem('score'));
                // platforms.push(new platformCreate(300, 100));
                platforms.push(new platformCreate(50, 300)); //start platform, don't remove
                token = new tokenCreate(300, 10);
                enemy = new enemyCreate(10, 10, parseInt(sessionStorage.getItem('level')));
                // enemy = new enemyCreate(drDrew.x + 50, canvas.width + drDrew.y, parseInt(sessionStorage.getItem('level')));
                platformLimit = 2; //FIXME come up with more general case if there is time
                break;
            case '2':
                console.log("INSIDE CASE 2");
                platforms.push(new platformCreate(300, 250));
                platforms.push(new platformCreate(50, 300)); //start platform, don't remove
                token = new tokenCreate(300, 10);
                enemy = new enemyCreate(drDrew.x + 50, canvas.width + drDrew.y, parseInt(sessionStorage.getItem('level')));
                platformLimit = 1;
                break;
            case '3':
                console.log("INSIDE CASE 3");
                platforms.push(new platformCreate(300, 100));
                platforms.push(new platformCreate(50, 300)); //start platform, don't remove
                token = new tokenCreate(300, 10);
                enemy = new enemyCreate(drDrew.x + 50, canvas.width + drDrew.y, parseInt(sessionStorage.getItem('level')));
                platformLimit = 1;
                break;
            case '4':
                console.log("INSIDE CASE 3");
                platforms.push(new platformCreate(300, 100));
                platforms.push(new platformCreate(50, 300)); //start platform, don't remove
                token = new tokenCreate(50, 350);
                enemy = new enemyCreate(drDrew.x - 50, canvas.width + drDrew.y, parseInt(sessionStorage.getItem('level')));
                platformLimit = 1;
                break;
            case '5':
                console.log("INSIDE CASE 3");
                platforms.push(new platformCreate(300, 100));
                platforms.push(new platformCreate(50, 300)); //start platform, don't remove
                token = new tokenCreate(canvas.width - 15, 10);
                enemy = new enemyCreate(drDrew.x - 50, canvas.width + drDrew.y, parseInt(sessionStorage.getItem('level')));
                platformLimit = 1;
                break;
            default:
                var score = parseInt(sessionStorage.getItem('score'));
                console.log("the score is " + score);
                // FIXME this code isnt working right, the score isnt being recorded properly
                var username = prompt("Game Over \nPlease enter your name", "Type name here");
                $.post("score_page.php", {
                    score: score,
                    username: username
                }, function(data) {
                    window.location.href = 'score_page.php'
                });

        }
        // platforms.push(new platformCreate(300, 100));
        // platforms.push(new platformCreate(50, 300));
        // token = new tokenCreate(300, 10);
        drDrew.scaleX = .1;
        drDrew.scaleY = .1;
        drDrew.x = 100;
        drDrew.y = 200;
        // drDrew.rotation = -45;
        stage.addChild(drDrew);
        stage.addChild(enemy);
        stage.addChild(token);
        for (var i = 0; i < platforms.length; i++) {
            stage.addChild(platforms[i]);
        }
        stage.update();
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(30);
        // console.log(drDrew.name + " added");
        // console.log(enemy.name + " added.");
    }
    // newImage('drDrew', 'pencil.jpg', 100, 100, .1, .1);

}

// initializing the stage and drDrewCreate
initializeGame();

// initializing the ticker to 30FPS


function handleTick(event) {
    if (!event.paused) {
        // Actions carried out when the Ticker is not paused.
    }
    // Actions carried out each tick (aka frame)
    currentTime = Math.round(createjs.Ticker.getTime() / 1000);
    drDrew.curTime = currentTime;
    // console.log(currentTime);
    var timeNode = document.getElementById('timeSpot');
    while (timeNode.hasChildNodes()) {
        timeNode.removeChild(timeNode.childNodes[0]);
    }
    var timeText = document.createTextNode("Play time (s): " + currentTime);
    var shapesPlayed = document.createTextNode("Shapes Played: " + addedPlatforms + "/" + platformLimit);
    var score = document.createTextNode("Score: " + sessionStorage.getItem('score'));
    drDrew.score = sessionStorage.getItem('score'); //keep current score inside of drDrew
    console.log("drDrew.score: " + drDrew.score);
    timeNode.appendChild(timeText);
    timeNode.appendChild(document.createElement('br'));
    timeNode.appendChild(shapesPlayed);
    timeNode.appendChild(document.createElement('br'));
    timeNode.appendChild(score);
    // canvas.appendChild(document.createTextNode(currentTime));
    drDrew.tick();
    enemy.tick(drDrew);
    drDrew.collision(enemy);
    drDrew.collision(token);
    if (drDrew.addPlat) {
        console.log("ADD ONE YO");
        addedPlatforms++;
        if (addedPlatforms <= platformLimit) {
            platforms.push(new platformCreate(drDrew.x, drDrew.y + 20));
            stage.addChild(platforms[platforms.length - 1]);
            drDrew.addPlat = false;
        } else {
            drDrew.addPlat = false;
            addedPlatforms = platformLimit
        }

    }
    // for(var i = 0; i < platforms.length; i++){
    //         drDrew.collision(platforms[i]);
    // }

    stage.update();
}

//loading in an image object
// img source: http://weknowyourdreams.com/images/pencil/pencil-04.jpg
function newImage(imageName, imageSource, xPos, yPos, xScale, yScale) {

    var img = new Image();
    img.onload = onImageLoaded;
    img.src = 'images/' + imageSource;

    function onImageLoaded(e) {
        var imageName = new createjs.Bitmap(img);
        imageName.scaleX = xScale;
        imageName.scaleY = yScale;
        imageName.x = xPos;
        imageName.y = yPos;
        stage.addChild(imageName);
        stage.update();
        console.log(imageName + " added");
    }
}

//check for a touch-option
if ('ontouchstart' in document.documentElement) {
    canvas.addEventListener('touchstart', function(e) {
        handleKeyDown();
    }, false);

    canvas.addEventListener('touchend', function(e) {
        handleKeyUp();
    }, false);
} else {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    // document.onmousedown = handleKeyDown;
    // document.onmouseup = handleKeyUp;
}

function checkCollision(player, thing) {
    var playerRect = {
        xLength: player.getBounds().width * player.scaleY,
        yLength: player.getBounds().height * player.scaleX
    };

    var playerCenter = {
        x: player.x + playerRect.xLength / 2,
        y: player.y + playerRect.yLength / 2,
    }

    var thingRect = {
        xLength: thing.getBounds().width * thing.scaleY,
        yLength: thing.getBounds().height * thing.scaleX
    };

    var thingCenter = {
        x: thing.x + thingRect.xLength / 2,
        y: thing.y + thingRect.yLength / 2,
    }

    var xCollide = Math.abs(playerCenter.x - thingCenter.x) <= .5 * (thingRect.xLength + playerRect.xLength);
    var yCollide = Math.abs(playerCenter.y - thingCenter.y) <= .5 * (thingRect.yLength + playerRect.yLength);

    //ALLEN set left and right bounds for a fall off if the character moves too far
    if (xCollide && yCollide) {
        player.rLim = thingCenter.x + thingRect.xLength / 2;
        player.lLim = thingCenter.x - thingRect.xLength / 2;
        //console.log("lLim: " + player.lLim + " rLim: " + player.rLim);
    }
    //ALLEN if drDrew passes these bounds, he is considered off the platform again
    if (playerCenter.x > player.rLim || playerCenter.x < player.lLim) {
        player.onPlatform = false;
    }
    return (xCollide && yCollide);

}
