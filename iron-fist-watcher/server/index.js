import express from "express";
import homepageRouter from "./homepageRouter.js";
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 3000;
const uri = "unknown"
const app = express();
const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir)
//Use for getting all the names. Should be used once to allow site to search
async function get_names() {
  try{
    await client.connect();
    const database = client.db("Iron-Fist-Watcher");
    const players = database.collection("Players");
    const query ={};
    const options = {
      
      // Include only the necessary fields
      projection: { _id: 0, name: 1},
    };
    const playerNames = await players.find(query, options).sort({name:1});
    return playerNames
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function get_DBdata(name) {
  try{
    await client.connect();
    const database = client.db("Iron-Fist-Watcher");
    const players = database.collection("Players");
    const query ={name:name};
    const options = {
      
      // Include only the necessary fields
      projection: { _id: 0, name: 1, placements: 1 },
    };
    const player = await players.findOne(query, options);
    return player
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
const example_data =   [{id:1,name:'Arslan Ash',placements:[
  {"class": "MASTER+","title":"EVO","date": "07/19/2024","rank":1,"points":800}, 
  {"class": "MASTER","title":"EVO-1","date": "07/01/2024","rank":3,"points":500},
  {"class": "DOJO 96+","title":"HAVOC 5","date": "05/13/2024","rank":10,"points":10},
  {"class": "DOJO 48","title":"HAVOC 4","date": "04/16/2024","rank":12,"points":6},
  {"class": "DOJO 96+","title":"HAVOC 3","date": "04/13/2024","rank":13,"points":5}]},
  {id:2,name:'Ulsan',placements:[
    {"class": "MASTER","title":"TGU","date": "10/05/2024","rank":4,"points":220},
    {"class": "CHALLENGER","title":"Ultimate Fighting Arena","date": "09/13/2024","rank":1,"points":300},
    {"class": "MASTER+","title":"EVO","date": "07/19/2024","rank":4,"points":300}, 
    {"class": "MASTER","title":"ATL Super Tournament","date": "06/08/2024","rank":2,"points":400},
    {"class": "MASTER","title":"BAM","date": "06/01/2024","rank":17,"points":90},
    {"class": "DOJO 64+","title":"ATL Weekend","date": "05/12/2024","rank":4,"points":220},
    {"class": "MASTER+","title":"EVO Japan","date": "04/27/2024","rank":17,"points":90}
    ]},
    {id:2,name:'Mulgold',placements:[
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
      player_data = example_data[i]["placements"]
      break;
    }
  }
  res.json({data:player_data})
});

app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});