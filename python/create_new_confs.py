import json

def saveNewConfs(): 

    id_2_conf = {}
    id_2_conf["1610612739"] = 'central'
    id_2_conf["1610612749"] = 'central'
    id_2_conf["1610612754"] = 'central'
    id_2_conf["1610612765"] = 'central'
    id_2_conf["1610612741"] =  'central'
    id_2_conf["1610612750"] = 'central'
    id_2_conf["1610612760"] = 'central'
    id_2_conf["1610612763"] =  'central'

    id_2_conf["1610612738"] = 'north_atlantic'
    id_2_conf["1610612761"] = 'north_atlantic'
    id_2_conf["1610612764"] = 'north_atlantic'
    id_2_conf["1610612755"] = 'north_atlantic'
    id_2_conf["1610612752"] = 'north_atlantic'
    id_2_conf["1610612766"] =  'north_atlantic'
    id_2_conf["1610612751"] =  'north_atlantic'

    id_2_conf["1610612744"] = 'pacific'
    id_2_conf["1610612757"] = 'pacific'
    id_2_conf["1610612743"] = 'pacific'
    id_2_conf["1610612746"] = 'pacific'
    id_2_conf["1610612762"] = 'pacific'
    id_2_conf["1610612747"] =  'pacific'
    id_2_conf["1610612756"] =  'pacific'
    id_2_conf["1610612758"] =  'pacific'

    id_2_conf["1610612748"] = 'southeast'
    id_2_conf["1610612753"] =  'southeast'
    id_2_conf["1610612737"] =  'southeast'
    id_2_conf["1610612745"] = 'southeast'
    id_2_conf["1610612759"] = 'southeast'
    id_2_conf["1610612740"] = 'southeast'
    id_2_conf["1610612742"] =  'southeast'

    with open('new_confs.json', 'w') as json_file:
        json.dump(id_2_conf, json_file)

    '''
    id_2_name = {}

    central = {}
    central["1610612739"] = "Cleveland Cavaliers"
    central["1610612749"] = "Milwaukee Bucks"
    central["1610612754"] = "Indiana Pacers"
    central["1610612765"] = "Detroit Pistons"
    central["1610612741"] =  "Chicago Bulls"
    central["1610612750"] = "Minnesota Timberwolves"
    central["1610612760"] = "Oklahoma City Thunder"
    central["1610612763"] =  "Memphis Grizzlies"

    id_2_name['central'] = central


    north_atlantic = {}
    north_atlantic["1610612738"] = "Boston Celtics"
    north_atlantic["1610612761"] = "Toronto Raptors"
    north_atlantic["1610612764"] = "Washington Wizards"
    north_atlantic["1610612755"] = "Philadelphia 76ers"
    north_atlantic["1610612752"] = "New York Knicks"
    north_atlantic["1610612766"] =  "Charlotte Hornets"
    north_atlantic["1610612751"] =  "Brooklyn Nets"

    id_2_name['north_atlantic'] = north_atlantic


    pacific = {}
    pacific["1610612744"] = "Golden State Warriors"
    pacific["1610612757"] = "Portland Trail Blazers"
    pacific["1610612743"] = "Denver Nuggets"
    pacific["1610612746"] = "LA Clippers"
    pacific["1610612762"] = "Utah Jazz"
    pacific["1610612747"] =  "Los Angeles Lakers"
    pacific["1610612756"] =  "Phoenix Suns"
    pacific["1610612758"] =  "Sacramento Kings"

    id_2_name['pacific'] = pacific


    southeast = {}
    southeast["1610612748"] = "Miami Heat"
    southeast["1610612753"] =  "Orlando Magic"
    southeast["1610612737"] =  "Atlanta Hawks"
    southeast["1610612745"] = "Houston Rockets"
    southeast["1610612759"] = "San Antonio Spurs"
    southeast["1610612740"] = "New Orleans Pelicans"
    southeast["1610612742"] =  "Dallas Mavericks"

    id_2_name['southeast'] = southeast

    print '\n', id_2_name
    '''

if __name__ == '__main__':

    saveNewConfs()