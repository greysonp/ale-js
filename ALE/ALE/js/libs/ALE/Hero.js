this.ALE = this.ALE || {};

(function (namespace)
{
    ///////////////////////////////////
    var hero = namespace.Hero = {};
    ///////////////////////////////////

    var heroes = new Array();
    var lastHero = {};

    hero.onNewLevel = function ()
    {
        console.log("ALE.Hero.onNewLevel()");
    }

    hero.makeAsMoveable = function(x, y, width, height, imgName, density, elasticity, friction)
    {
        console.log("ALE.Hero.makeAsMoveable()");
        var h = new HeroPrivate(x, y, width, height, imgName, density, elasticity, friction);
        namespace.Level.current.attachChild(h.sprite);
        heroes.push(h);

        lastHero = h;

        return h;
    }

    function HeroPrivate(x, y, width, height, imgName, density, elasticity, friction)
    {
        var p = this.prototype = new namespace.PhysicsSprite(x, y, width, height, imgName, namespace.PhysicsSprite.TYPE_HERO);

        // ==============
        // Constructor
        // ==============

        p.setCirclePhysics(density, elasticity, friction, p.BODY_DYNAMIC);
        p.init.call(this, x, y, width, height, imgName, p.TYPE_HERO);

        // ===========
        // Methods
        // ===========

        this.setMoveByTilting = function ()
        {
            console.log("ALE.Hero.HeroPrivate.setMoveByTilting()");
        }
    }


})(this.ALE);