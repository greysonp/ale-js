this.createjs = this.createjs || {};
this.ALE = this.ALE || {};

(function (namespace)
{
    var media = namespace.Media = {};
    // ==================================
    
    
    var sounds = new Array();
    var tunes = new Array();
    var images = {};

    media.getSound = function (soundName)
    {
        if (!sounds[soundName])
            console.error("The sound 'assets/" + soundName + "' does not exist.");
        return sounds[soundName];
    }

    media.getMusic = function (musicName)
    {
        if (!sounds[musicName])
            console.error("The sound 'assets/" + musicName + "' does not exist.");
        return tunes[musicName];
    }

    media.getImage = function (imgName)
    {
        if (!sounds[imgName])
            console.error("The sound 'assets/" + imgName + "' does not exist.");
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
    }

    media.registerMusic = function (musicName)
    {
        console.log("ALE.Media.registerMusic()");
    }

    media.registerSound = function (soundName)
    {
        console.log("ALE.Media.registerSound()");
    }


})(this.ALE);

