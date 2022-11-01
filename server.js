import express from "express";
import morgan from "morgan";
import session from "express-session";
import bodyparser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./server/database/connection.js";
import router from "./server/routes/router.js";

const __dirname = fileURLToPath(import.meta.url);

const app = express();

let PORT = process.env.PORT || 3000;
if (PORT == null || PORT == "") {
  PORT = 3000;
}

// log request
app.use(morgan("tiny"));

// init session
// change this when on production
app.use(
  session({
    secret: "tweet for reading",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set pages view
app.use(express.static(path.join(__dirname, "views")));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", router);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

// mongdb connection
connectDB();

export default app;
