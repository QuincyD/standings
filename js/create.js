temp_names = [];
temp_names[0] = 'Sky';
temp_names[1] = 'Forest';
temp_names[2] = 'Volcano';
temp_names[3] = 'Equator';
temp_names[4] = 'Wild';
temp_names[5] = 'Sun';
temp_names[6] = 'Artic';
temp_names[7] = 'Shadow';

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

	    for (var i = 0; i < temp_arr.length; i++){

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

    nums.innerHTML = '<p>Choose number of converences</p>';
    nums.innerHTML += '<form id=\'num_form\' class=\'line\'>';
    nums.innerHTML += '<input id=\'2\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(2); return false;>2';
    nums.innerHTML += '<input id=\'3\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(3); return false;>3';
    nums.innerHTML += '<input id=\'4\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(4); return false;>4';
    nums.innerHTML += '<input id=\'5\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(5); return false;>5';
    nums.innerHTML += '<input id=\'6\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(6); return false;>6';
    nums.innerHTML += '<input id=\'7\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(7); return false;>7';
    nums.innerHTML += '<input id=\'8\' class=\'radio_btn\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(8); return false;>8';
    nums.innerHTML += '</form>';

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
    '<button id=\'num_btn\' class=\'line\' onclick=\'nameConferences();return false;\'>OK!</button>';

    document.getElementById(num).checked = true;
}

function nameConferences() {
    
    document.getElementById('conference_num').innerHTML = ''; 

    conferences = document.getElementById('conference_names');
    conferences.innerHTML = '<p>Name your conferences</p>';

    for (var i = 0; i < clicked_num; i++) {
        var conf = '<input class=\'color_' + i + '\' type=\'text\' id=\'conf_' +
                    i + '_name\' value=\'' + temp_names[i] +
                    '\'>&nbsp;Conference<br>'; 
        conferences.innerHTML += conf;
    }
    conferences.innerHTML +=
    '<button onclick=\'chooseConferences();return false;\'>OK!!</button>';
}

function chooseConferences() {

    given_names = [];
    var count = 0;
    while(conference_name =
            document.getElementById('conf_' + count + '_name')) {

        given_names.push(conference_name.value);
        count++;
    }

    document.getElementById('conference_names').innerHTML = '';
    
    displayChoices();

}

function displayChoices() {

    conference_choices = document.getElementById('conference_choices');
    chosen = 0;

    for (var i = 0; i < teams.length; i++) {

        var name = teams[i]['name'];
        var team_id = teams[i]['team_id'];

        conference_choices.innerHTML += '<img src=\'../imgs/logos/' +
                                        team_id + '.png\' class=\'line\'>';
        conference_choices.innerHTML += '&nbsp;<p class=\'line\'>' + name + ': '; 
        conference_choices.innerHTML += '<br>';

        conference_choices.innerHTML += '<form class=\'choices\'>';
        for (var j = 0; j < given_names.length; j++) {

            var name = given_names[j];

            conference_choices.innerHTML +=
                '<input class=\'color_' + j + '\' class=\'radio_btns\' type=\'radio\' onclick=\'$(this).attr("checked", true); chooseConference(' + i + ', ' + j + '); return false;\'>' + name;

        }
        conference_choices.innerHTML += '</form>';

        conference_choices.innerHTML += '</p><br>';
    }
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
