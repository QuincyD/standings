/*
    REQUIRES:   json/standings.json is the teams.json
                file saved by python/get_standings.py

    EFFECTS:    Returns a teams object of teams' team_ids
                mapped to their respective full_names where 
                isNBAFranchise was true.
                
*/
function parseTeams(){

    var teams_obj = {};
    
    $.ajax({

        url: 'json/teams.json',
        async: false,
        dataType: 'json',
        success: function(teams_json){
    
    	    var temp_arr = teams_json['league']['standard'];
    
    	    var count = 0;
    	    for (var i = 0; i < temp_arr.length; i++){
    
    	    	var team_obj = temp_arr[i];
    
    	    	var full_name = team_obj['fullName'];
    	    	var in_NBA = team_obj['isNBAFranchise'];
    	    	var team_id = team_obj['teamId'];
    
    	    	if (in_NBA === true){
    
    	    		teams_obj[team_id] = full_name;
    
    	    	}
    
    	    	
    	    }
        }

    });

    return teams_obj;

}

/*
    REQUIRES:   json/standings.json is the standings.json
                file saved by python/get_standings.py, and
                teams_obj is an object that can map a team's
                team_id to its full team name for all teams
                to be included in the standings.

    EFFECTS:    Returns a standings object that maps the
                east and west conferences to an array
                containing team objects that have full name
                (name), total amount of wins (win), total
                losses (loss), win percentage (win_percent),
                amount of wins in last ten games
                (last_ten_win), and the amount of losses in
                last ten games (last_ten_loss) for each
                respective team. 
                
*/
function parseStandings(teams_obj){

    var standings_obj = {};

	$.ajax({
        url: 'json/standings.json',
        async: false,
        dataType: 'json',
        success: function(standings_json){

		    var conf_obj =
                    standings_json['league']['standard']['conference'];

            var conferences = ['east', 'west'];

            for (var i = 0; i < conferences.length; i++) {

                conf = conferences[i];

		        var temp_arr = conf_obj[conf];
		        standings_obj[conf] = [];

		        var count = 0
		        for(var j = 0; j < temp_arr.length; j++){

		        	var team_obj = temp_arr[j];
		        	var team_id = team_obj['teamId'];

		        	if (teams_obj.hasOwnProperty(team_id)){

		        		var temp_obj = {};
		        		temp_obj['name'] = teams_obj[team_id];
		        		temp_obj['team_id'] = team_id;

		        		temp_obj['win'] = team_obj['win'];
                        var wins = parseInt(temp_obj['win']);

		        		temp_obj['loss'] = team_obj['loss'];
                        var losses = parseInt(temp_obj['loss']);

                        temp_obj['win_percent'] = 
                                    wins/parseFloat(wins+losses);
                        
		        		temp_obj['last_ten_win'] = 
                                    team_obj['lastTenWin'];
		        		temp_obj['last_ten_loss'] = 
                                    team_obj['lastTenLoss'];

		        		standings_obj[conf][count] = temp_obj;
		        		count++;
		        	}
		        }
            }
        }
    });

    return standings_obj;

}

/*
    REQUIRES:   json/new_confs.json is the new_confs.json
                file saved by python/get_standings.py

    EFFECTS:    Returns an object that maps team_id's to
                their conference. Each conference is
                a number char of the index of the 
                conferences place in an alphabetical list
                of all conference names.
*/
function parseNewConfs() {

    var new_confs;

    $.ajax({
        url: 'json/new_confs.json',
        async: false,
        dataType: 'json',
        success: function(data) {
            new_confs = data; 
        }
    });

    return new_confs;

}

/*
    REQUIRES:   json/last_updated.json is the last_updated.json
                file saved by python/get_standings.py

    EFFECTS:    Returns a string that represents the last time
                python/get_standings.py was run to update the
                standings.
*/
function parseLastUpdated(){

    var last_updated;
    
    $.ajax({

        url: 'json/last_updated.json',
        async: false,
        dataType: 'json',
        success: function(data){
    
    	    last_updated = data;
        }
    });

    return last_updated;

}
