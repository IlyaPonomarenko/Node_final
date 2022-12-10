"use strict";

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const customersData = require("./Ponomarenko_Ilia_customers.json");
//let newData = [];
//const customersDataParsed = JSON.parse(customersData)

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.render("home", {
    data: customersData,
  });
});

app.post("/", (req, res) =>{
  const newCustomerId = customersData.length+1;
  const newCustomerFirstName = req.body.firstname;
  const newCustomerLastName = req.body.lastname;
  const newCustomerIceCream = req.body.favouriteIceCream;
  const newCustomerClass = req.body.customerclass;
  customersData.push({
    customerId:newCustomerId,
    firstname:newCustomerFirstName,
    lastname:newCustomerLastName,
    favouriteIceCream:newCustomerIceCream,
    customerclass:newCustomerClass
  });
  // let writeData = JSON.stringify(newData)
  // fs.writeFile("Ponomarenko_Ilia_customers.json", writeData, err =>{
  //   if(err) throw err;
  //   console.log("New customer added")
  // })
  res.render("home", {
    data:customersData
  })
})
app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
}) 