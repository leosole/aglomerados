const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const url =
  "mongodb+srv://defaultService:dMU5r3U$TsssVV8@aglo1.xllzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
module.exports= new MongoClient(url);
