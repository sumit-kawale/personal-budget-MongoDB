const { EWOULDBLOCK } = require('constants');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const mongoose = require('mongoose')
const nameModel = require("./names_schema")
let url = 'mongodb://localhost:27017/chartData';

app.use('/', express.static('public'));
app.use(express.json());

app.get('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to the database")
            nameModel.find({})
                    .then((data) => {
                        console.log(data)
                        res.json(data);
                        mongoose.connection.close()
                    })
                    .catch((connectionError) => {
                        console.log(connectionError)
                    });
        })
        .catch((connectionError) => {
            console.log(connectionError)
        });
    });

    app.post('/budget', (req, res) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                var budgetData = new nameModel({
                    title: req.body.title,
                    budget: req.body.budget,
                    backgroundColor: req.body.backgroundColor
                });
    
                nameModel.insertMany(budgetData)
                    .then((data) => {
                        res.json(data);
                        mongoose.connection.close();
                    })
                    .catch((connectionError) => {
                        console.log(connectionError);
                    });
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
    });
        
        app.listen(port, () => {
            console.log(`API served at http://localhost:${port}`);
        });

// let budgetdata=require('./budgetdata.json');

// app.get('/budget', (req, res)=>{
//     res.json(budgetdata);
// });

// app.listen(port, () =>{
//     console.log(`API served at http://localhost:${port}`);
// });