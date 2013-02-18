this.ALE = this.ALE || {};

(function ()
{
    var hero = namespace.Hero = {};

    hero.onNewLevel = function ()
    {
        console.log("ALE.Hero.onNewLevel()");
    }

})(this.ALE);