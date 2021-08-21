var client = require( './../Common/mongoDbClient.js' );

async function run() {
    try {
      await client.connect();
      const database = client.db('sample_mflix');
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Back to the Future' };
      const movie = await movies.findOne(query);
      console.log(movie);
      console.log("demorou");
    } finally {
      // Ensures that the client will close when you finish/error
      console.log("finally");
      await client.close();
    }
  }
  run().catch(console.dir);