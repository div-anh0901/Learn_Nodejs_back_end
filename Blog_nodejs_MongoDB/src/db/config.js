const express = require("express");

let ConfigViewEngine = (app)=>{
    app.set("view engine","ejs");
    app.set("views","./src/views");
}

module.exports = ConfigViewEngine;