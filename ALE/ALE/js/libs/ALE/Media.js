this.createjs = this.createjs || {};
this.ALE = this.ALE || {};

(function (namespace)
{
    var media = namespace.Media = {};
    // ==================================
    
    
    var sounds = new Array();
    var tunes = new Array();
    var images = new Array();

    media.getSound = function (soundName)
    {
        return {};
    }

    media.getMusic = function (musicName)
    {
        return {};
    }

    media.getImage = function (imgName)
    {
        return {};
    }

    media.registerImage = function (imgName)
    {
        console.log("ALE.Media.registerImage()");
    }

    media.registerAnimatableImage = function (imgName, cellColumns)
    {
        console.log("ALE.Media.registerANimatableImage()");
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

