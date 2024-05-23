import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));


function userCheck(req, res, next) {
  const username = req.body["username"]
    const password = req.body["password"];
    if (username === "admin" && password === "thereisnopassword") {
      userIsAuthorised = true;
    }
    next();
  }
 app.use(userCheck);

 app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
 
  });


  app.post("/submit", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/public/item.ejs");
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  