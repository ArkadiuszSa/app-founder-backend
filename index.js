const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validator = require('express-validator');
const boom = require('express-boom');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const busboyBodyParser = require('busboy-body-parser');
var interceptor = require('express-interceptor');

var interceptor=interceptor((request,response)=>{
    return {
        isInterceptable: function(){
          if(request.baseUrl==='/api'&&(request.url==='/login'||request.url==='/register'||request.url==='/check-email')){
              return false;
          }else{
              return true;
          }  
        },
        intercept: (body, send) =>{
            var token = request.headers.authorization;
            
            jwt.verify(token,"secretPassword",((err, token) => {
                if(err){
                    res.boom.unauthorized('invalid token')
                }else{
                    send(body)
                }    
            }));
        }
    }
})


const app = express();
app.use(cors())
app.use(validator());
app.use(boom());
app.use(interceptor);

app.get('/', (req, res) => res.send('AppFounder api is online!'))

//mongoose.connect('mongodb://admin:admin@ds157528.mlab.com:57528/app_founder');
mongoose.connect('mongodb://admin:admin1@ds161780.mlab.com:61780/app-founder-production');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '10mb' }) );
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/project'));
app.use('/api', require('./routes/team'));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/asset'));
app.use('/api', require('./routes/invitation'));
app.use('/api', require('./routes/offer'));

app.use('/assets/img', express.static(__dirname+'/assets/img'))

app.listen(process.env.PORT || 4000, function(){
    console.log('now listening for requests');
});