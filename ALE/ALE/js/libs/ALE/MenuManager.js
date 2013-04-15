this.ALE = this.ALE || {};

(function ()
{
    var mm = {};

    var _currLevel = 1;

    function init()
    {
        $('#level-holder').height($(window).height() - $('h1').height() - 50);

        for (var i = 1; i <= ALE.Configuration.getNumLevels() ; i++)
        {
            if (i <= getUnlocked())
            {
                $('#level-holder').append('<div class="level-box"><div class="level-box-inner">' +
                                           i + '</div></div>');
            }
            else
            {
                $('#level-holder').append('<div class="level-box locked"><div class="level-box-inner">' +
                                           i + '</div></div>');
            }
        }

        // Add a listener so we load the level we click if it's unlocked
        $('.level-box').click(function (e)
        {
            (function (lockedText)
            {
                if (lockedText <= getUnlocked())
                {
                    $('#content').load('game.html', function ()
                    {
                        _currLevel = lockedText;
                        ALE.setup(lockedText);
                    });
                }
            })($(this).text());
        });
    }

    function saveUnlocked(value)
    {
        window.localStorage['unlocked'] = value;
    }

    function getUnlocked()
    {
        var unlocked = parseInt(window.localStorage['unlocked']);
        return (unlocked || 1);
    }

    function unlockLevel()
    {
        saveUnlocked(getUnlocked() + 1);
    }

    function resetUnlocked()
    {
        saveUnlocked(0);
    }

    mm.winLevel = function ()
    {
        // Stop the action
        createjs.Ticker.removeEventListener("tick", ALE);

        // prompt to go to next level
        $('#content').empty();
        $('#content').append('<div class="content-center"><h1><a>Next Level</a></h1></div>');
        $('h1').click(function (e)
        {
            $('#content').load('game.html', function ()
            {
                ALE.setup(++_currLevel);
            });
        });

        // If we just beat the newest level, we need to unlock the next level
        if (_currLevel == getUnlocked())
            unlockLevel();

    }

    // We can initialize the MenuManager right away
    init();
    ALE.MenuManager = mm;
})();
