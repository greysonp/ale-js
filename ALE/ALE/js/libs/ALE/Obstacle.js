this.ALE = this.ALE || {};

(function (namespace)
{
    var obstacle = namespace.Obstacle = {};

    obstacle.onNewLevel = function ()
    {
        console.log("ALE.Obstacle.onNewLevel()");
    }

})(this.ALE);