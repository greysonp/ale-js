this.ALE = this.ALE || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    var level = namespace.Level = {};

    // Victory types
    level.VICTORY = { DESTINATION: 0, GOODIECOUNT: 1, ENEMYCOUNT: 2 };

    // Fields
    level.current = {};
    level.contactListener = {};
    var winSound = {};
    var loseSound = {};
    var music = {};
    level.victoryType = level.VICTORY.DESTINATION;
    level.victoryVal = 0;

    var _xGravityMax = 0;
    var _yGravityMax = 0;
    var _initXGravity = 0;
    var _initYGravity = 0;
    var _width = 0;
    var _height = 0;
    
    var background = {};
    var backgroundScrollFactor = 1;

    var physics = {};
    level.accelEntities = new Array();

    var backgroundYouWon = "";
    var backgroundYouLost = "";
    var textYouWon = "";
    var textYouLost = "";

    var gameOver = false;

    var tiltVelocityOverride = false;
    var _gravityMultiplier = 1;

    var ACCEL_ADJUST = 7;

    level.setWinText = function (text)
    {
        textYouWon = text;
    }

    level.setLoseText = function (text)
    {
        textYouLost = text;
    }

    level.setWinSound = function (soundName)
    {
        winSound = namespace.Media.getSound(s);
    }

    level.setLoseSound = function (soundName)
    {
        loseSound = namespace.Media.getSound(soundName);
    }

    level.setMusic = function (musicName)
    {
        music = namespace.Media.getMusic(musicName);
    }

    level.makeBackgroundLayer = function (imgName, factor, x, y)
    {
        console.log("ALE.Level.makeBackgroundLayer()");
    }

    level.setBackgroundScrollFactor = function (rate)
    {
        backgroundScrollFactor = rate;
    }

    level.setBackgroundColor = function (red, green, blue)
    {
        if (!background)
        {
            console.log("ALE.Level.setBackgroundColor()");
        }
    }

    level.setTiltAsVelocity = function (toggle)
    {
        tiltVelocityOverride = toggle;
    }

    level.enableTilt = function (xGravityMax, yGravityMax)
    {
        _xGravityMax = xGravityMax;
        _yGravityMax = yGravityMax;
    }

    level.configure = function (width, height, initXGravity, initYGravity)
    {
        console.log("ALE.Level.configure()");
        // Resize the canvas
        var c = document.getElementById('canvas');
        c.width = width;
        c.height = height;

        // Find what pixel size the width should be using proportions because
        // I can't figure out how to style the width to scale appropriately
        var ratio = window.screen.height / height;
        var pixWidth = c.width * ratio;
        console.log("pixWidth: " + pixWidth);

        // Now get the percentage to eliminate the possibility of affecting the actual canvas width
        //
        // pixWidth/screenWidth = x/100
        var percentage = (pixWidth * 100) / window.screen.width;
        $('#canvas').css('width', percentage + '%');

        // Initializing scene
        level.current = new namespace.Scene();
        namespace.stage.addChild(level.current.getContainer());

        gameOver = false;
        tiltVelocityOverride = false;
        _xGravityMax = 0;
        _yGravityMax = 0;
        _initXGravity = initXGravity;
        _initYGravity = initYGravity;
        _width = width;
        _height = height;
        _gravityMultiplier = 1;

        //ALE._camera.setBoundsEnabled(true);
        //ALE.self()._camera.setBounds(0, 0, width, height);

        initPhysics(initXGravity, initYGravity);

        accelEntities = new Array();

        // Our contact listener
        level.contactListener = new box2d.b2ContactListener();
        level.contactListener.BeginContact = ALE.beginContact;
        box2d.world.SetContactListener(level.contactListener);

        // Level initialization
        namespace.Hero.onNewLevel();
        namespace.Enemy.onNewLevel();
        namespace.Destination.onNewLevel();
        namespace.Goodie.onNewLevel();
        namespace.Controls.resetHUD();
        namespace.Obstacle.onNewLevel();

        ALE.configAccelerometer(false);
        level.setVictoryDestination(1);
        //ALE._camera.setZoomFactorDirect(1);

        textYouWon = "Next Level";
        textYouLost = "Try Again";

        winSound = null;
        loseSound = null;
        music = null;
        background = null;
        vertBackground = null;
        backgroundYouWon = null;
        backgroundYouLost = null;
    }

    function initPhysics(initXGravity, initYGravity)
    {
        console.log("ALE.Level.initPhysics()");
        box2d.world = new box2d.b2World(new box2d.b2Vec2(initXGravity, initYGravity), true);
    }

    level.setVictoryDestination = function (howMany)
    {
        level.victoryType = level.VICTORY.DESTINATION;
        level.victoryVal = howMany;
    }

    level.setVictoryEnemyCount = function (howMany)
    {
        level.victoryType = level.VICTORY.ENEMYCOUNT;

        if (!howMany)
            level.victoryVal = -1;
        else
            vlevel.ictoryVal = howMany;
    }

    level.setVictoryGoodies = function (howMany)
    {
        level.victoryType = level.VICTORY.GOODIECOUNT;
        level.victoryVal = howMany;
    }

    level.drawPicture = function (x, y, width, height, imgName)
    {
        var bmp = new Bitmap(Media.getImage(imgName));
        current.attachChild(bmp);
    }

    level.drawPictureBehindScenes = function (x, y, width, height, imgName)
    {
        console.log("ALE.Level.drawPictureBehindScenes()");
    }

    level.setBackgroundWinImage = function (imgName)
    {
        backgroundYouWon = imgName;
    }

    level.setBackgroundLoseImage = function (imgName)
    {
        backgroundYouLost = imgName;
    }

    level.makeVerticalBackgroundLayer = function (imgName, factor, x, y)
    {
        console.log("ALE.Level.makeVerticalBackgroundLayer()");
    }

    level.setVerticalBackgroundColor = function (red, green, blue)
    {
        console.log("ALE.Level.setVerticalBackgroundColor()");
    }

    level.setTimeTrigger = function (timerId, howLong)
    {
        console.log("ALE.Level.setTimerTrigger()");
    }

    level.setGravityMultiplier = function (multiplier)
    {
        _gravityMultiplier = multiplier;
    }

    level.getWidth = function ()
    {
        return _width;
    }

    level.getHeight = function ()
    {
        return _height;
    }

    var accelerometer;
    var intervalId = 0;
    var getReadingInterval = 0;
    var accelInit = false;

    level.initAccelerometer = function()
    {
        if (accelInit) return;

        accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
        if (accelerometer)
        {
            var minReportingInterval = accelerometer.minimumReportInterval;
            var idealInterval = (1 / namespace.FPS_TARGET) * 1000;
            var reportInterval = minReportingInterval > 16 ? minReportingInterval : 16;
            accelerometer.reportInterval = reportInterval;
            getReadingInterval = reportInterval * 2;
            accelerometer.addEventListener("readingchanged", onAccelerationChanged);
            accelInit = true;
        }
        else
        {
            console.error("No accelerometer found.");
        }
    }

    function onAccelerationChanged(e)
    {
        // Don't do anything if the game is paused
        if (ALE.paused)
            return;

        // Get reading
        var reading = e.reading;
        var gx = reading.accelerationX.toFixed(3) * _gravityMultiplier * ACCEL_ADJUST;
        var gy = reading.accelerationY.toFixed(3) * _gravityMultiplier * ACCEL_ADJUST;
        gy *= -1; // ale-js specific! Windows accelerometer is reversed

        // Keep in bounds (-gravityMax, gravityMax)
        gx = Math.min(gx, _xGravityMax);
        gx = Math.max(gx, -_xGravityMax);

        gy = Math.min(gy, _yGravityMax);
        gy = Math.max(gy, -_yGravityMax);

        // we're allowed to just set velocity
        if (tiltVelocityOverride)
        {
            // we need to be careful here... if we have a zero for the X or Y
            // gravityMax, then in that dimension we should not just set linear
            // velocity to the value we compute, or jumping won't work

            // we're going to assume that you wouldn't have xGravityMax == yGravityMax == 0
            if (_xGravityMax == 0)
            {
                for (var i = 0; i < level.accelEntities.length; i++)
                {
                    var o = level.accelEntities[i].sprite.body;
                    if (o.IsActive())
                        o.SetLinearVelocity(new box2d.b2Vec2(o.getLinearVelocity().x, gy));
                }
            }
            else if (_yGravityMax == 0)
            {
                for (var i = 0; i < level.accelEntities.length; i++)
                {
                    var o = level.accelEntities[i].sprite.body;
                    if (o.IsActive())
                        o.SetLinearVelocity(new box2d.b2Vec2(gx, o.getLinearVelocity().y));
                }
            }
            else
            {
                for (var i = 0; i < level.accelEntities.length; i++)
                {
                    var o = level.accelEntities[i].sprite.body;
                    if (o.IsActive())
                        o.SetLinearVelocity(new box2d.b2Vec2(gx, gy));
                }
            }
        }
        // we have to add to the velocity
        else
        {
            var oac = new box2d.b2Vec2(gx, gy);
            for (var i = 0; i < level.accelEntities.length; i++)
            {
                var o = level.accelEntities[i].sprite.body;
                if (o.IsActive())
                {
                    o.ApplyForce(oac, o.GetWorldCenter());
                }
            }
        }

    }


})(this.ALE);
