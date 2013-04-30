this.ALE = this.ALE || {};

(function ()
{
    

    var routeObj = Class.design('ALE.Route',
    {
        // ===================
        // Constructor
        // ===================
        initialize: function (numberOfPoints)
        {
            // ===================
            // Instance Variables
            // ===================
            this.numberOfPoints = 0;
            this.points = new Array();
            this.index = 0;
            this.duration = 0;
            this.tweenTime = 0;
            this.target = null;
            this.rep = new createjs.Point(0, 0);

            // ==================
            // Instantiation
            // ==================
            this.numberOfPoints = numberOfPoints;
        },

        to: function (x, y)
        {
            this.points.push(new createjs.Point(x / box2d.SCALE, y / box2d.SCALE));
            return this;
        },

        setTarget: function (target)
        {
            this.target = target;
        },

        setDuration: function(duration)
        {
            this.duration = duration;
        },

        run: function ()
        {
            if (this.points.length > 0)
            {
                this.numberOfPoints = Math.min(this.numberOfPoints, this.points.length);
                this.tweenTime = this.duration / (this.numberOfPoints - 1);

                var t = this;
                this.rep.x = this.points[0].x;
                this.rep.y = this.points[0].y;
                this.target.SetPosition(new box2d.b2Vec2(this.rep.x, this.rep.y));
                this.index++;

                var tween = createjs.Tween.get(this.rep, { paused: ALE.isPaused() }).to({ x: this.points[this.index].x, y: this.points[this.index].y }, this.tweenTime);
                tween.addEventListener("change", function () { t.onUpdate(t); });
                tween.call(function () { t.onComplete(t); });
            }
        },

        onUpdate: function (t)
        {
            console.log("onUpdate| x: " + t.rep.x + "  y: " + t.rep.y);
            t.target.SetPosition(new box2d.b2Vec2(t.rep.x, t.rep.y));
        },

        onComplete: function (t)
        {
            console.log("onComplete: " + t.numberOfPoints + " " + t.index);

            t.index++;
            if (t.index >= t.numberOfPoints)
            {
                t.index = 0;
                t.rep.x = t.points[0].x;
                t.rep.y = t.points[0].y;
                t.target.SetPosition(new box2d.b2Vec2(t.rep.x, t.rep.y));
                console.log(">=");
                t.index++;
            }

            var tween = createjs.Tween.get(t.rep, { paused: ALE.isPaused() }).to({ x: t.points[t.index].x, y: t.points[t.index].y }, t.tweenTime);
            tween.addEventListener("change", function () { t.onUpdate(t); });
            tween.call(function () { t.onComplete(t); });
        }
    });

})();