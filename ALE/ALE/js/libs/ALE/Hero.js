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
        // ===================
        // Constructor
        // ===================
        namespace.HeroPrivate = function (x, y, width, height, imgName, density, elasticity, friction)
        {
            this.init(x, y, width, height, imgName, density, elasticity, friction);
        }
        var p = namespace.HeroPrivate.prototype = new ALE.PhysicsSprite();

        // ===================
        // Methods
        // ===================
        p.PhysicsSprite_init = p.init;
        p.init = function (x, y, width, height, imgName, density, elasticity, friction)
        {
            p.PhysicsSprite_init.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_HERO);
        }

        p.onCollide = function (other)
        {
            if (other.myType == ALE.PhysicsSprite.TYPE_DESTINATION)
            {
                onCollideWithDestination(other);
            }
        }

        p.onCollideWithDestination = function ()
        {
            // only do something if the hero has enough goodies and there's
            // room in the destination
            var currentGoodieScore = Goodie.goodiescollected;
            if ((currentGoodieScore >= d._activationScore) && (d._holding < d._capacity))
            {
                // hide the hero, disable the hero's motion, and check if the
                // level is complete
                ALE.Destination.arrivals++;
                d._holding++;
                d.onArrive();
                this.sprite.body.SetActive(false);

                // vanish quietly, since we want the destination sound to play
                p.vanish(true);

                if ((ALE.Level.victoryType == ALE.Level.VICTORY
            }
        }

    })(namespace.Hero);

})(this.ALE);