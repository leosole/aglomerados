const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const { MongoClient } = require("mongodb");
const helper = require('./helperFunctions.js');
var ObjectId = require('mongodb').ObjectId;
const { query } = require('express');

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

var keys = JSON.parse(fs.readFileSync('./keys.json'))

app.listen(3030,function() {
    console.log('listening on 3030')

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
  app.post('/gatherings', (req, res) => {
    //dummy userid while user management is not available
    req.body.UserId = 1
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        position: {
            lat: parseFloat(req.body.latitude),
            lng: parseFloat(req.body.longitude)
        },
        info: [
            {
                key: 'descrição', 
                value: req.body.description
            }
        ],
        frequency: {
            sunday: req.body.week.sunday,
            monday: req.body.week.monday,
            tuesday: req.body.week.tuesday,
            wednesday: req.body.week.wednesday,
            thursday: req.body.week.thursday,
            friday: req.body.week.friday,
            saturday: req.body.week.saturday,
            monthWeek: req.body.todo,
            monthWeekDay: req.body.month
            },
            time: req.body.time,
            date: req.body.date 
    }
    console.log(req.body)
    console.log(data)
    gatheringsCollection.insertOne(data)
                        .then(result => {
                            console.log(result)
                            res.send({result,data})
                        })
                        .catch(error => console.error(error))})

   //Read by filter
   app.get('/gatherings', cors(), (req, res) => {
        const cursor = gatheringsCollection.find().toArray()
        .then(results => {
            //sends gatherings as a jsons
            res.send(results.filter(gathering => filterCriteria(req.query,gathering)))   
        })
    })
    //Read by id
    app.get('/gatherings:id', cors(), (req, res) => {

        if(req.params.id && req.params.id.length == 25)
        {
            var good_id = new ObjectId(req.params.id.replace(":",""))
            const cursor = gatheringsCollection.find({_id: good_id}).toArray()
            .then(results => {
                //sends gatherings as a jsons
                res.send(results)   
            })
        }
        })

    function filterCriteria(value,gathering) {

        var geolocFilter = false
        //filter by geolocation
        if(value.minLat && value.minLng && value.maxLat&& value.maxLng )
        {
            //TODO: Avoid querying the same areas multiple times, maybe query only when there is a substantial deplacement
            if(parseFloat(gathering.position.lat) < parseFloat(value.maxLat)
                && parseFloat(gathering.position.lat) > parseFloat(value.minLat)
                && parseFloat(gathering.position.lng) < parseFloat(value.maxLng)
                && parseFloat(gathering.position.lng) > parseFloat(value.minLng))
                {
                    geolocFilter = true
                }
        }
        //filter by day of the week
        weekFilter = true
        if(value.week && (value.week.monday  || value.week.tuesday  ||value.week.wednesday ||value.week.thursday ||value.week.friday ||value.week.saturday ||value.week.sunday ))
        {
            console.log("entrou no weekfilter")

            weekFilter = false
            if(value.week.monday && (gathering.frequency.monday || gathering.monthWeekDay == "monday"))
                weekFilter = true
            if(value.week.tuesday && (gathering.frequency.tuesday || gathering.monthWeekDay == "tuesday"))
                weekFilter = true
            if(value.week.wednesday && (gathering.frequency.wednesday || gathering.monthWeekDay == "wednesday"))
                weekFilter = true
            if(value.week.thursday && (gathering.frequency.thursday|| gathering.monthWeekDay == "thursday"))
                weekFilter = true
            if(value.week.friday && (gathering.frequency.friday || gathering.monthWeekDay == "friday"))
                weekFilter = true
            if(value.week.saturday && (gathering.frequency.saturday || gathering.monthWeekDay == "saturday"))
                weekFilter = true
            if(value.week.sunday && (gathering.frequency.sunday || gathering.monthWeekDay == "sunday"))
                weekFilter = true
        }

        //filter by day
        dayFilter = true
        if(value.date)
        {
            console.log("entrou no dayfilter")
            dayFilter = false
            weekDay = new Date(value.date).getDay()
            if((weekDay == 0 && gathering.frequency.sunday)||
               (weekDay == 1 && gathering.frequency.monday)||
               (weekDay == 2 && gathering.frequency.tuesday)||
               (weekDay == 3 && gathering.frequency.wednesday)||
               (weekDay == 4 && gathering.frequency.thursday)||
               (weekDay == 5 && gathering.frequency.friday)||
               (weekDay == 6 && gathering.frequency.saturday)||
               value.date == gathering.date)
               dayFilter = true
        }

        //filter by time
        timeFilter = true
        if(value.minTime && value.maxTime )
        {
            console.log("entrou no timefilter")

            timeFilter = false
            if(gathering.time < value.maxTime && gathering.time > value.minTime )
                timeFilter = true
        }

      
        //add other filters here
        return geolocFilter && weekFilter && timeFilter && weekFilter &&dayFilter;
    }
   //Update
   //Search gathering by id and update the other fields
   //TODO: allow update of only one field at a time
   app.put('/gatherings', (req, res) => {
    gatheringsCollection.findOneAndUpdate({_id: ObjectId(req.body.id),
                                           userId: req.body.userId},
                                        {
                                            $set: {
                                            name: req.body.name,
                                            position: {
                                                lat: req.body.latitude,
                                                lng: req.body.longitude,
                                            },
                                            info: [
                                                {
                                                    key: 'descrição', 
                                                    value: req.body.description
                                                }
                                            ]
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
    app.delete('/gatherings', (req, res) => {
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
                        

