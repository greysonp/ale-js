this.ALE = this.ALE || {};

(function ()
{
    var obstacle = ALE.Obstacle = {};

    obstacle.onNewLevel = function ()
    {
        console.log("ALE.Obstacle.onNewLevel()");
    }

    obstacle.drawBoundingBox = function (x0, y0, x1, y1, imgName, density, elasticity, friction)
    {
        var midX = (x0 + x1)/2;
        var midY = (y0 + y1)/2;

        // Bottom
        var b = new obstacle._Obstacle(midX, y1 - 1, x1, 1, imgName);
        b.setBoxPhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_STATIC);
        ALE.Level.current.attachChild(b.sprite);
        console.log("Bottom | width: " + b.width + "  height: " + b.height);

        // Top
        var t = new obstacle._Obstacle(midX, y0 + 1, x1, 1, imgName);
        t.setBoxPhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_STATIC);
        ALE.Level.current.attachChild(t.sprite);

        // Left
        var l = new obstacle._Obstacle(x0, midY, 1, y1, imgName);
        l.setBoxPhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_STATIC);
        ALE.Level.current.attachChild(l.sprite);

        // Right
        var r = new obstacle._Obstacle(x1 - 1, midY, 1, y1, imgName);
        r.setBoxPhysics(density, elasticity, friction, ALE.PhysicsSprite.BODY_STATIC);
        ALE.Level.current.attachChild(r.sprite);
    }

    ;(function ()
    {
        var _Obstacle = Class.design('ALE.Obstacle._Obstacle',
        {
            Extends: ALE.PhysicsSprite,

            initialize: function (x, y, width , height, imgName)
            {
                _Obstacle.Super.call(this, x, y, width, height, imgName, ALE.PhysicsSprite.TYPE_OBSTACLE);
                this.disappearAfterDefeatEnemy = false;
            }
        });


    })();

})();