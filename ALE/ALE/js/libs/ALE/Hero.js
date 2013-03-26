this.ALE = this.ALE || {};

(function ()
{
    ///////////////////////////////////
    var hero = ALE.Hero = {};
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
        var h = new hero._Hero(x, y, width, height, imgName, density, elasticity, friction);
        h.setCirclePhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_DYNAMIC);
        ALE.Level.current.attachChild(h.sprite);
        heroes.push(h);

        lastHero = h;

        return h;
    };

    /**
     * As private as we can make it.
     */
    (function ()
    {
        var _Hero = Class.design('ALE.Hero._Hero',
        {
            Extends: ALE.PhysicsSprite,
            // ===================
            // Constructor
            // ===================
            initialize: function (x, y, width, height, imgName, density, elasticity, friction)
            {
                console.log("Hero: " + imgName);
                _Hero.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_HERO);
            },

            // ===================
            // Methods
            // ===================
            onCollide: function (other)
            {
                if (other.myType == ALE.PhysicsSprite.TYPE_DESTINATION)
                {
                    this.onCollideWithDestination(other);
                }
            },

            onCollideWithDestination: function ()
            {
                // only do something if the hero has enough goodies and there's
                // room in the destination
                var currentGoodieScore = ALE.Goodie.goodiescollected;
                if ((currentGoodieScore >= d._activationScore) && (d._holding < d._capacity))
                {
                    // hide the hero, disable the hero's motion, and check if the
                    // level is complete
                    ALE.Destination.arrivals++;
                    d._holding++;
                    d.onArrive();
                    this.sprite.body.SetActive(false);

                    // vanish quietly, since we want the destination sound to play
                    this.vanish(true);

                    if ((ALE.Level.victoryType == ALE.Level.VICTORY))
                    {
                        // Do something
                    }
                }
            }
        })
    })();
})();