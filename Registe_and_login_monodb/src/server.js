const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const port = 4000;

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost/User", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("ConnectDB Susseccfully");
  } catch (e) {
        console.log("falese");
  }
}

{connectDB()}

app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(__filename + "/views"));

var index = require('./routes/index');
app.use('/',index);


 //catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => console.log(`Example app listening on port port!`));
