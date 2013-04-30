this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    

    namespace.PowerBar = function (px, py, width, height, maxValue, startValue, color, rechargeRate)
    {
        this.init(px, py, width, height, maxValue, startValue, color, rechargeRate);
    }

    var p = namespace.PowerBar.prototype;
    p.bkgGraphics = {};
    p.bkg = {};
    p.barGraphics = {};
    p.bar = {};

    p.width = 0;
    p.height = 0;
    p.maxValue = 0;
    p.px = 0;
    p.py = 0;

    p.init = function (px, py, width, height, maxValue, startValue, color, rechargeRate)
    {
        // Copy fields
        p.px = px;
        p.py = py;
        p.width = width;
        p.height = height;
        p.maxValue = maxValue;

        // Initialize background
        p.bkgGraphics = new createjs.Graphics();
        drawBackground(p.bkgGraphics, px, py, width, height);

        //  Initialize bar
        p.barGraphics = new createjs.Graphics();
        p.bar = new createjs.Shape(p.barGraphics);
        p.bar.x = p.px;
        p.bar.y = p.py;
        p.setBarValue(startValue);
    }

    p.setBarValue = function(val)
    {
        val = val < p.maxValue ? val : p.maxValue;
        var barWidth = (val / p.maxValue) * p.width;

        p.barGraphics.clear();
        p.barGraphics.beginFill(createjs.Graphics.getRGB(255, 0, 0));
        p.barGraphics.rect(0, 0, barWidth, p.height);
    }

    p.resetValue = function()
    {
        p.barGraphics.clear();
    }

    function drawBackground(g, px, py, width, height)
    {
        g.beginFill(createjs.Graphics.getRGB(255, 255, 255));
        g.rect(0, 0, width, height);
        console.log("width: " + width + "  height: " + height);
        p.bkg = new createjs.Shape(g);
        p.bkg.x = px;
        p.bkg.y = py;
    }

    

})(this.Game);