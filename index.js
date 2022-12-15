"use strict";

const path = require("path");
const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));
const dataStorage = new Datastorage();


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use(express.urlencoded({ extended: false }));
const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));
app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allCustomers", { result: data }))
);
app.get("/getCustomer", (req, res) => {
  res.render("getCustomer", {
    title: "Get",
    header1: "Get",
    action: "/getCustomer",
  });
});
app.post("/getCustomer", (req, res) => {
  if (!req.body) return res.sendStatus(500);
  const customerId = req.body.id;
  dataStorage
    .getOne(customerId)
    .then((customer) => res.render("CustomerPage", { result: customer }))
    .catch((error) => sendErrorPage(res, error));
});
app.get("/inputform", (req, res) =>
  res.render("form", {
    title: "add a customer",
    header1: "Input data of a new customer",
    action: "/input",
    customerId: { value: "", readonly: "" },
    firstname: { value: "", readonly: "" },
    lastname: { value: "", readonly: "" },
    favouriteIceCream: { value: "", readonly: "" },
    customerclass: { value: "", readonly: "" },
  })
);
app.post("/input", (req, res) => {
  if (!req.body) return res.statusCode(500);
  dataStorage
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});
app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Update Customer",
    header1: "Update customer data",
    action: "/updatedata",
    customerId: { value: "", readonly: "" },
    firstname: { value: "", readonly: "readonly" },
    lastname: { value: "", readonly: "readonly" },
    favouriteIceCream: { value: "", readonly: "readonly" },
    customerclass: { value: "", readonly: "readonly" },
  })
);

app.post("/updatedata", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  dataStorage
    .getOne(req.body.customerId)
    .then((customer) =>
      res.render("form", {
        title: "Update Customer",
        header1: "Update customer data",
        action: "/update",
        customerId: { value: customer.customerId, readonly: "readonly" },
        firstname: { value: customer.firstname, readonly: "" },
        lastname: { value: customer.lastname, readonly: "" },
        favouriteIceCream: { value: customer.favouriteIceCream, readonly: "" },
        customerclass: { value: customer.customerclass, readonly: "" },
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/update", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/removePerson", (req, res) =>
  res.render("getCustomer", {
    title: "Remove",
    header1: "Remove customer data",
    action: "/removePerson",
  })
);

app.post("/removePerson", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const personId = req.body.id;
  dataStorage
    .remove(personId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

function sendErrorPage(res, error, title = "Error", header1 = "Status") {
  sendStatusPage(res, error, title, header1);
}
function sendStatusPage(res, status, title = "Status", header1 = "Status") {
  return res.render("statusPage", { title, header1, status });
}
app.listen(port, host, () => console.log("Server at 3000 is listening"));
