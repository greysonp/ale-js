this.ALE = this.ALE || {};
this.box2d = this.box2d || {};
this.createjs = this.createjs || {};

(function (namespace)
{
    namespace._camera = {};

    namespace.init = function ()
    {
        console.log("Hello, ALE!");
    }

    namespace.configAccelerometer = function (toggle)
    {
        console.log("ALE.configAccelerometer()");
    }


})(this.ALE);