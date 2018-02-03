temp_names = [];
temp_names[0] = 'Eastern';
temp_names[1] = 'Western';
temp_names[2] = 'Northern';
temp_names[3] = 'Southern';
temp_names[4] = 'North Eastern';
temp_names[5] = 'North Western';
temp_names[6] = 'South Eastern';
temp_names[7] = 'South Western';

colors = [];
colors[0] = {'color':'blue', 'back':'#ddf'};
colors[1] = {'color':'green', 'back':'#dfd'};
colors[2] = {'color':'red', 'back':'#fdd'};
colors[3] = {'color':'orange', 'back':'#fda'};
colors[4] = {'color':'purple', 'back':'#ecf'};
colors[5] = {'color':'yellow', 'back':'#ffd'};
colors[6] = {'color':'white', 'back':'#eee'};
colors[7] = {'color':'#444', 'back':'#ccc'};


teams = [];
$.ajax({

    url: 'teams.json',
    async: false,
    dataType: 'json',
    success: function(data){

	    var temp_arr = data['league']['standard'];

        var i;
        var temp_len = temp_arr.length;
	    for (var i = 0; i < temp_len; i++){

	    	var team = temp_arr[i];

	    	var name = team['fullName'];
	    	var in_NBA = team['isNBAFranchise'];
	    	var team_id = team['teamId'];

	    	if (in_NBA === true){

	    		teams.push({'name':name, 'team_id':team_id});

	    	}

	    	
	    }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('teams.json error code: ' + jqXHR.status);
    }

});


function newNums() {

    var nums = document.getElementById('conference_num');
    nums.innerHTML = '';

    var temp_text = '<p>Choose number of converences</p>';
    temp_text += '<form id=\'num_form\'>';

    for (var i = 2; i <= 8; i++) {
        temp_text += '<label><input id=\'' + i +
        '\' class=\'radio_btn\' type=\'radio\' onclick=showNumButton(' +
        i + ');return false;>' + i + '</label>';
    }

    temp_text += '</form>';
    
    nums.innerHTML += temp_text;

}

function restartCreate() {

    newNums();

    document.getElementById('conference_names').innerHTML = '';
    document.getElementById('conference_choices').innerHTML = '';
}

function showNumButton(num) {

    clicked_num = parseInt(num);

    if (document.getElementById('num_btn')) {
        return false;
    }
    
    document.getElementById('conference_num').innerHTML +=
    '<button id=\'num_btn\' onclick=\'nameConferences();return false;\'>OK!</button>';

    document.getElementById(num).checked = true;
}

function nameConferences() {
    
    document.getElementById('conference_num').innerHTML = ''; 

    var conferences = document.getElementById('conference_names');
    var temp_text = '<p>Name your conferences</p>';

    for (var i = 0; i < clicked_num; i++) {
        temp_text += '<input class=\'color_' + i + '\' ';
        temp_text += 'type=\'text\' name=\'conf_';
        temp_text += 'name\' value=\'' + temp_names[i];
        temp_text += '\'>&nbsp;Conference<br>'; 
    }
    temp_text += '<button onclick=\'chooseConferences();';
    temp_text += 'return false;\'>OK!!</button>';

    conferences.innerHTML = temp_text;
}

function chooseConferences() {

    var conf_names = document.getElementsByName('conf_name');

    given_names = [];

    var i;
    var conf_len = conf_names.length;
    for (i = 0; i < conf_len; i++) {
        given_names.push(conf_names[i].value);
    }
    given_names.sort();

    document.getElementById('conference_names').innerHTML = '';
    
    displayChoices();
}

function displayChoices() {

    conference_choices = document.getElementById('conference_choices');
    chosen = 0;

    var temp_text = '<p>Choose conference for each team</p><br>';

    var i;
    var teams_len = teams.length;
    for (i = 0; i < teams_len; i++) {

        var name = teams[i]['name'];
        var team_id = teams[i]['team_id'];

        temp_text += '<img src=\'../imgs/logos/' + team_id;
        temp_text += '.png\' class=\'line\'>';
        temp_text += '&nbsp;<p class=\'line\'>' + name + ': '; 
        temp_text += '<br>';

        temp_text += '<form class=\'choices\'>';

        var j;
        var given_len = given_names.length;
        for (j = 0; j < given_len; j++) {

            var name = given_names[j];

            temp_text += '<button class=\'color_' + j;
            temp_text += '\' onclick';
            temp_text += '=\'chooseConference(' + i + ', ' + j;
            temp_text += '); return false;\'>' + name + '</button>';

            if (j === 3 && 4 !== given_len) {
                temp_text += '<br>';
            }

        }
        
        temp_text += '</form></p><br>';
    }

    conference_choices.innerHTML = temp_text;
}

function chooseConference(team_num, conf_num) {

    if (teams[team_num].hasOwnProperty('conference')) {
        teams[team_num]['conference'] = conf_num;
        return false;
    }

    teams[team_num]['conference'] = conf_num;
    chosen += 1;
    console.log(chosen);

    if (chosen >= teams.length){
        conference_choices.innerHTML += 
            '<button onclick=\'return false;\'>OK!!!</button>';
    }
}

newNums();
