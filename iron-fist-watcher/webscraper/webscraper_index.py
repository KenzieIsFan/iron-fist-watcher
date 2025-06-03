from bs4 import BeautifulSoup
from pymongo import MongoClient
import requests
import subprocess
#Gets top 100 players by looking at the global leaderboard
for i in range(5):
    #to get data on 2024
    URL = "https://tekken-esports.bn-ent.net/ranking?lang=en&page="+i+"&league_id=6"
    page = requests.get(URL)

    soup = BeautifulSoup(page.content,"html.parser")
    siteContent = soup.find("div",class_="site_content")
    sectionBox = siteContent.find("section")
    rankItems = sectionBox.find("div",class_ = "ranking items")
    players = rankItems.find_all("div")
    for p in players:
        #checks for potentially empty screen names when looking through current state of TWT leaderboard so as not to record those, if name is unknown
        if len(p.find("a").find("div",class_="content_area").find("div",class_="name").find("span",class_="screen_name").contents) == 0:
            continue
        
        link = p.find("a")['href']
        subprocess.run(['python', 'webscraper_main.py', link])
        