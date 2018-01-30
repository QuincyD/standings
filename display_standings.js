
function displayStanding(standings){

    var conferences = ['central', 'north_atlantic', 'pacific', 'southeast'];
    var last_updated = parseLastUpdated();

    for (var i = 0; i < conferences.length; i++){

        conf = conferences[i];
        conf_table = document.getElementById(conf);
        team_span = '4';
        name_span = '2';

        var table_head = '<tr>';
        table_head += '<th colspan="' + team_span + '">Team</th>';
        table_head += '<th>W</th>';
        table_head += '<th>L</th>';
        table_head += '<th>Win%</th>';
        table_head += '<th>GB</th>';
        table_head += '<th>L10</th>';
        table_head += '</tr>';

        conf_table.innerHTML = table_head;

        for (var j = 0; j < standings[conf].length; j++) {

            var team = standings[conf][j];

            if (j === 4){
                var table_row = '<tr class="top_border">';
            }
            else {
                var table_row = '<tr>';
            }
            table_row += '<td>' + (j+1) + '</td>';
            table_row += '<td><img src="logos/' +
                            team.team_id + '.png"></td>';
            table_row += '<td colspan="' + name_span +
                            '" class="team_name">' + team.name + '</td>';
            table_row += '<td>' + team.win + '</td>';
            table_row += '<td>' + team.loss + '</td>';
            table_row += '<td>' + team.win_percent.toFixed(3) + '</td>';
            table_row += '<td>' + team.games_behind + '</td>';
            table_row += '<td>' + team.last_ten_win + '-' +
                                    team.last_ten_loss + '</td>';
            table_row += '</tr>';
        
            conf_table.innerHTML += table_row;

        }

    }

    last_update = document.getElementById('last_updated');
    last_text = 'Last updated on ' + last_updated.date +
                    ' at ' + last_updated.time;
    last_update.innerHTML = last_text

    return;
}

teams_obj = parseTeams();
standings_obj = parseStandings(teams_obj);
new_confs = parseNewConfs();
new_standings = convertStandings(standings_obj, new_confs)
formatted_standings = formatStandings(new_standings);
console.log(formatted_standings);
displayStanding(formatted_standings);
