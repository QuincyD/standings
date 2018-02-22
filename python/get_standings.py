'''
Programmed by Quincy Davenport

Program scans the urls for teams and standings json
objects to retrieve the NBA standings and saves them to
json files; teams.json and standings.json.

It also saves the current data and time to last_updated.json.
'''

import requests
import json
import re
from datetime import datetime

'''
EFFECTS:    Scans the json_url url and saves its contents
            to file output_filename
'''
def getJSON(json_url, output_filename):
    
    session = requests.Session()
    try:
        response = session.get(json_url, timeout=10)
    except:
        return

    json_data = json.loads(response.text.encode('UTF-8').decode('ascii', 'ignore'))
    with open(output_filename, 'w') as json_file:
        json.dump(json_data, json_file)


'''
EFFECTS:    Adds the date and time to a dict and saves it to
            json file output_filename
'''
def getTime(output_filename='json/last_updated.json'):

    time_str = str(datetime.now())

    year = time_str[:4]
    month = time_str[5:7]
    day = time_str[8:10]
    date = month + '/' + day + '/' + year

    hour = int(time_str[11:13])
    if(hour > 12):
        hour -= 12
        hour = str(hour)
        am_pm = 'pm'
    else:
        hour = str(hour)
        am_pm = 'am'

    minute = time_str[14:16]
    time = hour + ':' + minute + ' ' + am_pm 

    time_dict = {'date':date, 'time':time}

    with open(output_filename, 'w') as json_file:
        json.dump(time_dict, json_file)


if __name__ == '__main__':

    getJSON('https://data.nba.net/prod/v1/2017/teams.json', 'json/teams.json')
    getJSON('https://data.nba.net/prod/v1/current/standings_conference.json', 'json/standings.json')
    getTime()
