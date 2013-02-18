this.ALE = this.ALE || {};

(function ()
{
    var dest = namespace.Destination = {};

    dest.onNewLevel = function ()
    {
        console.log("ALE.Destination.onNewLevel()");
    }

})(this.ALE);