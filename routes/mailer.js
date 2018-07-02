const express = require ('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', function(req, res, next){

    var transporter=nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD    
        
        }
    })

    var mailOptions={
        from: 'User <'+process.env.EMAIL_USERNAME+'>',
        to: process.env.EMAIL_USERNAME,
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