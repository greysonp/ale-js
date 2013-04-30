this.ALE = this.ALE || {};

(function ()
{
    ///////////////////////////////////
    var hero = ALE.Hero = {};
    ///////////////////////////////////

    var heroes = new Array();
    var lastHero = {};

    var heroesDestroyed = 0;
    var heroesCreated = 0;

    hero.onNewLevel = function ()
    {
        heroesCreated = 0;
        heroesDestroyed = 0;
        heroes = new Array();
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
    }

    /**
     * As private as we can make it.
     */
    ;(function ()
    {
        var _Hero = Class.design('ALE.Hero._Hero',
        {
            Extends: ALE.PhysicsSprite,
            // ===================
            // Constructor
            // ===================
            initialize: function (x, y, width, height, imgName, density, elasticity, friction)
            {
                _Hero.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_HERO);
                // ===================
                // Instance Variables
                // ===================
                this.crawling = false;
                this.invincible = false;
                this.strength = 0;

                // ===================
                // Instantiation
                // ===================
                heroesCreated++;
            },

            // ===================
            // Methods
            // ===================
            onCollide: function (other)
            {
                if (other.myType == ALE.PhysicsSprite.TYPE_ENEMY)
                {
                    this.onCollideWithEnemy(other);
                }

                if (other.myType == ALE.PhysicsSprite.TYPE_DESTINATION)
                {
                    this.onCollideWithDestination(other);
                }

                if (other.myType == ALE.PhysicsSprite.TYPE_OBSTACLE)
                {
                    this.onCollideWithObstacle(other);
                }
            },

            onCollideWithEnemy: function(e)
            {
                // Can we defeat it via invincibility?
                if (!e.alwaysDoesDamage && (this.invincible))
                {
                    // do stuff for invincibility
                }
                // defeat by crawling
                else if (this.crawling && e.removeByCrawl)
                {
                    // kill enemy
                }
                // when we can't defeat it by losing strength
                else if (e.damage >= this.strength)
                {
                    this.vanish(false);
                    this.sprite.body.SetActive(false);
                    heroesDestroyed++;
                    if (heroesDestroyed == heroesCreated)
                    {
                        var msg = e.onDefeatHeroText ? e.onDefeatHeroText : ALE.Level.textYouLost;
                        console.log("MESSAGE: " + msg);
                        ALE.MenuManager.loseLevel(msg);
                    }
                }
                // when we can defeat it by losing strength
                else
                {

                }
            },

            onCollideWithDestination: function (d)
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
                    if ((ALE.Level.victoryType == ALE.Level.VICTORY.DESTINATION) &&
                        (ALE.Destination.arrivals >= ALE.Level.victoryVal))
                    {
                        ALE.MenuManager.winLevel();
                    }
                }
            },

            onCollideWithObstacle: function (o)
            {
                //console.log("Collided with Obstacle!");
            }
        })
    })();
})();