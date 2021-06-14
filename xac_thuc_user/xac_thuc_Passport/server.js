const express = require('express');

const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStraegy = require('passport-local').Strategy;
const  session = require('express-session'); 
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:"mysecret",
    cookie:{
        maxAge: 1000*60 *5
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine','ejs');
app.get('/', (req, res)=>{
    res.render('index');
});
app.route('/login')
.get((req,res)=> res.render('login'))
.post(passport.authenticate('local',{
    failureRedirect : '/login',
    successRedirect:"/loginOK"
}));

app.use('/private',(req,res)=>{
    if(req.isAuthenticated()){
        res.send('welcome to private');
    }else{
        res.send("ban chua login")
    }
})
app.get("/loginOK",(req,res)=>{
    res.send("ban da nhap thanh cong");
});

passport.use(new LocalStraegy(
     (username,password, done) =>{
        fs.readFile('./userDB.json',(err,data)=>{
            const db = JSON.parse(data);
            const userRecord =  db.find(user => user.usr == username);
            if(userRecord && userRecord.pwd == password){
                return done(null, userRecord);
            }
            else{
                return done(null,false);
            }
        });
    }
));

passport.serializeUser((user,done)=>{
    done(null,user.usr);
});

passport.deserializeUser((name,done)=>{
    fs.readFile('./userDB.json',(err,data)=>{
        const db = JSON.parse(data);
        const userRecord =  db.find(user => user.usr == name);
        if(userRecord){
            return done(null,userRecord);
        }
        else{
            return done(null,false);
        }
    });
})
app.listen(port, () => console.log(`Example app listening on port port!`))