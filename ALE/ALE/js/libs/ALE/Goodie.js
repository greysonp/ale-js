this.ALE = this.ALE || {};

(function ()
{
    ////////////////////////////////////////////
    var goodie = ALE.Goodie = {};
    ////////////////////////////////////////////

    goodie.goodiescollected = 0;

    goodie.onNewLevel = function ()
    {
        console.log("ALE.Goodie.onNewLevel()");
    }

    goodie.makeAsMoveable = function (x, y, width, height, imgName)
    {
        var g = new goodie._Goodie(x, y, width, height, imgName, false, 1.0, 0.3, 0.6, false);
        ALE.Level.current.attachChild(g.sprite);
        return g;
    };


    (function ()
    {
        var _Goodie = Class.design('ALE.Goodie._Goodie',
        {
            Extends: ALE.PhysicsSprite,
            // ===================
            // Constructor
            // ===================
            initialize: function (x, y, width, height, imgName, stationary, density, elasticity, friction, isBox)
            {
                _Goodie.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_GOODIE);
                // ===================
                // Instance Variables
                // ===================
                this.strengthBoost = 0;
                this.invincibilityDuration = 0;
                this.goodieValue = 0;


                // ===================
                // Instantiation
                // ===================
                var bt = stationary ? ALE.PhysicsSprite.BODY_STATIC : ALE.PhysicsSprite.BODY_DYNAMIC;
                if (isBox)
                    this.setBoxPhysics(density, elasticity, friction, bt, false, true, true);
                else
                    this.setCirclePhysics(density, elasticity, friction, bt, false, true, true);

                this.goodieValue = 1;

            }
        })
    })();
})();