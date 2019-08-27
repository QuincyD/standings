temp_names = [];
temp_names[0] = 'Eastern';
temp_names[1] = 'Western';
temp_names[2] = 'Northern';
temp_names[3] = 'Southern';
temp_names[4] = 'North Eastern';
temp_names[5] = 'North Western';
temp_names[6] = 'South Eastern';
temp_names[7] = 'South Western';

teams = [];
$.ajax({

    url: '../json/teams.json',
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

/*
    REQUIRES:   element is an element on the calling html
                page's DOM

    EFFECT:     Toggles the element's visibility
*/
function toggleVisibility(element) {

    if (element.style.display === 'none') {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

/*
    REQUIRES:   calling html page has element of id =
                'conference_num', 'conference_names',
                'conference_choices', and 'editing'

    EFFECTS:    Clears/hides the elements with id's listed 
                in REQUIRES and adds html to page based on
                if edit is true or not and if the
                customizations object has been defined
                by using a stored cookie.
*/
function restartCreate(edit=false) {
    
    if (edit === false) {
        newNums();
    }
    else {
        var nums = document.getElementById('conference_num');
        nums.innerHTML = '';
        nums.style.display = 'none';
    }

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

    if (customizations && edit === false) {

        var editing = document.getElementById('editing');

        var btn_text = '';
        btn_text += '<button onclick=\'editCustomized(); return false;\'>';
        btn_text += 'Edit</button>';

        editing.innerHTML = btn_text;
    }
    else if (customizations) {

        var editing = document.getElementById('editing');

        var btn_text = '';
        btn_text += '<button onclick=\'restartCreate(); return false;\'>';
        btn_text += 'Cancel</button>';

        editing.innerHTML = btn_text;

    }
    else {

        document.getElementById('editing').innerHTML = '';

    }

}

/*
    REQUIRES:   An element with id='conference_num' is on
                the calling page's html

    EFFECT:     Displays the div for choosing the amount
                of conferences when creating a new set of
                conferences.
*/
function newNums() {

    var nums = document.getElementById('conference_num');
    nums.style.display = 'block';
    nums.innerHTML = '';

    var temp_text = '<p>Choose number of conferences</p>';
    temp_text += '<form id=\'num_form\'>';

    for (var i = 2; i <= 8; i++) {
        temp_text += '<label><input id=\'' + i +
        '\' class=\'radio_btn\' type=\'radio\' onclick=showNumButton(' +
        i + ');return false;>' + i + '</label>';
    }

    temp_text += '</form>';
    
    nums.innerHTML += temp_text;
    clicked_num = 1;

}

/*
    REQUIRES:   The calling html page's DOM has elements with
                id's 'conference_num' and 'editing' and clicked_num
                is a global variable defined somewhere.

    EFFECTS:    Shows an OK button for choosing the number
                of conferences and replaces anything in the
                'editing' element with a Start Over button.
*/
function showNumButton(num) {

    
    if (clicked_num !== 1) {
        document.getElementById(clicked_num).checked = false;
    }
    clicked_num = parseInt(num);

    if (document.getElementById('num_btn')) {
        return false;
    }
    
    document.getElementById('conference_num').innerHTML +=
    '<button id=\'num_btn\' onclick=\'nameConferences();return false;\'>OK!</button>';

    document.getElementById(num).checked = true;

    var editing = document.getElementById('editing');

    var btn_text = '';
    btn_text += '<button onclick=\'restartCreate();return false;\'>';
    btn_text += 'Start Over</button>';

    editing.innerHTML = btn_text;

}

/*
    REQUIRES:   The calling html page's DOM has elements with
                id's 'conference_num' and 'conference_names'.
                Also, clicked_num is a global integer defined
                somewhere and temp_names is a global array of
                strings defined somehwere.

    EFFECTS:    Hides the div for choosing conference nums and
                creates clicked num amount of text inputs for
                naming the conferences with initial temporary
                names as values
*/
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

/*
    REQUIRES:   The calling html page's DOM has elements with
                id='conference_names' and elements with
                name='conf_name'.

    EFFECTS:    Hides the div for choosing conference names
                and calls displayChoices() to display all
                teams to assign to one of the conferences.
*/
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

/*
    REQUIRES:   An element with id='conference_choices' is on the
                calling html page and if edit is true, an element
                with id='editing' is on html page. Also, teams is
                a global array of team objects defined somewhere
                and if edit is true, customizations is a global
                object of a custom conference map and a
                conference names array

    EFFECTS:    Displays the each team in teams array with buttons
                to choose which conference to assign the team
*/
function displayChoices(edit=false) {

    var conference_choices = document.getElementById('conference_choices');
    toggleVisibility(conference_choices);

    chosen = 0;

    var temp_text = '<p>Choose conference for each team</p><br>';

    var i;
    var teams_len = teams.length;
    for (i = 0; i < teams_len; i++) {

        var name = teams[i]['name'];
        var team_id = teams[i]['team_id'];

        if (edit === true) {
            var class_name = 'back_';
            var class_num = customizations['custom'][team_id];
            if (customizations['conferences'].length === 2) {
                class_num += 1;
            }
            class_name += class_num; 
            temp_text += '<div id=\'team_' + i + '\' class=\'';
            temp_text += class_name + '\'>';
        }
        else {
            temp_text += '<div id=\'team_' + i + '\'>';
        }

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

    if (edit === false) {
        temp_text += '<p>If an OK button hasn\'t appeared';
        temp_text += ', at least one team hasn\'t been'
        temp_text += ' given a conference above.</p><br>';
    }
    else {
        var editing = document.getElementById('editing');
        var btn_text = '';

        btn_text += '<button onclick=\'saveCustom(true); return false;\'>';
        btn_text += 'Save</button>';

        btn_text += '<button onclick=\'restartCreate(); return false;\'>';
        btn_text += 'Cancel</button>';

        editing.innerHTML = btn_text;

        temp_text += '<p>Save and Cancel buttons are located near';
        temp_text += ' top of page.</p>';
    }

    conference_choices.innerHTML = temp_text;
}

/*
    REQUIRES:   chosen is a global integer defined somewhere,
                the calling page's DOM has an elements with
                id's = 'team_{team_num}' and 'conference_choices,
                and teams is a global array defined somewhere

    EFFECTS:    Sets the conference of the team_num object
                in the teams array to conf_num and sets the
                class attribute of element with
                id='team_{team_num}' to conf_num or conf_num
                + 1 there are only 2 conferences.
                If chosen is equal to the length of teams
                then add a OK button to 'conference_choices' 
*/
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

        var conference_choices =
            document.getElementById('conference_choices');

        conference_choices.innerHTML += 
            '<button onclick=\'saveCustom(); return false;\'>OK!!!</button>';
    }
}

/*
    REQUIRES:   The calling page's DOM as an element with
                id='conference_choices', teams is a global
                array of team objects, and customizations
                is a global object of conference names and
                team conference assignments if edit is true.

    EFFECTS:    Saves the conference names and each team
                conference choices to a cookie as

                customizations =
                    { 'custom': [team_id_0: {...},
                                 team_id_1: {...}, ...],

                      'conferences': [conf_name_0, ...] }
*/
function saveCustom(edit=false){

    var choices = document.getElementById('conference_choices');
    toggleVisibility(choices);

    var cookie_data = {};

    cookie_data['conferences'] = given_names;

    var i;
    var teams_len = teams.length;
    var custom = {};
    for (i = 0; i < teams_len; i++) {

        var team_id = teams[i]['team_id'];
        if (edit === true && !teams[i].hasOwnProperty('conference')) {
            var conf_num = customizations['custom'][team_id];
        }
        else {
            var conf_num = teams[i]['conference'];
        }

        custom[team_id] = conf_num;
    }

    cookie_data['custom'] = custom;

    Cookies.set('customizations', JSON.stringify(cookie_data));
    window.location = '../index.html';
}

/*
    EFFECTS:    Displays already chosen conference choices for
                editing.
*/
function editCustomized(){

    restartCreate(true);
    given_names = customizations['conferences'];
    displayChoices(true);
}

if (customizations = Cookies.getJSON('customizations')) {

    var edit_text = '';

    edit_text += '<button onclick=\'editCustomized(); return false;\'>';
    edit_text += 'Edit</button>';

    document.getElementById('editing').innerHTML = edit_text;

}

restartCreate();
