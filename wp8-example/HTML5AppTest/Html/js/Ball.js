this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    // ===========
    // CONSTRUCTOR
    // ===========
    namespace.Ball = function (px, py, magnitude)
    {
        this.init(px, py, magnitude);
    }
    var p = namespace.Ball.prototype = new namespace.PhysicsCircle();

    // ========
    // THE REST
    // ========
    p.PhysicsCircle_init = p.init;
    p.init = function (px, py, magnitude)
    {
        // Super call
        var density = 0.25 + magnitude / 1.25
        if (density > 2) density = 2;
        var properties = { "density": density };
        var bmp = new createjs.Bitmap("images/bullet.png");
        bmp.scaleX = bmp.scaleY = density;
        p.PhysicsCircle_init.call(this, px, py, 25, bmp, properties);

        // Overrides
        this.view.onTick = p.tick;
    }

    p.PhysicsCircle_tick = p.tick;
    p.tick = function (e)
    {
        // Super call
        p.PhysicsCircle_tick.call(this, e);
    }
})(this.Game);
