var express = require("express");
var validUrl = require("valid-url");
var mongo = require("mongodb").MongoClient
var objectId = require('mongodb').ObjectID;

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'))

// Really ought to be using POST, but using GET for easier demonstration.
app.get(/\/new\/(.*)/, function(req, res){
    var url = req.params[0];
    if(validUrl.isWebUri(url)){
        mongo.connect("mongodb://fcc-short:qazwsxedc@ds045465.mongolab.com:45465/urldb", function(err, db){
            if(err){
                console.log("Error connecting to db.")
                throw err;
            }
            db.collection('urls').insertOne({
                originalUrl: url
            }, function(err, result){
                if(err){
                    console.log("Error inserting record.")
                    throw err;
                }
                res.json({originalUrl: url, shortUrl: "https://" + req.hostname + "/" + result.insertedId});
                res.end();
                db.close();
            });
        });
    } else res.json({error: "Supplied URL is not valid."}).end();
});

app.get("/:id", function(req, res){
    var id = req.params.id;
    var url;
    mongo.connect("mongodb://fcc-short:qazwsxedc@ds045465.mongolab.com:45465/urldb", function(err, db){
        if(err) throw err;
        try{
            var objId = new objectId(id);
        } catch(e) {
            res.json({error: "Invalid object id"});
            res.end();
        }
        db.collection('urls').findOne({_id: objId}, function(err, result){
            if(err) throw err;
            if(result){
                res.redirect(result.originalUrl);
                res.end();
                db.close();
            }
            
        });
    });
});

app.listen(port, function(){
    console.log("App is listening on port " + port);
});

