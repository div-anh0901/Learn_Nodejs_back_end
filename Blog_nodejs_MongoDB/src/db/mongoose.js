const mongoose = require("mongoose");

async function connnectDB() {
  try {
    await mongoose.connect("mongodb://localhost/Blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect database Successfull!");
  } catch (e) {
    console.log("Connect False!!")
  }
}


module.exports = {connnectDB};