this.ALE = this.ALE || {};

(function (namespace)
{
    var dest = namespace.Destination = {};
    var destinations = new Array();

    dest.arrivals = 0;

    dest.onNewLevel = function ()
    {
        console.log("ALE.Destination.onNewLevel()");
    }

    dest.makeAsStationary = function (x, y, width, height, imgName, capacity, activationScore)
    {
        console.log("ALE.Destination.makeAsStationary()");
        var d = new dest.DestinationPrivate(x, y, width, height, imgName, capacity, activationScore);
        d.setCirclePhysics(1, 0, 0, ALE.PhysicsSprite.BODY_STATIC);
        namespace.Level.current.attachChild(d.sprite);
        destinations.push(d);
        return d;
    };

    //(function (namespace)
    //{
    //    // ===================
    //    // Constructor
    //    // ===================
    //    namespace.DestinationPrivate = function (x, y, width, height, imgName, capacity, activationScore)
    //    {
    //        this.init(x, y, width, height, imgName, capacity, activationScore);
    //    }
    //    var p = namespace.DestinationPrivate.prototype = new ALE.PhysicsSprite();

    //    // ===================
    //    // Fields
    //    // ===================
    //    p._capacity = 0;
    //    p._activationScore = 0;
    //    p._holding = 0;

    //    // ===================
    //    // Methods
    //    // ===================
    //    p.PhysicsSprite_init = p.init;
    //    p.init = function (x, y, width, height, imgName, capacity, activationScore)
    //    {
    //        p.PhysicsSprite_init.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_DESTINATION);
    //        p.capacity = capacity;
    //        p._activationScore = activationScore;
    //    }

    //    p.onArrive = function ()
    //    {
    //        console.log("ALE.Destination.DestinationPrivate.onArrive()");
    //    }

    //})(namespace.Destination);

})(this.ALE);