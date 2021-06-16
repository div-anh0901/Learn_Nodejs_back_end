const express = require('express');
const ConfigViewEngine = require("./db/config");
const db = require("./db/mongoose");
const router = require("./routes/articles");
const app = express();
const port = 4000;


db.connnectDB();
app.use("/",router);
ConfigViewEngine(app);

app.listen(port, () => console.log(`Example app listening on port port!`));