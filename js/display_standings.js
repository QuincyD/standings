colors = [];
colors[0] = {'color':'blue', 'back':'#ddf'};
colors[1] = {'color':'green', 'back':'#dfd'};
colors[2] = {'color':'red', 'back':'#fdd'};
colors[3] = {'color':'orange', 'back':'#fda'};
colors[4] = {'color':'purple', 'back':'#ecf'};
colors[5] = {'color':'yellow', 'back':'#ffd'};
colors[6] = {'color':'white', 'back':'#eee'};
colors[7] = {'color':'#444', 'back':'#ccc'};


function displayStanding(standings){

    var last_updated = parseLastUpdated();
    var sorted_confs = [];
    for (var conf in standings) {
        sorted_confs.push(conf); 
    }
    sorted_confs.sort();

    var k = 0;
    for (var i = 0; i < sorted_confs.length; i++){

        conferences = document.getElementById('conferences');

        conf = sorted_confs[i];
        var conf_name = conf.charAt(0).toUpperCase() + conf.slice(1);

        var table = '<h2 id=\'' + conf +
                '_title\' class=\'conf_title\'>' +
                conf_name + ' Conference</h2>';
        table += '<table id=\'' + conf + '\'></table>';

        conferences.innerHTML += table;

        // Addition of table colors ----------------------------
        var conf_colors = document.getElementById('conf_colors');

        var title_color = '#' + conf + '_title {';
        title_color += 'background-color: ' + colors[k]['color'] +
                        ';';
        title_color += '}';

        var table_colors = '#' + conf + ', #' + conf + ' th {';
        table_colors += 'background-color: ' + colors[k]['back'] +
                        ';';
        table_colors += 'border: 3px solid ' + colors[k]['color'] +
                        ';';
        table_colors += 'border-top: none;';
        table_colors += '}';
        k++;

        if (k >= colors.length) {
            k = 0;
        }

        conf_colors.innerHTML += title_color;
        conf_colors.innerHTML += table_colors;
        //~Addition of table colors ---------------------------

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
            table_row += '<td><img src="imgs/logos/' +
                            team.team_id + '.png"></td>';
            table_row += '<td colspan="' + name_span +
                            '" class="team_name">' + team.name + '</td>';
            table_row += '<td>' + team.win + '</td>';
            table_row += '<td>' + team.loss + '</td>';
            table_row += '<td>' + team.win_percent.toFixed(4) + '</td>';
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
displayStanding(formatted_standings);
