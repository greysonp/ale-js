this.createjs = this.createjs || {};
this.ALE = this.ALE || {};

(function (namespace)
{
    var media = namespace.Media = {};
    // ==================================
    
    var sounds = new Array();
    var images = new Array();

    media.getSound = function (soundName)
    {
        if (!sounds[soundName])
            console.error("The sound 'assets/" + soundName + "' does not exist.");
        return sounds[soundName];
    }

    media.getMusic = function (musicName)
    {
        if (!sounds[musicName])
            console.error("The song 'assets/" + musicName + "' does not exist.");
        return sounds[musicName];
    }

    media.getImage = function (imgName)
    {
        if (!images[imgName])
            console.error("The image 'assets/" + imgName + "' does not exist.");
        return images[imgName];
    }

    media.registerImage = function (imgName)
    {
        images[imgName] = new Image();
        images[imgName].src = "assets/" + imgName;
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
        sounds[soundName] = "assets/" + soundName;
        console.log("ALE.Media registered sound: " + sounds[soundName]);
    }

    media.loadAll = function (callback)
    {
        // Initialize our queue
        var queue = new createjs.LoadQueue(true);
        queue.installPlugin(createjs.Sound);
        console.log("PLUGIN INSTALLED");

        // Load in the images and sounds
        var manifest = makeManifestFromImages(images).concat(makeManifestFromSounds(sounds));
        queue.loadManifest(manifest);
        console.log("LOADING CALLED");

        // When our queue is done, clean up and call our callback
        queue.addEventListener("complete", callback);
        queue.addEventListener("fileload", handleFileLoad);
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

    function handleFileLoad(e)
    {
        console.log("LOADED: " + e.item.type);
    }
})(this.ALE);

