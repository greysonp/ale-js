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

    media.loadAll = function(callback)
    {
        var queue = new createjs.LoadQueue();
    }


})(this.ALE);

