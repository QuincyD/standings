temp_names = [];
temp_names[0] = 'Sky';
temp_names[1] = 'Forest';
temp_names[2] = 'Volcano';
temp_names[3] = 'Equator';
temp_names[4] = 'Wild';
temp_names[5] = 'Sun';
temp_names[6] = 'Night';
temp_names[7] = 'Artic';

function newNums() {

    var nums = document.getElementById('conference_num');

    nums.innerHTML = '<p>Choose number of converences</p>';
    nums.innerHTML += '<form id=\'num_form\'>'
    nums.innerHTML += '<input id=\'2\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(2); return false;>2';
    nums.innerHTML += '<input id=\'3\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(3); return false;>3';
    nums.innerHTML += '<input id=\'4\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(4); return false;>4';
    nums.innerHTML += '<input id=\'5\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(5); return false;>5';
    nums.innerHTML += '<input id=\'6\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(6); return false;>6';
    nums.innerHTML += '<input id=\'7\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(7); return false;>7';
    nums.innerHTML += '<input id=\'8\' class=\'line\' type=\'radio\' name=\'num_confs\' onclick=showNumButton(8); return false;>8';
    nums.innerHTML += '</form>';

}

function restartCreate() {

    newNums();

    document.getElementById('conference_names').innerHTML = '';
    document.getElementById('conference_choices').innerHTML = '';
}

function showNumButton(num) {

    clicked_num = parseInt(num);

    if (document.getElementById('num_button')) {
        return false;
    }
    
    document.getElementById('conference_num').innerHTML +=
    '<button id=\'num_button\' onclick=\'nameConferences();return false;\'>OK</button>';

    document.getElementById(num).checked = true;
}

function nameConferences() {
    
    document.getElementById('conference_num').innerHTML = ''; 

    conferences = document.getElementById('conference_names');
    conferences.innerHTML = '<p>Name your conferences</p>';

    for (var i = 0; i < clicked_num; i++) {
        var conf = '<input type=\'text\' name=\'conf_' +
                    i + '_name\' value=\'' + temp_names[i] +
                    '\'>&nbsp;Conference<br>'; 
        conferences.innerHTML += conf;
    }
    conferences.innerHTML +=
    '<button onclick=\'chooseConferences();return false;\'>OK</button>';
}

function compare(team1, team2) {
    return team1.name.localeCompare(team2.name)
}
function chooseConferences() {

    document.getElementById('conference_names').innerHTML = '';
    
    if (typeof teams !== 'undefined') {

        displayTeams();
        return false;

    }

}

newNums();
