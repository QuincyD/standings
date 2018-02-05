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

function toggleVisibility(element) {

    if (element.style.display === 'none') {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}


function newNums() {

    var nums = document.getElementById('conference_num');
    nums.style.display = 'block';
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

    var names = document.getElementById('conference_names');
    names.innerHTML = '';
    names.style.display = 'none';

    var choices = document.getElementById('conference_choices');
    choices.innerHTML = '';
    choices.style.display = 'none';
    
    var i;
    var teams_len = teams.length;
    for (i = 0; i < teams_len; i++) {
        delete teams[i]['conference'];
    }
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
    
    var temp_elt = document.getElementById('conference_num');
    temp_elt.innerHTML = ''; 
    toggleVisibility(temp_elt);

    var conferences = document.getElementById('conference_names');
    toggleVisibility(conferences);

    var temp_text = '<p>Name your conferences</p>';

    for (var i = 0; i < clicked_num; i++) {
        temp_text += '<input type=\'text\' name=\'conf_';
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

    var temp_elt = document.getElementById('conference_names')
    temp_elt.innerHTML = '';
    toggleVisibility(temp_elt);
    
    displayChoices();
}

function displayChoices() {

    var conference_choices = document.getElementById('conference_choices');
    toggleVisibility(conference_choices);

    chosen = 0;

    var temp_text = '<p>Choose conference for each team</p><br>';

    var i;
    var teams_len = teams.length;
    for (i = 0; i < teams_len; i++) {

        var name = teams[i]['name'];
        var team_id = teams[i]['team_id'];

        temp_text += '<div id=\'team_' + i + '\'>';
        temp_text += '<img src=\'../imgs/logos/' + team_id;
        temp_text += '.png\' class=\'line\'>';
        temp_text += '&nbsp;<p class=\'line\'>' + name + ': '; 
        temp_text += '</div><br>';

        temp_text += '<form class=\'choices\'>';

        var j;
        var given_len = given_names.length;
        for (j = 0; j < given_len; j++) {

            var name = given_names[j];

            if (given_len === 2) {
                var color_class = j+1;
            }
            else {
                var color_class = j;
            }
            temp_text += '<button class=\'color_' + color_class;
            temp_text += '\' onclick';
            temp_text += '=\'chooseConference(' + i + ', ' + j;
            temp_text += '); return false;\'>' + name + '</button>';

            if (j === 3 && 4 !== given_len) {
                temp_text += '<br>';
            }

        }
        
        temp_text += '</form></p><br>';
    }

    temp_text += '<p>If an OK button hasn\'t appeared';
    temp_text += ', at least one team hasn\'t been'
    temp_text += ' given a conference above.</p><br>';

    conference_choices.innerHTML = temp_text;
}

function chooseConference(team_num, conf_num) {

    if (given_names.length === 2) {
        var back_class = conf_num + 1;
    }
    else {
        var back_class = conf_num;
    }
    var class_name = 'back_' + back_class;
    document.getElementById('team_'+team_num).setAttribute('class', class_name);

    if (teams[team_num].hasOwnProperty('conference')) {
        teams[team_num]['conference'] = conf_num;
        return false;
    }

    teams[team_num]['conference'] = conf_num;

    chosen += 1;

    if (chosen >= teams.length){
        conference_choices.innerHTML += 
            '<button onclick=\'saveCustom(); return false;\'>OK!!!</button>';
    }
}

function saveCustom(){

    var choices = document.getElementById('conference_choices');
    toggleVisibility(choices);

    var cookie_data = {};

    cookie_data['conferences'] = given_names;

    var i;
    var teams_len = teams.length;
    var custom = {};
    for (i = 0; i < teams_len; i++) {

        var team_id = teams[i]['team_id'];
        var conf_num = teams[i]['conference'];

        custom[team_id] = conf_num;
    }

    cookie_data['custom'] = custom;

    Cookies.set('customizations', JSON.stringify(cookie_data));
    window.location = '../index.html';
}

restartCreate();
