const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const url =
  "mongodb+srv://defaultService:<password>@aglo1.xllzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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