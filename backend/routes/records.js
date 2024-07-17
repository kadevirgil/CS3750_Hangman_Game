const express = require('express');

const routes = express.Router(); 

const { open } = require('node:fs/promises');

const file = open('../backend/words.txt');

// Connect to db
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Adding a new user/play session
routes.route('/records/add').post(async (req, res) =>{
    try {
        let db_connect = dbo.getDb();
        let myObj = {
            name: req.body.name,
            numGuesses: 0,
            lengthOfWord: 0
        };
        await db_connect.collection("highscores").insertOne(myObj);
        errorCode = 200;
        let status = "Success";
        res.status(errorCode).json(status);
            
        
    } catch (err) {
        throw err;
    }
})

// Getting all highscores for a given word length
routes.route('/records/highscores/:wordLength').get(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myQuery = { lengthOfWord: req.params.wordLength };
        const result = await db_connect.collection('highscores').find(myQuery).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// Generate a word from word list
routes.route('/records/generateWord').get(async (req, res) => {
    try {
        // Generate word logic here
        let number = Math.floor(Math.random() * 1001);
        let words = [];
        for await (const line of file.readLines()) {
            words.push(file[line]); 
        }
        console.log(words[number]);
        res.status(200).send(words[number]);
    } catch (err) {
        throw err;
    }
});

module.exports = routes; 