import json

'''
    EFFECTS:    saves a dict that maps team id's to
                conference indices to the json file
                json/new_confs.json
'''
def saveNewConfs(): 

    '''
    0 = Central
    1 = North Atlantic
    2 = Pacific
    3 = Southeast
    '''

    id_2_conf = {}
    id_2_conf['1610612739'] = '0' #'Cleveland Cavaliers'
    id_2_conf['1610612749'] = '0' #'Milwaukee Bucks'
    id_2_conf['1610612754'] = '0' #'Indiana Pacers'
    id_2_conf['1610612765'] = '0' #'Detroit Pistons'
    id_2_conf['1610612741'] = '0' #'Chicago Bulls'
    id_2_conf['1610612750'] = '0' #'Minnesota Timberwolves
    id_2_conf['1610612760'] = '0' #'Oklahoma City Thunder
    id_2_conf['1610612763'] = '0' #'Memphis Grizzlies'

    id_2_conf['1610612738'] = '1' #'Boston Celtics'
    id_2_conf['1610612761'] = '1' #'Toronto Raptors'
    id_2_conf['1610612764'] = '1' #'Washington Wizards'
    id_2_conf['1610612755'] = '1' #'Philadelphia 76ers'
    id_2_conf['1610612752'] = '1' #'New York Knicks'
    id_2_conf['1610612766'] = '1' #'Charlotte Hornets'
    id_2_conf['1610612751'] = '1' #'Brooklyn Nets'

    id_2_conf['1610612744'] = '2' #'Golden State Warriors'
    id_2_conf['1610612757'] = '2' #'Portland Trail Blazers
    id_2_conf['1610612743'] = '2' #'Denver Nuggets'
    id_2_conf['1610612746'] = '2' #'LA Clippers'
    id_2_conf['1610612762'] = '2' #'Utah Jazz'
    id_2_conf['1610612747'] = '2' #'Los Angeles Lakers'
    id_2_conf['1610612756'] = '2' #'Phoenix Suns'
    id_2_conf['1610612758'] = '2' #'Sacramento Kings'

    id_2_conf['1610612748'] = '3' #'Miami Heat'
    id_2_conf['1610612753'] = '3' #'Orlando Magic'
    id_2_conf['1610612737'] = '3' #'Atlanta Hawks'
    id_2_conf['1610612745'] = '3' #'Houston Rockets'
    id_2_conf['1610612759'] = '3' #'San Antonio Spurs'
    id_2_conf['1610612740'] = '3' #'New Orleans Pelicans'
    id_2_conf['1610612742'] = '3' #'Dallas Mavericks'

    with open('json/new_confs.json', 'w') as json_file:
        json.dump(id_2_conf, json_file)

    '''
    id_2_name = {}

    central = {}
    central['1610612739'] = 'Cleveland Cavaliers'
    central['1610612749'] = 'Milwaukee Bucks'
    central['1610612754'] = 'Indiana Pacers'
    central['1610612765'] = 'Detroit Pistons'
    central['1610612741'] = 'Chicago Bulls'
    central['1610612750'] = 'Minnesota Timberwolves'
    central['1610612760'] = 'Oklahoma City Thunder'
    central['1610612763'] = 'Memphis Grizzlies'

    id_2_name['central'] = central


    north_atlantic = {}
    north_atlantic['1610612738'] = 'Boston Celtics'
    north_atlantic['1610612761'] = 'Toronto Raptors'
    north_atlantic['1610612764'] = 'Washington Wizards'
    north_atlantic['1610612755'] = 'Philadelphia 76ers'
    north_atlantic['1610612752'] = 'New York Knicks'
    north_atlantic['1610612766'] = 'Charlotte Hornets'
    north_atlantic['1610612751'] = 'Brooklyn Nets'

    id_2_name['north_atlantic'] = north_atlantic


    pacific = {}
    pacific['1610612744'] = 'Golden State Warriors'
    pacific['1610612757'] = 'Portland Trail Blazers'
    pacific['1610612743'] = 'Denver Nuggets'
    pacific['1610612746'] = 'LA Clippers'
    pacific['1610612762'] = 'Utah Jazz'
    pacific['1610612747'] = 'Los Angeles Lakers'
    pacific['1610612756'] = 'Phoenix Suns'
    pacific['1610612758'] = 'Sacramento Kings'

    id_2_name['pacific'] = pacific


    southeast = {}
    southeast['1610612748'] = 'Miami Heat'
    southeast['1610612753'] = 'Orlando Magic'
    southeast['1610612737'] = 'Atlanta Hawks'
    southeast['1610612745'] = 'Houston Rockets'
    southeast['1610612759'] = 'San Antonio Spurs'
    southeast['1610612740'] = 'New Orleans Pelicans'
    southeast['1610612742'] = 'Dallas Mavericks'

    id_2_name['southeast'] = southeast

    print '\n', id_2_name
    '''

if __name__ == '__main__':

    saveNewConfs()
