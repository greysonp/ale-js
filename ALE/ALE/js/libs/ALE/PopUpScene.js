this.ALE = this.ALE || {};

(function ()
{
    var popup = {};
    
    popup.id = '#popup-scene';

    popup.text = null;
    popup.duration = 0;
    popup.image = null;
    popup.touch = false;

    popup.showTextTimed = function (message, duration, red, green, blue, fontSize)
    {
        // Initialize optional parameters
        red = red || 255;
        green = green || 255;
        blue = blue || 255;
        fontSize = fontSize || '2em';

        popup.text = message;
        popup.duration = duration * 1000;
        $(popup.id).css('font-size', fontSize);
    }

    popup.run = function (callback)
    {
        // If there's text, add it
        if (popup.text)
            $(popup.id).add('p').text(popup.text);

        // If there's an image, add it
        if (popup.image)
            $(popup.id).add('img').attr('src', popup.image);

        // Run the right routine based on the current properties
        if (popup.touch)
            runTouch(callback);
        else
            runTime(callback);
    }

    function runTouch(callback)
    {
        // TODO: Listen for a touch event here
        callback();
    }

    function runTime(callback)
    {
        // Show the popup and set the timeout
        $(popup.id).show();
        setTimeout(function ()
        {
            reset();
            callback();

        }, popup.duration);
    }

    function reset()
    {
        console.log("RESETTTTT");
        // Reset all of our attributes
        $(popup.id).hide();
        $(popup.id).empty();
        popup.text = null;
        popup.duration = 0;
        popup.image = null;
        popup.touch = false;
    }

    ALE.PopUpScene = popup;

})();