
/*
    REQUIRES:   The head element in the calling html file has
                id='head'

    EFFECTS:    Adds the tab title and favicon to the calling
                html page. Also, calls addHeader() and addNav()
                to add website page header and page's navigation
                links.
*/
function addPageElts() {

    var head = document.getElementById('head');

    var temp_text = '';

    //include cookie.js
    //temp_text += '<script src="https://cdn.jsdelivr.net/npm/js';
    //temp_text += '-cookie@2/src/js.cookie.min.js"></script>';

    //Tab favicon and text
    temp_text += '<title>Converted Standings</title>';

    temp_text += '<link href=\'../imgs/nba_add.png\' rel=\'icon\'';
    temp_text += ' type=\'image/x-icon\' />';

    head.innerHTML += temp_text;

    addHeader();
    addNav();
}

/*
    REQUIRES:   There exists an element with id='page_header'
                and an image 'img/nba_add.png'

    EFFECTS:    Adds the logo and title to the calling page's
                body
*/
function addHeader(){

    var header = document.getElementById('page_header');
    var temp_text = '';

    if (document.getElementById('index_nav')) {
        temp_text += '<img class=\'line\' src=\'imgs/nba_add.png\'/>';

    }
    else {
        temp_text += '<img class=\'line\' src=\'../imgs/nba_add.png\'/>';
    }

    temp_text += '<p  class=\'line\' id=\'page_title\'>NBA ';
    temp_text += 'Converted Standings</p>';
    
    header.innerHTML += temp_text;

}

/*
    EFFECTS:    Adds navigation links as buttons to calling
                html page based on if there exists an
                element with id={'index_nav', 'map_nav',
                'about_nav', and/or 'create_nav'}
*/
function addNav(){
    var temp_text = '';
    if (nav = document.getElementById('index_nav')) {

        temp_text += '<a href=\'html/create.html\'><button>Customize';
        temp_text += '</button></a>'; 
        
        temp_text += '<a href=\'html/map.html\'><button>Details';
        temp_text += '</button></a>'; 
        
        temp_text += '<a href=\'html/about.html\'><button>About';
        temp_text += '</button></a>'; 

        nav.innerHTML += temp_text;
    }

    if (nav = document.getElementById('map_nav')) {

        temp_text += '<a href=\'../index.html\'><button>Standings';
        temp_text += '</button></a>'; 

        temp_text += '<a href=\'create.html\'><button>Customize';
        temp_text += '</button></a>'; 
        
        temp_text += '<a href=\'about.html\'><button>About</button></a>'; 

        nav.innerHTML += temp_text;
    }

    if (nav = document.getElementById('about_nav')){

        temp_text += '<a href=\'../index.html\'><button>Standings';
        temp_text += '</button></a>'; 

        temp_text += '<a href=\'create.html\'><button>Customize';
        temp_text += '</button></a>'; 
        
        temp_text += '<a href=\'map.html\'><button>Details';
        temp_text += '</button></a>'; 

        nav.innerHTML += temp_text;
    }
    if (nav = document.getElementById('create_nav')){

        temp_text += '<a href=\'../index.html\'><button>Standings';
        temp_text += '</button></a>'; 

        temp_text += '<a href=\'map.html\'><button>Details';
        temp_text += '</button></a>'; 

        temp_text += '<a href=\'about.html\'><button>About</button></a>'; 

        nav.innerHTML += temp_text;
    }
}

addPageElts();
