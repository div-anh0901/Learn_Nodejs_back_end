const express = require('express')
const app = express()
const port = 3000


while(true){
    app.get("/",(req,res,next)=>{
        res.send("1");
     })
}


app.listen(port, () => console.log(`Example app listening on port port!`));