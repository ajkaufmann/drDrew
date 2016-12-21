(function(window) {
    function enemyCreate(x, y, agression) {
        this.initialize(x, y, agression);
    }

    enemyCreate.prototype = new createjs.Bitmap();

    // save the original initialize-method so it won't be gone after
    // overwriting it
    enemyCreate.prototype.Bitmap_initialize = enemyCreate.prototype.initialize;

    // initialize the object
    enemyCreate.prototype.initialize = function(x, y, agression) {
        this.Bitmap_initialize("/images/blackbox.jpg");
        this.name = 'Enemy';
        this.snapToPixel = true;
        this.scaleX = .1;
        this.scaleY = .1;
        this.x = x;
        this.y = y;
        this.xVel = 0;
        this.yVel = 0;
        this.width = 90;
        this.height = 10;
        this.closeFactor = 1;
        this.counter = 5;        
        this.maxSpeed = 1 * agression;
    }

    enemyCreate.prototype.move = function(player) {
        console.log("MOVING ENEMY");
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var magnitude = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(this.xVel) < Math.abs(this.maxSpeed)) {
            this.xVel = (dx / magnitude);
        } else {
          this.xVel += this.maxSpeed * (dx / magnitude)/ Math.abs(dx / magnitude) ;
        }
        if (Math.abs(this.yVel) < Math.abs(this.maxSpeed)) {
            this.yVel += (dy / magnitude);
        } else {
          this.yVel = this.maxSpeed * (dy / magnitude)/ Math.abs(dy / magnitude) ;
        }
    }

    enemyCreate.prototype.tick = function(player) {
        // console.log(this.closeFactor);
        // console.log(this.counter);
        this.move(player);

        this.x += this.xVel;
        this.y += this.yVel;

        // if (this.counter % 300 == 0) {
        //     this.counter = 5;
        //     this.closeFactor -= 1  + (.005*this.agression);;
        // } else {
        //     this.counter += 5;
        // }
        // this.x = player.x - this.closeFactor * player.x;
        // this.y = player.y + this.closeFactor * player.y;
    }

    window.enemyCreate = enemyCreate;

}(window));
