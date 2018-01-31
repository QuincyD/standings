function addPageElts() {

    var head = document.getElementById('head');

    //Tab favicon and text
    head.innerHTML += '<title>Converted Standings</title>';
    head.innerHTML += '<link href=\'../imgs/nba_add.png\' rel=\'icon\' type=\'image/x-icon\' />';

    addHeader();
    addNav();
}

function addHeader(){

    var header = document.getElementById('page_header');

    if (document.getElementById('index_nav')) {
        header.innerHTML += '<img class=\'line\' src=\'imgs/nba_add.png\'/>';

    }
    else {
        header.innerHTML += '<img class=\'line\' src=\'../imgs/nba_add.png\'/>';
    }

    header.innerHTML += '<p  class=\'line\' id=\'page_title\'>NBA Converted Standings</p>';

}

function addNav(){

    if (nav = document.getElementById('index_nav')) {
        nav.innerHTML += '<a href=\'html/map.html\'><button>Details</button></a>'; 
        nav.innerHTML += '<a href=\'html/about.html\'><button>About</button></a>'; 
    }

    if (nav = document.getElementById('map_nav')) {
        nav.innerHTML += '<a href=\'../index.html\'><button>Standings</button></a>'; 
        nav.innerHTML += '<a href=\'about.html\'><button>About</button></a>'; 
    }

    if (nav = document.getElementById('about_nav')){
        nav.innerHTML += '<a href=\'../index.html\'><button>Standings</button></a>'; 
        nav.innerHTML += '<a href=\'map.html\'><button>Details</button></a>'; 
    }
}

addPageElts();
