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
        console.log("configureLevel(" + whichLevel + ")");

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
        else if (whichLevel == 2)
        {
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            //Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 0, 0, 0);

            //Level.setWinText("Good job!");

            //PopUpScene.showTextTimed("Reach the destination\ntowin this level.", 1);
        }
    }


})();