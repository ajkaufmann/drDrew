(function(window) {
    function tokenCreate(x, y) {
        this.initialize(x, y);
    }

    tokenCreate.prototype = new createjs.Bitmap();

    // save the original initialize-method so it won't be gone after
    // overwriting it
    tokenCreate.prototype.Bitmap_initialize = tokenCreate.prototype.initialize;

    // initialize the object
    tokenCreate.prototype.initialize = function(x, y) {
        this.Bitmap_initialize("/images/winToken.jpg");
        this.name = 'Token';
        this.snapToPixel = true;
        this.scaleX = .1;
        this.scaleY = .1;
        this.x = x;
        this.y = y;
        this.width = 90;
        this.height = 10;
        this.closeFactor = .7;
        this.counter = 5;
    }

    tokenCreate.prototype.move = function(player) {
    }

    tokenCreate.prototype.tick = function(player) {
    }

    window.tokenCreate = tokenCreate;

}(window));
