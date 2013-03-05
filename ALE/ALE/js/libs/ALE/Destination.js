this.ALE = this.ALE || {};

(function (namespace)
{
    var dest = namespace.Destination = {};

    dest.onNewLevel = function ()
    {
        console.log("ALE.Destination.onNewLevel()");
    }

    dest.makeAsStationary = function (x, y, width, height, imgName, capacity, activationScore)
    {
        console.log("ALE.Destination.makeAsStationary()");
        return new DestinationPrivate(x, y, width, height, imgName, capacity, activationScore);
    }

    function DestinationPrivate(x, y, width, height, imgName, capactiy, activationScore)
    {
        console.log("ALE.Destination.DestinationPrivate()");
    }

})(this.ALE);