const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://defaultService:dMU5r3U$TsssVV8@aglo1.xllzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('test_db');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};

// async function runMongodbQuery() {
//   try {
//     await client.connect();
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//     return movie['rated'] 
//   } finally {
//      // await client.close();

//   }
// }
//run().catch(console.dir);