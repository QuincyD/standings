/*
    REQUIRES:

    EFFECTS:
*/
function showButtons() {

    var custom_btn = document.getElementById('custom_btn');
    var btn_text = '';

    btn_text += '<h3 class=\'line\'>Customized Conferences:</h3>';
    btn_text += '<label class=\'switch\'>';
    btn_text += '<input type=\'checkbox\' checked>';
    btn_text += '<span class=\'slider\' onclick=\'toggleConferences()\'><span>';
    btn_text += '</label>';


    custom_btn.innerHTML = btn_text;
}

/*
    REQUIRES:   The calling page's DOM has an element with
                id='conferences'. Global variables standings,
                site_confs, and last_updated are defined
                somewhere.

    EFFECTS:    Displays the conference standings that are
                original to convertnba site and sets
                showing customized to false
*/
function showSiteConfs() {

    document.getElementById('conferences').innerHTML = '';
    showing_customized = false;

    var new_standings = convertStandings(standings, site_confs)
    var conference_names = ['Central', 'North Atlantic', 'Pacific', 'Southeast'];

    var formatted_standings = formatStandings(new_standings);
    displayStandings(formatted_standings, conference_names, last_updated);

    return false;
}

/*
    REQUIRES:   The calling page's DOM has an element with
                id='conferences'. Global variables standings,
                customizations, and last_updated are defined
                somewhere.

    EFFECTS:    Displays the conference standings that have 
                been created by the user and sets
                showing_customized to true 
*/
function showUserConfs() {

    document.getElementById('conferences').innerHTML = '';
    showing_customized = true;

    var custom_confs = customizations['custom'];
    var conference_names = customizations['conferences'];

    var new_standings = convertStandings(standings, custom_confs);

    var formatted_standings = formatStandings(new_standings);
    displayStandings(formatted_standings, conference_names, last_updated);

    return false;
}

/*
    REQUIRES:   showing_customized is a global boolean defined
                somewhere

    EFFECTS:    Toggles the conferences being showed between
                the site's original conferences and the user's
                customized conferences.
*/
function toggleConferences() {
    if (showing_customized === true) {
        showSiteConfs();
    }
    else {
        showUserConfs();
    }
}


teams = parseTeams();
standings = parseStandings(teams);
site_confs = parseNewConfs();
last_updated = parseLastUpdated();

customizations = Cookies.getJSON('customizations');
if (customizations) {
    showButtons();
    showUserConfs();    
}
else {
    showSiteConfs();
}

