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
        ALE.Media.registerImage("msg1.png");
        ALE.Media.registerImage("redball.png");

        ALE.Media.registerSound("hipitch.mp3");
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
            ALE.Destination.makeAsStationary(40, 150, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            // new: add a bounding box so the hero can't fall off the screen
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 0, 0, 0);

            // new: change the text that we display when the level is won
            ALE.Level.setWinText("Good job!");

            // new: add a pop-up message that shows for one second at the
            // beginning of the level
            ALE.PopUpScene.showTextTimed("Reach the destination\nto win this level.", 2);
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
            ALE.PopUpScene.showTextTimed("Reach the destination\nto win this level.", 2);
        }

        else if (whichLevel == 4) 
        {
            // start by setting up the level just like in level 3
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);

            // draw a bounding box with physics, just like in level 3
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 1, .3, 1);

            // now let's draw two heroes who can both move by tilting
            var h1 = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 1, 0, 0.6);
            h1.setMoveByTilting();
            var h2 = ALE.Hero.makeAsMoveable(140, 70, 30, 30, "greenball.png", 1, 0, 0.6);
            h2.setMoveByTilting();

            // now let's make a destination, but indicate that it can hold TWO
            // heroes
            var d = ALE.Destination.makeAsStationary(40, 150, 10, 10, "mustardball.png", 2, 0);
            // let's also say that whenever a hero reaches the destination, a
            // sound will play
            d.setArrivalSound("hipitch.mp3");
            // and now let's say that two heroes have to reach the destination
            // in order to win
            ALE.Level.setVictoryDestination(2);

            // Tell the user what's different in this level
            ALE.PopUpScene.showTextTimed("All heroes must\nreach the destination", 3);
        }
        
        else if (whichLevel == 5) 
        {
            // begin by configuring the level and heroes just like in level 4
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 1, .3, 1);
            var h1 = ALE.Hero.makeAsMoveable(40, 150, 30, 30, "greenball.png", 1, 0, 0.6);
            h1.setMoveByTilting();
            var h2 = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 1, 0, 0.6);
            h2.setMoveByTilting();

            // notice that now we will make two destinations, each of which can
            // only hold ONE hero
            ALE.Destination.makeAsStationary(40, 200, 10, 10, "mustardball.png", 1, 0);
            ALE.Destination.makeAsStationary(140, 200, 10, 10, "mustardball.png", 1, 0);

            // Let's show msg1.png instead of text. Note that we had to register
            // in registerMedia()
            ALE.PopUpScene.showImageTimed("msg1.png", 3, 10, 10);

            ALE.Level.setVictoryDestination(2);
        }

        else if (whichLevel == 6) 
        {
            // configure a basic level, just like the start of level 2:
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 1, .3, 1);
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            // change the behavior or tilt
            ALE.Level.setTiltAsVelocity(true);

            // and print a popup to tell the user what's going on...
            ALE.PopUpScene.showTextTimed("A different way\nto use tilt.", 1);
        }

        else if (whichLevel == 7) 
        {
            // configure a basic level, just like the start of level 2:
            ALE.Level.configure(460, 320, 0, 0);
            ALE.Level.enableTilt(10, 10);
            ALE.Obstacle.drawBoundingBox(0, 0, 460, 320, "red.png", 1, .3, 1);
            var h = ALE.Hero.makeAsMoveable(40, 70, 30, 30, "greenball.png", 0, 0, 0);
            h.setMoveByTilting();
            ALE.Destination.makeAsStationary(290, 60, 10, 10, "mustardball.png", 1, 0);
            ALE.Level.setVictoryDestination(1);

            // draw an enemy:
            ALE.Enemy.makeAsStationary(40, 250, 20, 20, "redball.png", 1.0, 0.3, 0.6);

            // display a message that stays until it is pressed
            ALE.PopUpScene.showTextAndWait("Avoid the enemy and\nreach the destination");
        }
    }


})();