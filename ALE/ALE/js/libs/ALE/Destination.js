this.ALE = this.ALE || {};

(function ()
{
    var dest = ALE.Destination = {};
    var destinations = new Array();

    dest.arrivals = 0;

    dest.onNewLevel = function ()
    {
        dest.arrivals = 0;
        destinations = new Array();
    }

    dest.makeAsStationary = function (x, y, width, height, imgName, capacity, activationScore)
    {
        console.log("ALE.Destination.makeAsStationary()");
        var d = new dest._Destination(x, y, width, height, imgName, capacity, activationScore, true, true);
        ALE.Level.current.attachChild(d.sprite);
        destinations.push(d);
        return d;
    }

    ;(function (namespace)
    {
        var _Destination = Class.design('ALE.Destination._Destination',
        {
            Extends: ALE.PhysicsSprite,

            // ===================
            // Constructor
            // ===================
            initialize: function (x, y, width, height, imgName, capacity, activationScore, isStatic, isCircle)
            {
                _Destination.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_DESTINATION);
                // ===================
                // Instance Variables
                // ===================
                this._capacity = 0;
                this._activationScore = 0;
                this._holding = 0;
                this.arrivalSound = null;

                // ==================
                // Instantiation
                // ==================
                this._capacity = capacity;
                this._activationScore = activationScore;

                var bt = isStatic ? ALE.PhysicsSprite.BODY_STATIC : ALE.PhysicsSprite.BODY_DYNAMIC;
                if (isCircle)
                    this.setCirclePhysics(1.0, 0.3, 0.6, bt, false, true, true);
                else
                    this.setBoxPhysics(1.0, 0.3, 0.6, bt, false, true, true);
            },

            // ===================
            // Methods
            // ===================
            onArrive: function ()
            {
                console.log("ALE.Destination._Destination.onArrive()");
                if (this.arrivalSound != null)
                    createjs.Sound.play(this.arrivalSound);

                if (this._holding >= this._capacity)
                {
                    console.log("CAPACITY");
                    this.sprite.body.SetActive(false);
                }
            },

            setArrivalSound: function (soundName)
            {
                this.arrivalSound = soundName;
            },
        })
    })();
})();