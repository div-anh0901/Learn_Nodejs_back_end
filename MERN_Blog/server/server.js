require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const authRouter = require('./router/auth');
const postRouter = require('./router/post');
const cors = require('cors');
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost/mern_learn',{
            useCreateIndex : true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify: false
        })
        console.log("ConnectDB SuccessFully!!");
    } catch (e) {
        console.log("False!!");
    }
}

connectDb();
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


app.listen(port, () => console.log(`Example app listening on port port!`));