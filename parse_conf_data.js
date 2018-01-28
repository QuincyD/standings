
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

		var temp_arr = conf_obj['east'];
		standings_obj['east'] = [];
		console.log('EAST:');

		var count = 0
		for(var i = 0; i < temp_arr.length; i++){

			//teamId, win, loss, lastTenWin, lastTenLoss
			var team_obj = temp_arr[i];
			var team_id = team_obj['teamId'];

			if (team_id in teams_obj){

				var temp_obj = {};
				temp_obj['id'] = team_id;
				temp_obj['name'] = teams_obj[team_id];
				temp_obj['win'] = team_obj['win'];
				temp_obj['loss'] = team_obj['loss'];
				temp_obj['last_ten_win'] = team_obj['lastTenWin'];
				temp_obj['last_ten_loss'] = team_obj['lastTenLoss'];

				standings_obj['east'][count] = temp_obj;
				count++;
			}
		}
		console.log(standings_obj['east']);

		
		var west_arr = conf_obj['west'];
		standings_obj['west'] = [];
		console.log('WEST:');

		var count = 0
		for(var i = 0; i < temp_arr.length; i++){

			//teamId, win, loss, lastTenWin, lastTenLoss
			var team_obj = temp_arr[i];
			var team_id = team_obj['teamId'];

			if (team_id in teams_obj){

				var temp_obj = {};
				temp_obj['id'] = team_id;
				temp_obj['name'] = teams_obj[team_id];
				temp_obj['win'] = team_obj['win'];
				temp_obj['loss'] = team_obj['loss'];
				temp_obj['last_ten_win'] = team_obj['lastTenWin'];
				temp_obj['last_ten_loss'] = team_obj['lastTenLoss'];

				standings_obj['west'][count] = temp_obj;
				count++;
			}
		}
		console.log(standings_obj['west']);

	})).then(function() {
		console.log(teams_obj);
	});
});	


