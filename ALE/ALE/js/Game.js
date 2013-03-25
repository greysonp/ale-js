this.ALE = this.ALE || {};
this.Game = this.Game || {};

(function ()
{
    Game.nameResources = function()
    {
        console.log("nameResources()");

        ALE.Media.registerImage("greenball.png");
        ALE.Media.registerImage("mustardball.png");
    }

    Game.configureLevel = function(whichLevel)
    {
        console.log("configureLevel()");

        if (whichLevel == 1)
        {
            // TODO: Allow stages of different widths
            // This doesn't affect the size at all
            ALE.Level.configure(460, 320, 0, 0);

            ALE.Level.enableTilt(10, 10);

            var h = ALE.Hero.makeAsMoveable(200, 200, 152, 152, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();

           ALE.Destination.makeAsStationary(200, 500, 152, 152, "mustardball.png", 1, 0);
           ALE.Level.setVictoryDestination(1);
        }
    }


})();