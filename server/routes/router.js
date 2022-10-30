const express = require('express');
const path = require('path');
const route = express.Router();
const controller = require('../controller/controller');
let bodyParser = require('body-parser');

route.use(bodyParser.json());

route.get('/', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/index.html')));
})

route.get('/student', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/detail.html')));
})

// API
route.post('/api/student', controller.create);
route.get('/api/students', controller.find);
route.get('/api/students/:id', controller.findOne);
route.put('/api/students/:id', controller.update);
route.delete('/api/students/:id', controller.delete);

module.exports = route;