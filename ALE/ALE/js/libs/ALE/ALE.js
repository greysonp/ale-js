this.ALE = this.ALE || {};
this.Game = this.Game || {};
this.box2d = this.box2d || {};
this.createjs = this.createjs || {};

(function ()
{
    var FPS_TARGET = ALE.FPS_TARGET = 60;
    var FPS = FPS_TARGET;
    var paused = false;

    ALE.stage = {};
    ALE._camera = {};

    ALE.init = function()
    {
        Game.nameResources();
        console.log("HELLO?");
        // TODO: Put some sort of loading screen here
        ALE.Media.loadAll(function ()
        {
            console.log("Loaded media.");
        });
    }

    ALE.setup = function (level)
    {
        console.log("ALE.setup()");

        // He we'll initialize the stage and set the FPS to 30
        ALE.stage = new createjs.Stage("canvas");
        createjs.Touch.enable(ALE.stage);
        createjs.Ticker.setFPS(30);
        createjs.useRAF = true;
        console.log(level);

        // Start off the game
        Game.configureLevel(level);

        // Initialize after the popup scene is handled
        ALE.PopUpScene.run(function ()
        {
            // Kick-off the Ticker now that the physics world is instantiated
            // (it's instantiated in the Level class)
            createjs.Ticker.addListener(ALE);
        });
    }

    ALE.configAccelerometer = function (toggle)
    {
        console.log("ALE.configAccelerometer()");
    }

    ALE.pause = function ()
    {
        paused = true;
        createjs.Ticker.setPaused(true);
        //ALE.Route.pauseAll();
    }

    ALE.resume = function ()
    {
        paused = false;
        createjs.Ticker.setPaused(false);
        //ALE.Route.playAll();
    }

    ALE.isPaused = function ()
    {
        return paused;
    }

    ALE.tick = function (e)
    {
        if (paused)
            return;

        box2d.world.Step(1 / FPS_TARGET, 3, 3);
        box2d.world.ClearForces();
        ALE.stage.update();

        updateFramerate();
    }

    ALE.beginContact = function (contact)
    {
        var dataA = contact.GetFixtureA().GetBody().GetUserData();
        var dataB = contact.GetFixtureB().GetBody().GetUserData();

        if (!(dataA.obj instanceof ALE.PhysicsSprite) || !(dataB.obj instanceof ALE.PhysicsSprite))
            return;

        if (dataA.type > dataB.type)
            dataB.obj.onCollide(dataA.obj);
        else
            dataA.obj.onCollide(dataB.obj);
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

})();