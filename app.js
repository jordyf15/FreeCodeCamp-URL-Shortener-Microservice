const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dns = require('dns');
const url = require('./models/url')
const connectionUrl="mongodb+srv://jordy15:jordy123@cluster0.rvfns.mongodb.net/<dbname>?retryWrites=true&w=majority"
const app = express();

mongoose.connect(connectionUrl,{useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{
    var countget=0;
    console.log('connected to database')
    app.set('view engine','ejs')
    app.use(express.static(__dirname+'/public'));
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/',(req,res)=>{
        url.findOne({short_url: countget})
        .then((result)=>{
            res.render(__dirname+'/views/index.ejs',{original_url: result.original_url, short_url: result.short_url});
        })
    })

    app.post('/api/shorturl/new',(req,res)=>{
        //we have to put this on try catch since new URL will throw an error if the input is not a url
        try{
            const urlObject = new URL(req.body.url);
            dns.lookup(urlObject.hostname,(err,address,family)=>{
                url.countDocuments({})//count how many document for short_url
                .catch((err)=>{//error handling for countDocuments
                    console.error(err);
                })
                .then((result)=>{
                    var createurl = new url({
                    original_url: req.body.url,
                    short_url: result
                    })
                    return createurl.save()
                })
                .catch((err)=>{//since the the original_url was set to unique true it will return an error if 
                    //we tried to create the same original_url
                    //if already created than it will find it and return it
                    return url.findOne({original_url: req.body.url})
                })
                .then((result)=>{//then for save() or findOne if error
                    res.json({
                        original_url: result.original_url,
                        short_url: result.short_url,//number of document in collection
                    })
                    // res.redirect('/')
                    countget=result.short_url;
                })
            })
        }
        catch(error){
            res.json({
                error: "invalid URL"
            })
            // res.redirect('/')
        }
    })

    app.get('/api/shorturl/:short_url',(req,res)=>{
        url.findOne({short_url: req.params.short_url})
        .then((result)=>{
            res.redirect(result.original_url);
        })
        .catch((err)=>{//findone failed handling
            res.json({
                error: "No short URL found for the given input"
            })
        })
    })

})
.catch((err)=>{
    console.error(err);
})



app.listen(3000);