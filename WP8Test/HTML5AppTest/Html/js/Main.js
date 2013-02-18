document.addEventListener(
    "touchstart",
    function() { return false; },
    false
);

this.Game = this.Game || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    var FPS_TARGET = 60;
    var FPS = FPS_TARGET;
    var canvas, stage;
    var fpsLabel, countLabel;
    var ballCount = 0;

    var cx = 0;
    var cy = 0;
    var speed = 20;
    var mouseIsDown = false;
    var mouseCounter = 0;

    var powerBar = {};

    namespace.init = function ()
    {
        canvas = document.getElementById("canvas");
        cx = canvas.width / 2;
        cy = canvas.height / 2;

        stage = new createjs.Stage(document.getElementById("canvas"));
        setupPhysics();

        createjs.Touch.enable(stage);
        stage.onMouseDown = mouseDown;
        stage.onMouseUp = mouseUp;

        fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#FFF");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 20;

        countLabel = new createjs.Text("-- balls", "bold 18px Arial", "#FFF");
        stage.addChild(countLabel);
        countLabel.x = 10;
        countLabel.y = 40;

        powerBar = new namespace.PowerBar(canvas.width / 4, 0, canvas.width / 2, 20, 2 * 1.25, 0, 0, 0);
        stage.addChild(powerBar.bkg);
        stage.addChild(powerBar.bar);
        console.log("bkg: " + powerBar.bkg);

        createjs.Ticker.addListener(namespace);
        createjs.Ticker.setFPS(FPS);
        createjs.Ticker.useRAF = true;
    }

    function mouseDown(event)
    {
        mouseIsDown = true;
    }

    function mouseUp(event)
    {
        var seconds = mouseCounter / FPS_TARGET;

        var xDiff = event.stageX - cx;
        var yDiff = event.stageY - cy;
        var angle = Math.atan2(yDiff, xDiff);
        var vx = Math.cos(angle) * speed;
        var vy = Math.sin(angle) * speed;
        var b = new namespace.Ball(cx + Math.cos(angle) * 30, cy + Math.sin(angle) * 30, seconds);
        b.view.body.SetLinearVelocity(new box2d.b2Vec2(vx, vy));
        stage.addChild(b.view);
        ballCount++;

        powerBar.resetValue();
        mouseIsDown = false;
        mouseCounter = 0;
    }

    function setupPhysics()
    {
        box2d.world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);

        // walls
        var top = new namespace.PhysicsBoundary(canvas.width / 2, 0, canvas.width, 0);
        var bottom = new namespace.PhysicsBoundary(canvas.width / 2, canvas.height, canvas.width, 0);
        var left = new namespace.PhysicsBoundary(0, canvas.height / 2, 0, canvas.height);
        var right = new namespace.PhysicsBoundary(canvas.width, canvas.height / 2, 0, canvas.height);

        // Make center person
        var person = new namespace.PhysicsCircle(cx, cy, 25, new createjs.Bitmap("images/spiderman.png"), { "body": "static" });
        stage.addChild(person.view);

        // debug draw
        var debugDraw = new box2d.b2DebugDraw();
        debugDraw.SetSprite(stage.canvas.getContext('2d'));
        debugDraw.SetDrawScale(box2d.SCALE);
        debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);
    }

    namespace.tick = function ()
    {
        updatePhysics();
        updateFramerate();
        updateDebugInfo();
        stage.update();

        if (mouseIsDown)
        {
            mouseCounter++;
            powerBar.setBarValue(mouseCounter / FPS_TARGET);
        }
    }

    function updateDebugInfo()
    {
        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        countLabel.text = ballCount + " balls";
    }

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

    function updatePhysics()
    {
        //world.DrawDebugData();
        box2d.world.Step(1 / FPS_TARGET, 3, 3);
        box2d.world.ClearForces();
    }
})(this.Game);
