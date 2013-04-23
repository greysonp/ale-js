this.ALE = this.ALE || {};

(function ()
{
    var popup = {};
    
    var id = '#popup-scene';
    var imgId = '#popup-scene img';

    var text = null;
    var duration = 0;
    var image = null;
    var imageX = 0;
    var imageY = 0;
    var touch = false;

    popup.showTextTimed = function (message, mduration, mred, mgreen, mblue, fontSize)
    {
        // Initialize optional parameters
        red = mred || 255;
        green = mgreen || 255;
        blue = mblue || 255;
        fontSize = fontSize || '2em';

        text = message;
        duration = mduration * 1000;
        $(id).css('font-size', fontSize);
        $(id).css('color', 'rgb(' + red + ',' + green + ',' + blue + ')');
    }

    popup.showTextAndWait = function (message, mred, mgreen, mblue, fontSize)
    {
        red = mred || 255;
        green = mgreen || 255;
        blue = mblue || 255;
        fontSize = fontSize || '2em';

        text = message;
        touch = true;
        $(id).css('font-size', fontSize);
        $(id).css('color', 'rgb(' + red + ',' + green + ',' + blue + ')');
    }

    popup.showImageTimed = function (imgName, mduration, x, y)
    {
        // Initialize optional parameters
        imageX = x || 0;
        imageY = y || 0;

        image = imgName;
        duration = mduration * 1000;
    }

    popup.run = function (callback)
    {
        // Pause the game
        ALE.pause();

        // If there's text, add it
        if (text)
            $(id).add('p').text(text);


        // If there's an image, add it
        if (image)
        {
            // Find the size ratio
            var ratio = window.screen.height / ALE.Level.getHeight();

            // Make the popup screen take up the appropriate size
            $(id).css('width', $('#canvas').width() + 'px').css('height', '100%');

            // Grab the image we added and adjust all of its properties (according to ratio)
            document.getElementById(id.substring(1)).appendChild(ALE.Media.getImage(image));
            $(imgId).css('width', $(imgId).width() * ratio + 'px')
                    .css('height', $(imgId).height() * ratio + 'px')
                    .css('position', 'absolute')
                    .css('left', imageX * ratio + 'px')
                    .css('top', imageY * ratio + 'px');

        }
        $(id).show();

        // Run the right routine based on the current properties
        if (touch)
            runTouch(callback);
        else
            runTime(callback);
    }

    function runTouch(callback)
    {
        // TODO: Listen for a touch event here
        $(document).bind("click", function (e)
        {
            $(this).unbind(e);
            reset();
            callback();
        });
    }

    function runTime(callback)
    {
        // Show the popup and set the timeout
        setTimeout(function ()
        {
            reset();
            callback();

        }, duration);
    }

    function reset()
    {
        // Reset all of our attributes
        $(id).hide();
        $(id).empty();
        $(id).css('width', 'auto').css('height', 'auto');
        text = null;
        duration = 0;
        image = null;
        touch = false;

        // Unpause the game
        ALE.resume();
    }

    ALE.PopUpScene = popup;

})();