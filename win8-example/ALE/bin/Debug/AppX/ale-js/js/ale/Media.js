this.createjs = this.createjs || {};
this.ALE = this.ALE || {};

(function (namespace)
{
    var media = namespace.Media = {};
    // ==================================
    
    var sounds = new Array();
    var images = new Array();

    var ASSET_PATH = "assets/";

    media.getSound = function (soundName)
    {
        if (!sounds[soundName])
            console.error("The sound '" + ASSET_PATH + "'" + soundName + "' does not exist.");
        return sounds[soundName];
    }

    media.getMusic = function (musicName)
    {
        if (!sounds[musicName])
            console.error("The song '" + ASSET_PATH + "'" + musicName + "' does not exist.");
        return sounds[musicName];
    }

    media.getImage = function (imgName)
    {
        if (!images[imgName])
            console.error("The image '" + ASSET_PATH + "'" + imgName + "' does not exist.");
        return images[imgName];
    }

    media.registerImage = function (imgName)
    {
        images[imgName] = new Image();
        images[imgName].src = ASSET_PATH + imgName;
        console.log("ALE.Media registered image: " + images[imgName].src);
    }

    media.registerAnimatableImage = function (imgName, cellColumns)
    {
        console.log("ALE.Media.registerAnimatableImage()");
        media.registerImage(imgName);
    }

    media.registerMusic = function (musicName)
    {
        console.log("ALE.Media.registerMusic()");
    }

    media.registerSound = function (soundName)
    {
        sounds[soundName] = ASSET_PATH + soundName;
        console.log("ALE.Media registered sound: " + sounds[soundName]);
    }

    media.loadAll = function (callback)
    {
        // Initialize our queue
        var queue = new createjs.LoadQueue(true);
        queue.installPlugin(createjs.Sound);

        // Load in the images and sounds
        var manifest = makeManifestFromImages(images).concat(makeManifestFromSounds(sounds));
        queue.loadManifest(manifest);

        // When our queue is done, clean up and call our callback
        queue.addEventListener("complete", callback);
    }

    function getKeys(a)
    {
        var keys = [];
        for (var key in a)
            if (a.hasOwnProperty(key))
                keys.push(key);
        return keys;
    }

    function makeManifestFromImages(a)
    {
        var keys = getKeys(a);
        var manifest = new Array();
        for (var i = 0; i < keys.length; i++)
            manifest.push({ id: keys[i], src: a[keys[i]].src });
        return manifest;
    }

    function makeManifestFromSounds(a)
    {
        var keys = getKeys(a);
        var manifest = new Array();
        for (var i = 0; i < keys.length; i++)
            manifest.push({ id: keys[i], src: a[keys[i]] }); // The difference is we don't use src
        return manifest;                                     // Lazy, I know.
    }
})(this.ALE);

