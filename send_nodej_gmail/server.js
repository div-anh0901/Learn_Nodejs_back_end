const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const port = 3000;

//view engine

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.render("contact"));

app.post('/send', (req,res)=>{
    console.log(req.body);
    const output =`
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name : ${req.body.name}</li>
        <li>Name : ${req.body.company}</li>
        <li>Name : ${req.body.email}</li>
        <li>Name : ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.YOURDOMAIN.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'anhhvth2010043@fpt.edu.vn', // generated ethereal user
        pass: '12345678@'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <anhhvth2010043@fpt.edu.vn>', // sender address
      to: 'anh.dev.2002@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent'});
});
});
 
 
app.listen(port, () => console.log(`Example app listening on port port!`))