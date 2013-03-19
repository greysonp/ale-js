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

    hero.makeAsMoveable = function (x, y, width, height, imgName, density, elasticity, friction)
    {
        console.log("ALE.Hero.makeAsMoveable()");
        var h = new hero.HeroPrivate(x, y, width, height, imgName, density, elasticity, friction);
        h.setCirclePhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_DYNAMIC);
        namespace.Level.current.attachChild(h.sprite);
        heroes.push(h);

        lastHero = h;

        return h;
    };

    (function (namespace)
    {
        namespace.HeroPrivate = function (x, y, width, height, imgName, density, elasticity, friction)
        {
            this.init(x, y, width, height, imgName, density, elasticity, friction);
        }
        var p = namespace.HeroPrivate.prototype = new ALE.PhysicsSprite();

        p.PhysicsSprite_init = p.init;
        p.init = function (x, y, width, height, imgName, density, elasticity, friction)
        {
            p.PhysicsSprite_init.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_HERO);
        }

    })(namespace.Hero);

})(this.ALE);