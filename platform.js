(function(window) {
    function platformCreate(x, y) {
        this.initialize(x, y);
    }

    platformCreate.prototype = new createjs.Bitmap();

    // save the original initialize-method so it won't be gone after
    // overwriting it
    platformCreate.prototype.Bitmap_initialize = platformCreate.prototype.initialize;

    // initialize the object
    platformCreate.prototype.initialize = function(x, y) {
        this.Bitmap_initialize("/images/platform.jpg");
        this.name = 'Platform';
        this.snapToPixel = true;
        this.scaleX = .5;
        this.scaleY = .5;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        // console.log(this.getBounds());
    }


    platformCreate.prototype.tick = function() {

    }

    window.platformCreate = platformCreate;

}(window));
