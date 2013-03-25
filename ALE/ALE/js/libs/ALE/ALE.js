this.ALE = this.ALE || {};
this.box2d = this.box2d || {};
this.createjs = this.createjs || {};

(function (namespace)
{
    var FPS_TARGET = namespace.FPS_TARGET = 60;
    var FPS = FPS_TARGET;

    namespace.stage = {};
    namespace._camera = {};


    namespace.init = function ()
    {
        console.log("ALE.init()");

        // He we'll initialize the stage and set the FPS to 30
        namespace.stage = new createjs.Stage("canvas");
        createjs.Touch.enable(namespace.stage);
        createjs.Ticker.addListener(namespace);
        createjs.Ticker.setFPS(30);
        createjs.useRAF = true;
    }

    namespace.configAccelerometer = function (toggle)
    {
        console.log("ALE.configAccelerometer()");
    }

    namespace.tick = function (e)
    {
        box2d.world.Step(1 / FPS_TARGET, 3, 3);
        box2d.world.ClearForces();
        namespace.stage.update();

        updateFramerate();
    }

    /**
     * Dynamically changes the framerate to keep the real framerate
     * near the target.
     */
    function updateFramerate()
    {
        if (createjs.Ticker.getMeasuredFPS() < FPS_TARGET && FPS < FPS_TARGET * 2)
        {
            FPS++;
            createjs.Ticker.setFPS(FPS);
        }
        else if (createjs.Ticker.getMeasuredFPS() > FPS_TARGET)
        {
            FPS--;
            createjs.Ticker.setFPS(FPS);
        }
    }

})(this.ALE);