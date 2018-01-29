
function displayStanding(standings){

    var conferences = ['central', 'north_atlantic', 'pacific', 'southeast'];

    for (var i = 0; i < conferences.length; i++){

        conf = conferences[i];
        conf_table = document.getElementById(conf);

        table_head = '<tr>';
        table_head += '<th>Team</th>';
        table_head += '<th>Win</th>';
        table_head += '<th>Loss</th>';
        table_head += '<th>Games Behind</th>';
        table_head += '<th>Last Ten</th>';
        table_head += '</tr>';

        conf_table.innerHTML = table_head;
        
    }

    return;
}

teams_obj = parseTeams();
standings_obj = parseStandings(teams_obj);
new_confs = parseNewConfs();
new_standings = convertStandings(standings_obj, new_confs)
formatted_standings = formatStandings(new_standings);
console.log(formatted_standings);
displayStanding(formatted_standings);
