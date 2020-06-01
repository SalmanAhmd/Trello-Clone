const express = require("express");
const app = express();
const PORT = process.env.PORT || 9091;
const HOST = "0.0.0.0";
const mongoose = require("mongoose");
var cors = require("cors");

// var cookieParser = require("cookie-parser");

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(cors());


mongoose.connect(
  "mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
let db = mongoose.connection;

// check DB connection
db.once("open", function () {
  console.log("connected to mongodb");
});

//check for DB errors
db.on("error", function (err) {
  console.log(err);
});

app.use("/trello", require("./Controller/trello"));

//Port
app
  .listen(PORT, HOST, function () {
    console.log("Started : ", PORT);
  })
  .on("error", function (err) {
    console.log("Unable To Start App >>>", err);
  });