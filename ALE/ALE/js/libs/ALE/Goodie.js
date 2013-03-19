this.ALE = this.ALE || {};

(function (namespace)
{
    var goodie = namespace.Goodie = {};

    goodie.goodiescollected = 0;

    goodie.onNewLevel = function ()
    {
        console.log("ALE.Goodie.onNewLevel()");
    }

})(this.ALE);