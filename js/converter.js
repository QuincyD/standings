function convertStandings(standings_obj, new_confs){

    var new_standings = {};

    var conferences = ['east', 'west'];
    for (var i = 0; i < conferences.length; i++){

        var conf = conferences[i];
        for (var j = 0; j < standings_obj[conf].length; j++){

            var team_obj = standings_obj[conf][j];
            var team_id = team_obj['team_id'];
            var new_conf = new_confs[team_id];

            if (new_standings.hasOwnProperty(new_conf) === false) {
                new_standings[new_conf] = [];
            }

            new_standings[new_conf].push(team_obj);

        }

    }

    return new_standings;
}

function comparison(team1, team2) {

    if(team1.win_percent < team2.win_percent){
        return 1;
    }

    if(team1.win_percent > team2.win_percent){
        return -1;
    }

    return 0;
}

function formatStandings(standings) {

    var formatted = standings;

    for (var conf in standings) {

        formatted[conf].sort(comparison);

        var top_team = formatted[conf][0];

        for (var j = 0; j < formatted[conf].length; j++) {

            var other_team = formatted[conf][j];

            var top_win = parseInt(top_team['win']);
            var top_loss = parseInt(top_team['loss']);

            var other_win = parseInt(other_team['win']);
            var other_loss = parseInt(other_team['loss']);

            var games_behind = ((top_win - other_win) +
                                (other_loss - top_loss))/parseFloat(2);

            formatted[conf][j]['games_behind'] = games_behind;

        }

    }

    return formatted;
}

