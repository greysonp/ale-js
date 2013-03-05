this.ALE = this.ALE || {};

(function (namespace)
{
    ///////////////////////////////////
    var hero = namespace.Hero = {};
    ///////////////////////////////////

    var heroes = new Array();


    hero.onNewLevel = function ()
    {
        console.log("ALE.Hero.onNewLevel()");
    }

    hero.makeAsMoveable = function(x, y, width, height, imgName, density, elasticity, friction)
    {
        console.log("ALE.Hero.makeAsMoveable()");
        return new HeroPrivate(x, y, width, height, imgName, density, elasticity, friction);
    }

    function HeroPrivate(x, y, width, height, imgName, density, elasticity, friction)
    {
        this.setMoveByTilting = function ()
        {
            console.log("ALE.Hero.HeroPrivate.setMoveByTilting()");
        }
    }


})(this.ALE);