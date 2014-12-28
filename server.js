/**
 * Created by nisaenko on 14-12-28.
 */
var express = require('express');
    app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/js', function(req, res){
    res.sendFile(__dirname + '/client/js');
});

app.listen(3000, function () {
    console.log("iConsent Server is listening port 3000");
});