this.ALE = this.ALE || {};

(function (namespace)
{
    var goodie = namespace.Goodie = {};

    goodie.onNewLevel = function ()
    {
        console.log("ALE.Goodie.onNewLevel()");
    }

})(this.ALE);