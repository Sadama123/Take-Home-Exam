import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
const itemsJSON= '[{"ProductCode":1,"Stocks:":33,"Name":"rice","Category":"Pasta, Rice & Cereal","Cost":50,"Selling price":60},{"ProductCode":2,"Stocks:":55,"Name":"salt","Category":"Condiments & Spices","Cost":20,"Selling price":25},{"ProductCode":3,"Stocks:":18,"Name":"cooking oil","Category":"Condiments & Spices","Cost":25,"Selling price":30},{"ProductCode":4,"Stocks:":38,"Name":"coffee","Category":"Beverages","Cost":15,"Selling price":20},{"ProductCode":5,"Stocks:":56,"Name":"sugar","Category":"Condiments & Spices","Cost":60,"Selling price":70},{"ProductCode":6,"Stocks:":42,"Name":"bread","Category":"pastry","Cost":15,"Selling price":20},{"ProductCode":7,"Stocks:":57,"Name":"onion","Category":"Vegetables","Cost":10,"Selling price":12},{"ProductCode":8,"Stocks:":56,"Name":"garlic","Category":"Vegetables","Cost":5,"Selling price":7},{"ProductCode":9,"Stocks:":58,"Name":"eggs","Category":"dairy","Cost":5,"Selling price":10},{"ProductCode":10,"Stocks:":24,"Name":"pork meat","Category":"MEAT","Cost":350,"Selling price":400},{"ProductCode":11,"Stocks:":45,"Name":"beef meat","Category":"MEAT","Cost":400,"Selling price":450},{"ProductCode":12,"Stocks:":12,"Name":"chicken meat","Category":"MEAT","Cost":250,"Selling price":300},{"ProductCode":13,"Stocks:":89,"Name":"vinegar","Category":"Condiments & Spices","Cost":10,"Selling price":15},{"ProductCode":14,"Stocks:":74,"Name":"ajinomoto","Category":"Condiments & Spices","Cost":5,"Selling price":7},{"ProductCode":15,"Stocks:":46,"Name":"instant noodles","Category":"Pasta, Rice & Cereal","Cost":15,"Selling price":20},{"ProductCode":16,"Stocks:":45,"Name":"biscuits","Category":"pastry","Cost":10,"Selling price":15},{"ProductCode":17,"Stocks:":15,"Name":"tomatoes","Category":"Vegetables","Cost":6,"Selling price":8},{"ProductCode":18,"Stocks:":78,"Name":"eggplant","Category":"Vegetables","Cost":10,"Selling price":15},{"ProductCode":19,"Stocks:":72,"Name":"powedered milk","Category":"Beverages","Cost":25,"Selling price":30}]';
var userIsAuthorised = false;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

let data;

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

 app.post("/submit", (req, res) => {
  if (userIsAuthorised) {
    res.render(__dirname + "/public/item.ejs");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.get("/", (req, res) => {
  res.render("item.ejs", { items: data });
});

app.post("/check", (req, res) => {
  switch (req.body.select) {
    case "ProductCode":
      data = JSON.parse(itemsJSON)[0];
      break;
    case "Stocks":
      data = JSON.parse(itemsJSON)[1];
      break;
    case "Name":
      data = JSON.parse(itemsJSON)[2];
      break;
      case "Description":
      data = JSON.parse(itemsJSON)[3];
      break;
      case "Cost":
      data = JSON.parse(itemsJSON)[4];
      break;
      case "Selling price":
      data = JSON.parse(itemsJSON)[5];
      break;
  
    default:
      break;
    }
    res.render(__dirname + "/public/item.ejs");
  });


 app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
 
  });


  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  