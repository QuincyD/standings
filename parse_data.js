function parseTeams(){

    var teams_obj = {};
    
    $.ajax({

        url: 'teams.json',
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

function parseStandings(teams_obj){

    var standings_obj = {};

	$.ajax({
        url: 'standings.json',
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

function parseNewConfs() {

    var new_confs;

    $.ajax({
        url: 'new_confs.json',
        async: false,
        dataType: 'json',
        success: function(data) {
            new_confs = data; 
        }
    });

    return new_confs;

}

/*
teams_obj = {};
standings_obj = {};

$.when($.getJSON('teams.json', function(teams_json){

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
})).then(function() {

	$.when($.getJSON('standings.json', function(standings_json){

		var conf_obj = standings_json['league']['standard']['conference'];
        var conferences = ['east', 'west'];

        for (var i = 0; i < conferences.length; i++) {

            conf = conferences[i];

		    var temp_arr = conf_obj[conf];
		    standings_obj[conf] = [];

		    var count = 0
		    for(var j = 0; j < temp_arr.length; j++){

		    	var team_obj = temp_arr[j];
		    	var team_id = team_obj['teamId'];

		    	if (team_id in teams_obj){

		    		var temp_obj = {};
		    		temp_obj['name'] = teams_obj[team_id];
		    		temp_obj['id'] = team_id;

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

	})).then(function() {
        convertStandings();
        displayStandings();
	});
});	
*/


