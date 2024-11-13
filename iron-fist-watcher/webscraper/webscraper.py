import requests
from bs4 import BeautifulSoup
"""
#URL = ""
#page = requests.get(URL)
f = open("demofile.txt", "r")

page = f.read()

soup = BeautifulSoup(page.content,"html.parser")
#BS can find div ids/classes
#plan for the webscraper: make one to search the basic parts for results
#make another one to search the page for info regarding the player on that tour.

siteContent = soup.find_all("div",class_="site_content")
events = siteContent.find_all("div",class_="event items")
#only one item in event items 
event_list = events[0].find_all("div",class_="item")
for e in event_list:
    print(e)
"""
print("hello world")