
from bs4 import BeautifulSoup
from pymongo import MongoClient
pymongoURI = "mongodb+srv://KenzieIsFan:<dbPasswordhere>@cluster0.4p5toe7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
#page = requests.get(URL)
f = open("demofile.html", "r")
page = f.read()

soup = BeautifulSoup(page,"html.parser")
#BS can find div ids/classes
#plan for the webscraper: make one to search the basic parts for results
#make another one to search the page for info regarding the player on that tour.
siteContent = soup.find("div",class_="site_content")
sectionBox = siteContent.find("section")
#for finding player name
name = sectionBox.find("div",class_= "info_panel items one no-border").find("div",class_="item").find("div",class_="content_area").find("div",class_="title").string

events = sectionBox.find("div",class_="event items")
#only one item in event items 
eventArray = []
event_list = events.find_all("div",class_="item")
for e in event_list:
    content_area = e.find('div', class_='content_area')
    e_cat = content_area.find('div').contents[0]
    e_cat = e_cat.replace('\n',"")
    e_cat = e_cat.replace(' ',"")
    e_title = content_area.find('div', class_='title').string
    e_date = content_area.find('div', class_='date').string
    e_rank = e.find('div', class_='rank_num_area').find("div").find('span').string
    e_points = e.find('div', class_='point_area').find("div").find('span')
    #website applies a  span if points are not used in that event
    if e_points == None:
        e_points = e.find('div', class_='point_area').find("div")
#{"class": "MASTER","title":"EVO","date": new Date("07/19/2024"),"rank":1,"points":800}
    e_json = {"class": e_cat,"title": e_title,"date": e_date,"rank":e_rank,"points":e_points.string}
    eventArray.append(e_json)


client = MongoClient(pymongoURI)

try:
    database = client.get_database("Iron-Fist-Watcher")
    players = database.get_collection("Players")

    # Query if player already exists
    query = { "name": name }
    player = players.find_one(query)
    if player == None:
        noSQLDoc = {"name":name, "placements":eventArray}
        players.insert_one(noSQLDoc)
    else: 
        print("Player has already been added")

    client.close()

except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)

    

