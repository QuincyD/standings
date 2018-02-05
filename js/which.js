function showButtons() {

    var custom_btn = document.getElementById('custom_btn');

    var button_text = '<h3 class=\'line\'>Conferences: </h3>';

    button_text += '<button class=\'line\' onclick=';
    button_text +=  '\'showSiteConfs(); return false;\'';
    button_text +=  '>Site\'s</button>';

    button_text += '<button class=\'line\'  onclick=';
    button_text += '\'showUserConfs(); return false;\'';
    button_text += '>Customized<//button>';

    custom_btn.innerHTML = button_text;
}

function showSiteConfs() {

    document.getElementById('conferences').innerHTML = '';

    var new_standings = convertStandings(standings, site_confs)
    var conference_names = ['Central', 'North Atlantic', 'Pacific', 'Southeast'];

    var formatted_standings = formatStandings(new_standings);
    displayStandings(formatted_standings, conference_names, last_updated);

    return false;
}

function showUserConfs() {

    document.getElementById('conferences').innerHTML = '';

    var custom_confs = customizations['custom'];
    var conference_names = customizations['conferences'];

    var new_standings = convertStandings(standings, custom_confs);

    var formatted_standings = formatStandings(new_standings);
    displayStandings(formatted_standings, conference_names, last_updated);

    return false;
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

