const express = require('express');
const path = require('path');
const route = express.Router();
const controller = require('../controller/controller');

route.get('/', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/index.html')));
})

route.get('/student', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/detail.html')));
})

// API
route.post('/api/student', controller.create);
route.get('/api/students', controller.find);

module.exports = route;