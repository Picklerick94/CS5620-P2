const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/index.html')));
})

route.get('/student', (req,res) =>{
  res.sendFile(path.resolve(path.join(process.cwd(), '/views/detail.html')));
})

module.exports = route;