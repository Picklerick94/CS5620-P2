const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyparser = require('body-parser');
const path = require('path');
const route = express.Router();
const connectDB = require('./server/database/connection');

const app = express();

const PORT = process.env.PORT || 8080;
if (PORT == null || PORT == "") { PORT = 3000; }

// log request
app.use(morgan('tiny'));

// init session
// change this when on production
app.use(session({
  secret: 'tweet for reading',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set pages view
app.use(express.static(path.join(__dirname, "views")));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`)
});

// mongdb connection
connectDB();