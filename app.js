var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    path = require('path')
    Server = require('mongodb').Server;
    
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('highscore');

app.get('/', function(req, res){

    // Find one document in our collection
    db.collection('highscore').findOne( {}, function(err, doc) {

        if(err) throw err;

        res.render('bejeweled', doc);
    });
});

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
});

mongoclient.open(function(err, mongoclient) {

    if(err) throw err;

    app.listen(8080);
    console.log('Express server started on port 8080');
});
