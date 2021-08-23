const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId

app.use(bodyParser.urlencoded({extended: true}))

var keys = JSON.parse(fs.readFileSync('./keys.json'))

app.listen(3000,function() {
    console.log('listening on 3000')

})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
     //do stuff
})

//simple implementation of string format
String.prototype.format = function() {
    a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a
  }

  //DB connection string
var uri = 'mongodb+srv://defaultService:' + keys.mongoDB + '@aglo1.xllzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const databaseName = "gatherings";

MongoClient.connect(uri, { useUnifiedTopology: true })
.then(client =>{
  console.log("Connection established - All well")
  const db = client.db(databaseName)
  const gatheringsCollection = db.collection('gatherings')

  //Create
  app.post('/gatherings-create', (req, res) => {
    //dummy userid just to test
    req.body.UserId = 1,
    gatheringsCollection.insertOne(req.body)
                        .then(result => {
                            console.log(result)
                            res.send(result)
                        })
                        .catch(error => console.error(error))})

   //Read
   //TODO: proper way to search for gatherings. Maybe search by latitude/longitude?
   //Or gathering name?
   app.get('/gatherings-read', (req, res) => {
    const cursor = gatheringsCollection.find().toArray()
    .then(results => {
        //sends gatherings as a json
        console.log(results)
        res.send(results)     
    })
        console.log(cursor)})
   //Update
   //Search gathering by id and update the other fields
   //TODO: allow update of only one field at a time
   app.post('/gatherings-update', (req, res) => {
    gatheringsCollection.findOneAndUpdate({_id: ObjectId(req.body.id),
                                           userId: req.body.userId},
                                        {
                                            $set: {
                                            name: req.body.name,
                                            latitude: req.body.latitude,
                                            longitude: req.body.longitude,
                                            description: req.body.description
                                            }
                                        },
                                        {
                                            //create gathering if none was found. Maybe this is not the expected behaviour?
                                            upsert: true
                                        }
                                        )
                        .then(result => {
                            console.log(result)
                            //do we need to return all this information?
                            res.send(result)
                        })
                        .catch(error => console.error(error))})
    //Delete
    //TODO: delete by name/latitude and longitude or by user maybe
    app.delete('/gatherings-delete', (req, res) => {
        gatheringsCollection.deleteOne({_id: ObjectId(req.body.id),
                                        userId: req.body.userId},
                                            )
                            .then(result => {
                                if(result.deletedCount != 0)
                                    res.json("Deleted record {0}".format(req.body.id))
                                else
                                    res.json("No records were found to be deleted")

                            })
                            .catch(error => console.error(error))})
                    }
                    );
                        

