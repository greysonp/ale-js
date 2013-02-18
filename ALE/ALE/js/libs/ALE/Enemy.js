this.ALE = this.ALE || {};

(function ()
{
    var enemy = namespace.Enemy = {};

    enemy.onNewLevel = function ()
    {
        console.log("ALE.Enemy.onNewLevel()");
    }

})(this.ALE);