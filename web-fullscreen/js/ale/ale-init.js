$(document).ready(function()
{
    // Gives error if there's an issue
    $.ajaxSetup(
    {
        error: function(xhr, status, error)
        {
            console.log("An AJAX error occured: " + status + " | Error: " + error);
        }
    });

    // Load in the main menu to the div the user specificed
    // TODO: Report error if there is no #ale
    $('#ale').load('html/main_menu.html');
});