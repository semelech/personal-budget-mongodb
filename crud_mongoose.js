const mongoose = require("mongoose");
const budgetsModel = require("./budget_schema");

let url = 'mongodb://127.0.0.1:27017/pbudget';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database - to insert initial data");
        let newData = new budgetsModel({ title: "Eat out", value: 90, color: "#ffcd56" });
        let newData1 = new budgetsModel({ title: "Rent", value: 300, color: "#ff6384" });
        let newData2 = new budgetsModel({ title: "Grocery", value: 110, color: "#36a2eb" });
        let newData3 = new budgetsModel({ title: "Water", value: 30, color: "#fd6b19" });
        let newData4 = new budgetsModel({ title: "Electricity", value: 100, color: "#964b00" });
        let newData5 = new budgetsModel({ title: "Pet", value: 20, color: "#800080" });
        let newData6 = new budgetsModel({ title: "Shopping", value: 120, color: "#355e3b" });

        budgetsModel.insertMany([newData, newData1, newData2, newData3, newData4, newData5, newData6])
            .then((data) => {
                console.log(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
    })
    .catch((connectionError) => {
        console.log(connectionError);
    })