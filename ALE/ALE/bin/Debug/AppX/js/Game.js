this.ALE = this.ALE || {};
this.Game = this.Game || {};

(function (namespace)
{
    namespace.init = function ()
    {
        ALE.init();
        console.log("Hello, Game!");

        nameResources();
    }

    // =======================================
    // User Editable
    // =======================================

    function nameResources()
    {
        console.log("nameResources()");
    }

    function configureLevel(which)
    {
        console.log("configureLevel()");
    }


})(this.Game);