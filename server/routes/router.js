const express = require("express");
const path = require("path");
const route = express.Router();
<<<<<<< Updated upstream
const controller = require('../controller/controller');
let bodyParser = require('body-parser');

route.use(bodyParser.json());
=======
const controller = require("../controller/controller");
>>>>>>> Stashed changes

// route.get("/", (req, res) => {
//   // res.sendFile(path.resolve(path.join(process.cwd(), '/views/index.html')));
//   res.redirect("/views/index.html");
// });

route.get("/student", (req, res) => {
  res.redirect("/detail.html");
});

// API
<<<<<<< Updated upstream
route.post('/api/student', controller.create);
route.get('/api/students', controller.find);
route.get('/api/students/:id', controller.findOne);
route.put('/api/students/:id', controller.update);
route.delete('/api/students/:id', controller.delete);

route.get('/api/getCurrUser', controller.login);
route.post('/api/authenticate', controller.authenticate);
=======
route.post("/api/student", controller.create);
route.get("/api/students", controller.find);
>>>>>>> Stashed changes

module.exports = route;
