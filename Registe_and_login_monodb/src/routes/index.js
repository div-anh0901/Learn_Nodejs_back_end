var express = require("express");
var router = express.Router();
var User = require("../model/user");

router.get("/", function (req, res, next) {
  return res.render("index.ejs");
});

router.post("/", function (req, res, next) {
  console.log(req.body);

  var personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  }else{
      if(personInfo.password === personInfo.passwordConf){
          User.findOne({email: personInfo.email}, function(err,data){
              if(!data){
                  var c ;
                  User.findOne({},function(err,data){
                      if(data){
                          console.log("if");
                          c = data.unique_id +1;
                      }else{
                          c =1;
                      }

                      var NewPerson = new User({
                          unique_id : c,
                          email : personInfo.email,
                          username : personInfo.username,
                          password : personInfo.password,
                          passwordConf : personInfo.passwordConf
                      })

                      NewPerson.save(function(err,Person){
                          if(err){
                              consolog.log(err);
                          }else{
                              console.log("Success");
                          }
                      });
                  }).sort({_id: -1}).limit(1);
                  res.send({"Success": "You are regestered ,You can login now"})
              }else{
                res.send({"Success": "Email is already used."})
              }
          })
      }else{
        res.send({"Success":"password is not matched"});
      }
  }
});

module.exports = router;
