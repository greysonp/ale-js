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
            // create our level: the playable area is a 460x320 box, and there
            // are no default forces on the hero
            ALE.Level.configure(460, 320, 0, 0);

            // in this level, we'll use tilt to move some things around. The
            // maximum force that tilt can exert on anything is 10 in the X
            // dimension, and 10 in the Y dimension
            ALE.Level.enableTilt(10, 10);

            // now let's create a hero, and indicate that the hero can move by
            // tilting the phone. Note that we don't bother giving the hero any
            // sort of physics yet
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();

            // finally, let's draw a destination and indicate that when one hero
            // reaches the destination, the level is won. Note that we don't
            // have any goodies, so the activation score should be zero!
            //ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Destination.makeAsStationary(40, 150, 10, 10, "mustardball.png", 1, 0);
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