this.ALE = this.ALE || {};
this.Game = this.Game || {};

(function ()
{
    Game.nameResources = function()
    {
        console.log("nameResources()");

        ALE.Media.registerImage("greenball.png");
        ALE.Media.registerImage("mustardball.png");
        ALE.Media.registerImage("red.png");
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
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);
        }
        else if (whichLevel == 2)
        {
            // start by setting everything up just like in level 1
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            // new: add a bounding box so the hero can't fall off the screen
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 0, 0, 0);

            // new: change the text that we display when the level is won
            ALE.Level.setWinText("Good job!");

            // new: add a pop-up message that shows for one second at the
            // beginning of the level
            //ALE.PopUpScene.showTextTimed("Reach the destination\nto win this level.", 1);
        }
        else if (whichLevel == 3) 
        {
            // start by setting up the level just like in level 1
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);

            // draw a hero, but this time change the physics
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 1, 0, 0.6);
            h.setMoveByTilting();

            // make a destination just like in level 1
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            // new: add a bounding box. Since the hero is inside this box, the
            // hero will never fall off the screen
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 1, .3, 1);

            // new: add a pop-up message that shows for one second at the
            // beginning of the level
            //ALE.PopUpScene.showTextTimed("Reach the destination\nto win this level.", 1);
        }
    }


})();