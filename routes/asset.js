const express = require ('express');
const Boom = require('express-boom');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
let conn = mongoose.connection;
let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
let gfs;

router.get('/assetsNames', (req, res, next) => {
    gfs = Grid(conn.db);
    gfs.files.findOneAndDelete({
    
    }).then(function(model){
        res.send(model);
    }).catch(next);
  });

router.post('/asset', (req, res) => {
    gfs = Grid(conn.db);
    let part = req.files.file;
    let writeStream = gfs.createWriteStream({
        filename: 'img_' + part.name,
        mode: 'w',
        content_type: part.mimetype
    });
    writeStream.on('close', (file) => {
      if(!file) {
        res.status(400).send('No file received');
      }
        return res.status(200).send({
            message: 'Success',
            file: file
        });
    });
    writeStream.write(part.data, () => {
      writeStream.end();
    });  
});

router.get('/asset/:imgName', (req, res) => {
    gfs = Grid(conn.db);
    let imgname = req.params.imgName;
      gfs.files.find({
          filename: imgname
      }).toArray((err, files) => {
          if (files.length === 0) {
              return res.status(404).send({
                  message: 'File not found'
              });
          }
          let data = [];
          let readstream = gfs.createReadStream({
              filename: files[0].filename
          });
          readstream.on('data', (chunk) => {
              data.push(chunk);
          });
          readstream.on('end', () => {
              data = Buffer.concat(data);
              res.end(data);
          });
          readstream.on('error', (err) => {
              res.status(500).send(err);
              console.log('An error occurred!', err);
          });
      });
  });

  router.delete('/asset/:imgName', function(req, res, next){

   gfs = Grid(conn.db);
   gfs.files.findOneAndDelete({
        filename: imgname
   }).then(function(model){
        res.send(model);
   }).catch(next);
});







module.exports = router;