const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;


let word_db, highscore_db; 

module.exports = {
    connectToServer: function (callback) {
        console.log("Attempting to Connect");
        // Create a mongoClient with a MongoClientOptions object to set the stable API version 
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        async function run() {
            try {
                // Connect t oclient to the server 
                await client.connect();
                // Send a ping to confirm a successful db connection
                await client.db('admin').command({ ping: 1 });
                console.log("Pinged your deployment. You successfully conect to MongoDb!");

                // This gives us access to our word database
                word_db = client.db('hangman-words');
                console.log("Successfully connected to hangman words database");
                
                // This gives us access to our highscore database
                highscore_db = client.db('hangman-highscores');
                console.log("Successfully connected to hangman high scores database");
            } finally {
                // Ensures that the client will close when you finish/error
                // console.log("Closing the client");
                // await client.close();
            }
        }
        run().catch(console.dir); 
    },

    getWordDb: function () {
        return word_db; 
    },
    getHighScoreDb: function () {
        return highscore_db; 
    },
};