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
    var current = {};
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
        current = new namespace.Scene();
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

        initPhysics();

        accelEntities = new Array();

        //current.registerUpdateHandler(physics);
        //physics.setContactListener(namespace);


    }

})(this.ALE);
