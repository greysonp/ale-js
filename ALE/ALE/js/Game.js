this.ALE = this.ALE || {};
this.Game = this.Game || {};

(function (namespace)
{
    namespace.init = function ()
    {
        ALE.init();

        nameResources();

        // TODO: Shouldn't have to call this.
        configureLevel(1);
    }

    // =======================================
    // User Editable
    // =======================================

    function nameResources()
    {
        console.log("nameResources()");

        ALE.Media.registerImage("greenball.png");
        ALE.Media.registerImage("mustardball.png");
    }

    function configureLevel(whichLevel)
    {
        console.log("configureLevel()");

        if (whichLevel == 1)
        {
            // TODO: Allow stages of different widths
            // This doesn't affect the size at all
            ALE.Level.configure(460, 320, 0, 0);

            ALE.Level.enableTilt(10, 10);

            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();

            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);
        }
    }


})(this.Game);