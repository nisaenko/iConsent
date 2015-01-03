/**
 * Created by nisaenko on 14-12-28.
 */
var express = require('express');
    app = express();



app.use(express.static('bower_components'));
app.use(express.static('client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

app.listen(3000, function () {
    console.log("iConsent Server is listening port 3000");
});