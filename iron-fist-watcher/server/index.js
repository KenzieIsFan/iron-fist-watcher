import express from "express";
import homepageRouter from "./homepageRouter.js";

const port = process.env.PORT || 3000;

const app = express();

const example_data =   [{id:1,name:'Arslan Ash',data:[
  {"class": "MASTER+","title":"EVO","date": "07/19/2024","rank":1,"points":800}, 
  {"class": "MASTER","title":"EVO-1","date": "07/01/2024","rank":3,"points":500},
  {"class": "DOJO 96+","title":"HAVOC 5","date": "05/13/2024","rank":10,"points":10},
  {"class": "DOJO 48","title":"HAVOC 4","date": "04/16/2024","rank":12,"points":6},
  {"class": "DOJO 96+","title":"HAVOC 3","date": "04/13/2024","rank":13,"points":5}]},
  {id:2,name:'Ulsan',data:[
    {"class": "MASTER","title":"TGU","date": "10/05/2024","rank":4,"points":220},
    {"class": "CHALLENGER","title":"Ultimate Fighting Arena","date": "09/13/2024","rank":1,"points":300},
    {"class": "MASTER+","title":"EVO","date": "07/19/2024","rank":4,"points":300}, 
    {"class": "MASTER","title":"ATL Super Tournament","date": "06/08/2024","rank":2,"points":400},
    {"class": "MASTER","title":"BAM","date": "06/01/2024","rank":17,"points":90},
    {"class": "DOJO 64+","title":"ATL Weekend","date": "05/12/2024","rank":4,"points":220},
    {"class": "MASTER+","title":"EVO Japan","date": "04/27/2024","rank":17,"points":90}
    ]},
    {id:2,name:'Mulgold',data:[
      {"class": "MASTER","title":"TGU","date": "10/05/2024","rank":4,"points":220},
      {"class": "CHALLENGER","title":"Ultimate Fighting Arena","date": "09/13/2024","rank":1,"points":300},
      {"class": "MASTER+","title":"EVO","date": "07/19/2024","rank":33,"points":50}, 
      {"class": "MASTER","title":"ATL Super Tournament","date": "06/08/2024","rank":1,"points":560},
      {"class": "DOJO 64+","title":"ATL Weekend","date": "05/12/2024","rank":4,"points":220},
      {"class": "MASTER+","title":"EVO Japan","date": "04/27/2024","rank":9,"points":150}
      ]},

]

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});
//for search engine to look for players with names similar to provided text
//app.get('/api/getPlayers)


//for getting the relevant data stored about a player
//Will later have a proper backend to ask the data base about players
//will need to optimise search technique later by either sorting and doing BS or using a trie or some other way
app.get("/api/getData", (req,res) => {
  const player = req.query.player
  let player_data = []
  for(var i=0; i<example_data.length; i++) {
    if (example_data[i]["name"] === player){
      player_data = example_data[i]["data"]
      break;
    }
  }
  res.json({data:player_data})
});

app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});