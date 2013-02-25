this.ALE = this.ALE || {};

(function (namespace)
{
    var dest = namespace.Destination = {};

    dest.onNewLevel = function ()
    {
        console.log("ALE.Destination.onNewLevel()");
    }

})(this.ALE);