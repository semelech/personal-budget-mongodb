const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
const budgetsModel = require("./budget_schema");
let url = 'mongodb://127.0.0.1:27017/pbudget';
app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the database");
            budgetsModel.find({})
                .then((data) => {
                    res.status(200).send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                    res.status(500).send();
                    mongoose.connection.close();
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
            mongoose.connection.close();
        });

});

app.post('/addBudget', (req, res) => {
    let newData = new budgetsModel({ title: req.body[0].title, value: req.body[0].value, color: req.body[0].color });
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the database");
            budgetsModel.insertMany(newData)
                .then((data) => {
                    console.log(data);
                    res.send("Data inserted successfully");
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                    res.send(connectionError);
                    mongoose.connection.close();
                });

        })
        .catch((connectionError) => {
            console.log(connectionError);
            mongoose.connection.close();
        });
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});