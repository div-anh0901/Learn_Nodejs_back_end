const fs = require("fs");

fs.readFile("./first.txt", "utf-8",(err,data)=>{
        if(err) {
            return console.log("error");
        }
        console.log(data);
});
