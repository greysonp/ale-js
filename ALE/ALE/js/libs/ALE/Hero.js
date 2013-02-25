this.ALE = this.ALE || {};

(function (namespace)
{
    var hero = namespace.Hero = {};

    hero.onNewLevel = function ()
    {
        console.log("ALE.Hero.onNewLevel()");
    }

})(this.ALE);