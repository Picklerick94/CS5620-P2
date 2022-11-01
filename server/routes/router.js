import express from "express";
import controller from "../controller/controller.js";
import bodyParser from "body-parser";
const route = express.Router();

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

export default route;
