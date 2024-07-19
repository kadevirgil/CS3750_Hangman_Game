const express = require('express');

const routes = express.Router(); 

const fs = require('node:fs');

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
        req.session.name = req.body.name;
        console.log("In /add, session is: " + req.session.name + " with id: " + req.session.id);
        errorCode = 200;
        let status = "Successful login for " + req.session.name;
        console.log(status);
        res.status(errorCode).json(status);

            
        
    } catch (err) {
        throw err;
    }
})
// Loginng out of session
routes.route("/logout").get(async (req, res) => {
    console.log("In /logout, session is: " + req.session.name);
    if (req.session.name) {
        req.session.destroy();        
    }
    else {
        res.status(400).json("No session found");        
    }
    res.status(200).json("Logged out");
      
});

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
        fs.readFile('../backend/words.txt', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const words = data.split('\r\n'); 
            const randIndex = Math.floor(Math.random() * words.length);
            const word = words[randIndex]; 
            console.log(word);
            const jsonObject = {
                'word': word.toUpperCase(),
                'lengthOfWord': word.length,
            }
            res.status(200).json(jsonObject);
        });
    } catch (err) {
        throw err;
    }
});

// Session get 
routes.route("/user").get(async (req, res) => {
    try {        
        let db_connect = dbo.getDb();
        let myquery = { name: req.session.name};
        let status = await db_connect.collection("highscores").findOne(myquery); 
        console.log(status);       
        let errorCode = 200;
        if (!req.session.name || req.session.name == null) {
            errorCode = 400; 
            status ="No session exists";                
        }              
        res.status(errorCode).json(status);
        
    } catch (err) {
        throw err;
    }
});

module.exports = routes; 