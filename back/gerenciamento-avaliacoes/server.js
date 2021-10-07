const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const { query } = require('express');

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

var keys = JSON.parse(fs.readFileSync('./keys.json'))

app.listen(3040,function() {
    console.log('listening on 3040')

})

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a
  }


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
     //do stuff
})


  //DB connection string
var uri = 'mongodb+srv://defaultService:' + keys.mongoDB + '@aglo1.xllzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const databaseName = "reviews";

MongoClient.connect(uri, { useUnifiedTopology: true })
.then(client =>{
  console.log("Connection established - All well")
  const db = client.db(databaseName)
  const reviewsCollection = db.collection('reviews')

  //Create
  app.post('/reviews', (req, res) => {
    //dummy userid while user management is not available
    const data = {
        userID: req.query.userID,
        title: req.query.title,
        gatheringId: req.query.gatheringId,
        comment: req.query.comment,
        rating: req.query.rating,
        time: Date.now()
    }
   // console.log(req)
    reviewsCollection.insertOne(data)
                        .then(result => {
                            console.log(result)
                            res.send({result,data})
                        })
                        .catch(error => console.error(error))})

   //Read by filter
   app.get('/reviews', cors(), (req, res) => {
       console.log(req)
        const cursor = reviewsCollection.find().toArray()
        .then(results => {
            //sends gatherings as a jsons
            res.send(results.filter(gathering => filterCriteria(req.query,gathering)))   
        })
    })

    //Read by id
    app.get('/reviews:id', cors(), (req, res) => {

        if(req.params.id && req.params.id.length == 25)
        {
            var good_id = new ObjectId(req.params.id.replace(":",""))
            const cursor = reviewsCollection.find({_id: good_id}).toArray()
            .then(results => {
                //sends gatherings as a jsons
                res.send(results)   
            })
        }
        })

    function filterCriteria(value,gathering) {
console.log(value)
        var gatheringFilter = true
        if(value.body.gatheringId != gathering.Id)
            return false
        return gatheringFilter
    }
   //Update
   //Search review by id and update the other fields
   //TODO: allow update of only one field at a time
   app.put('/reviews', (req, res) => {
    gatheringsCollection.findOneAndUpdate({_id: ObjectId(req.body.id),
                                           userId: req.body.userId},
                                        {
                                            $set: {
                                            rating: req.body.rating,
                                            comment: req.query.comment,
                                            title: req.query.title,
                                            }
                                        },
                                        {
                                            upsert: false
                                        }
                                        )
                        .then(result => {
                            res.send(result)
                        })
                        .catch(error => console.error(error))})
    //Delete by comment id
    app.delete('/reviews', (req, res) => {
        reviewsCollection.deleteOne({_id: ObjectId(req.body.id),
                                        userId: req.body.userId},
                                            )
                            .then(result => {
                                if(result.deletedCount != 0)
                                    res.json("Deleted record {0} from reviews DB".format(req.body.id))
                                else
                                    res.json("No records were found to be deleted")

                            })
                            .catch(error => console.error(error))})
                    }
                    );
                        

