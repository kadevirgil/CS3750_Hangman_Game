const express = require('express');

const routes = express.Router(); 
// Connect to db
const dbo = require('../db/conn');
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//Adding a new user/play session
routes.route('/records/add').post(async (req, res) =>{
    try{
        let db_connect = dbo.getDb();
        let myobj = {
            name: req.body.name,
            numGuesses: 0,
            lengthOfWord: 0
        };
        const account = await db_connect.collection("records").insertOne
        errorCode = 200;
        let status = "success";
        res.status(errorCode).json(status);
            
        
    } catch(err){
        throw err;
    }
    
    

    res.status(errorCode).json({
        status: status
    });
})

module.exports = routes; 