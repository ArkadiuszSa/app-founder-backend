const express = require ('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', function(req, res, next){

    var transporter=nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        auth:{
            user:'app.founder.contact@gmail.com',
            pass:'app-founder1'    
        
        }
    })

    var mailOptions={
        from: 'User <app.founder.contact@gmail.com>',
        to:'app.founder.contact@gmail.com',
        subject:'User: '+req.body.userEmail+' sended message.',
        text:req.body.message
    }
    transporter.sendMail(mailOptions,function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log('poszlo')
        }

    })
    res.send({respone:'OK'})
})
module.exports = router;