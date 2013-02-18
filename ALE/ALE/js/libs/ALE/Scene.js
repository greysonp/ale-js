﻿this.ALE = this.ALE || {};
this.box2d = this.box2d || {};

(function (namespace)
{
    namespace.Scene = function ()
    {
        init();
    }
    var p = namespace.Scene.prototype;
    // ===================================
    
    var container = {};

    function init()
    {
        container = new createjs.Container();
    }

    p.attachChild = function (child)
    {
        container.addChild(child);
    }

})(this.ALE);