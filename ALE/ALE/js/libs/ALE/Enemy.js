this.ALE = this.ALE || {};

(function ()
{
    var enemy = ALE.Enemy = {};
    var enemies = new Array();

    enemy.enemiesCreated = 0;
    enemy.enemiesDefeated = 0;


    enemy.onNewLevel = function ()
    {
        console.log("ALE.Enemy.onNewLevel()");
    }

    enemy.checkWinByDefeatEnemies = function()
    {
        if (ALE.Level.victoryType == ALE.Level.VICTORY.ENEMYCOUNT)
        {
            if (ALE.Level.victoryVal == -1)
                return enemy.enemiesDefeated == enemy.enemiesCreated;
            else
                return enemy.enemiesDefeated >= Level.victoryVal;
        }
        return false;
    }

    enemy.makeAsMoveable = function (x, y, width, height, imgName, density, elasticity, friction)
    {
        console.log("ALE.Enemy.makeAsMovable()");
        var e = new enemy._Enemy(x, y, width, height, imgName, false, density, elasticity, friction, false);
        ALE.Level.current.attachChild(e.sprite);
        enemies.push(e);
        return e;
    }

    enemy.makeAsStationary = function (x, y, width, height, imgName, density, elasticity, friction)
    {
        console.log("ALE.Enemy.makeAsMovable()");
        var e = new enemy._Enemy(x, y, width, height, imgName, true, density, elasticity, friction, false);
        ALE.Level.current.attachChild(e.sprite);
        enemies.push(e);
        return e;
    }

    ; (function ()
    {
        var _Enemy = Class.design('ALE.Enemy._Enemy',
        {
            Extends: ALE.PhysicsSprite,
            // ===================
            // Constructor
            // ===================
            initialize: function (x, y, width, height, imgName, stationary, density, elasticity, friction, isBox)
            {
                _Enemy.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_ENEMY);
                // ===================
                // Instance Variables
                // ===================
                this.isStationary = false;
                this.onDefeatHeroText = null;
                this.reproductions = 0;
                this.reproduceDuration = 0;
                this.reproduceSpawn = 0;
                this.damage = 0;
                this.removeByCrawl = false;
                this.immuneToInvincibility = false;
                this.alwaysDoesDamage = false;
                this.chaseMultiplier = 0;
                this.mySubClass = 0;
                this.triggerID = 0;
                this.isTrigger = false;

                // ==================
                // Instantiation
                // ==================
                var bt = stationary ? ALE.PhysicsSprite.BODY_STATIC : ALE.PhysicsSprite.BODY_DYNAMIC;
                if (isBox)
                    this.setBoxPhysics(1.0, 0.3, 0.6, bt, false, true, true);
                else
                    this.setCirclePhysics(1.0, 0.3, 0.6, bt, false, true, true);

            },

            // ===================
            // Methods
            // ===================
            onCollide: function (other)
            {
                console.log("Enemy._Enemy.onCollide()");
            },

            setDefeatTrigger: function(id)
            {
                this.triggerID = id;
                this.isTrigger = true;
            },

            setSubClass: function (subClass)
            {
                this.mySubClass = subClass;
            },

            setDisappearOnTouch: function ()
            {
                this.disappearOnTouch = true;
                // TODO: Create touch listener
            },

            setChaseSpeed: function (speed)
            {
                this.chaseMultiplier = speed;
            },

            setResistInvincibility: function ()
            {
                this.immuneToInvincibility = true;
            },

            setImmuneToInvincibility: function ()
            {
                this.alwaysDoesDamage = true
            },

            setDefeatByCrawl: function ()
            {
                this.removeByCrawl = true;

                // make the enemy's physics body a sensor to prevent ricochets when the
                // hero defeats this
            },

            setDefeatHeroText: function (message)
            {
                this.onDefeatHeroText = message;
            },

            setDamage: function (amount)
            {
                this.damage = amount;
            },

            setReproductions: function(numReproductions, timeBetweenReproductions, reproductionsPerInterval)
            {
                // TODO: Fill out
            }

            //onCollideWithDestination: function (d)
            //{
            //    // only do something if the hero has enough goodies and there's
            //    // room in the destination
            //    var currentGoodieScore = ALE.Goodie.goodiescollected;
            //    if ((currentGoodieScore >= d._activationScore) && (d._holding < d._capacity))
            //    {
            //        // hide the hero, disable the hero's motion, and check if the
            //        // level is complete
            //        ALE.Destination.arrivals++;
            //        d._holding++;
            //        d.onArrive();
            //        this.sprite.body.SetActive(false);

            //        // vanish quietly, since we want the destination sound to play
            //        this.vanish(true);
            //        if ((ALE.Level.victoryType == ALE.Level.VICTORY.DESTINATION) &&
            //            (ALE.Destination.arrivals >= ALE.Level.victoryVal))
            //        {
            //            ALE.MenuManager.winLevel();
            //        }
            //    }
            //}
        })
    })();

})();