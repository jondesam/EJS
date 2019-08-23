const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//root route //
app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list.ejs", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);

  //let item = req.body.newItem;

  if (req.body.list === "work") { // check < name="list" value= <%= listTitle %> >.....if name is "list" and value starts with "work"
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

// work page //

app.get("/work", function(req, res) {
  res.render("list.ejs", {
    listTitle: "work list",
    newListItems: workItems
  })
});

app.post("/work", function(req, res) {

  //let item = req.body.newItem;

  workItems.push(req.body.newItem);
  res.redirect("/work");

});

// about page//

app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on part 3000");
});
