const express = require("express");
const path = require("path");
const route = express.Router();
const controller = require("../controller/controller");
let bodyParser = require("body-parser");

route.use(bodyParser.json());

route.get("/student/:id", (req, res) => {
  res.redirect("/detail.html?id=" + req.params.id);
});

// API
route.post("/api/student", controller.create);
route.get("/api/students", controller.find);
route.get("/api/students/:id", controller.findOne);
route.get("/api/search", controller.search);
route.put("/api/students/:id", controller.update);
route.delete("/api/students/:id", controller.delete);

route.get("/api/getCurrUser", controller.login);
route.post("/api/authenticate", controller.authenticate);

module.exports = route;
