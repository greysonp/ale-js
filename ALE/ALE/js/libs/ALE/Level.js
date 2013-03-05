this.ALE = this.ALE || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    var level = namespace.Level = {};

    // Victory types
    var DESTINATION = 0;
    var GOODIECOUNT = 1;
    var ENEMYCOUNT = 2;

    // Fields
    level.current = {};
    var winSound = {};
    var loseSound = {};
    var music = {};
    var victoryType = DESTINATION;
    var victoryVal = 0;

    var _xGravityMax = 0;
    var _yGravityMax = 0;
    var _initXGravity = 0;
    var _initYGravity = 0;
    var _width = 0;
    var _height = 0;
    
    var background = {};
    var backgroundScrollFactor = 1;

    var physics = {};
    var accelEntities = new Array();

    var backgroundYouWon = "";
    var backgroundYouLost = "";
    var textYouWon = "";
    var textYouLost = "";

    var gameOver = false;

    var tiltVelocityOverride = false;
    var _gravityMultiplier = 0;

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

    }

    level.configure = function (width, height, initXGravity, initYGravity)
    {
        console.log("ALE.Level.configure()");

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

        // update physics in tick
        //physics.setContactListener(namespace);

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
        console.log("ALE.Level.setVictoryDestination()");
        victoryType = DESTINATION;
        victoryVal = howMany;
    }

    level.setVictoryEnemyCount = function (howMany)
    {
        victoryType = ENEMYCOUNT;

        if (!howMany)
            victoryVal = -1;
        else
            victoryVal = howMany;
    }

    level.setVictoryGoodies = function (howMany)
    {
        victoryType = GOODIECOUNT;
        victoryVal = howMany;
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



})(this.ALE);
