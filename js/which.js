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

function showSiteConfs() {

    document.getElementById('conferences').innerHTML = '';
    showing_customized = false;

    var new_standings = convertStandings(standings, site_confs)
    var conference_names = ['Central', 'North Atlantic', 'Pacific', 'Southeast'];

    var formatted_standings = formatStandings(new_standings);
    displayStandings(formatted_standings, conference_names, last_updated);

    return false;
}

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

