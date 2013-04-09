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
        console.log("ALE.Media.registerSound()");
    }

    media.loadAll = function (callback)
    {
        // Initialize our queue
        var queue = new createjs.LoadQueue(true);
        queue.installPlugin(createjs.Sound);

        // Load in the images and sounds
        var manifest = makeManifest(images).concat(makeManifest(sounds));
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

    function makeManifest(a)
    {
        var keys = getKeys(a);
        var manifest = new Array();
        for (var i = 0; i < keys.length; i++)
            manifest.push({ id: keys[i], src: a[keys[i]].src });
        return manifest;
    }

})(this.ALE);

