this.ALE = this.ALE || {};

(function ()
{
    var config = {};

    var obj = {};
    $.get("js/manifest.json", function (data)
    {
        obj = eval('(' + data + ')');
    });

    config.getCameraHeight = function ()
    {
        return obj.game_camera_height;
    }

    config.getCameraWidth = function ()
    {
        return obj.game_camera_width;
    }

    config.getCameraOrientation = function ()
    {
        return obj.game_orientation;
    }

    config.getNumLevels = function ()
    {
        return obj.game_levels;
    }

    config.getHelpScenes = function ()
    {
        return obj.game_help_scenes;
    }

    config.getTitle = function ()
    {
        return obj.game_title;
    }

    config.getPlayButtonText = function ()
    {
        return obj.play_button_text;
    }

    config.getHelpButtonText = function ()
    {
        return obj.help_button_text;
    }

    config.getQuitButtonText = function ()
    {
        return obj.quit_button_text;
    }

    config.getSplashBackground = function ()
    {
        return "assets/" + obj.main_screen_background;
    }

    config.isDeveloperOverride = function ()
    {
        return obj.developer_unlock;
    }

    config.isVibrationOn = function ()
    {
        return obj.enable_vibration;
    }

    ALE.Configuration = config;

})();