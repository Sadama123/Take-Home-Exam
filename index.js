import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from "axios";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

function userCheck(req, res, next) {
  const username = req.body["username"]
    const password = req.body["password"];
    if (username === "admin" && password === "thereisnopassword") {
      userIsAuthorised = true;
      //temporary login
    }
    next();
  }
 app.use(userCheck);

 app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
 
  });


  app.post("/submit", (req, res) => {
    if (userIsAuthorised) {
      res.render(__dirname + "/public/item.ejs");
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  