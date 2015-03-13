var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var jsonParser = bodyParser.json();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ keys: ['secretkey1', 'secretkey2', '...']}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'bower_components')));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Connect mongoose
mongoose.connect('mongodb://127.0.0.1:27017/iconsent', function(err) {
  if (err) {
    console.log('Could not connect to mongodb on mongodb://127.0.0.1:27017/iconsent. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});


// Register routes
app.use('/', require('./routes'));

var Patient = require('./models/patient');
var Template = require('./models/template');
var Consent = require('./models/consent');



app.get('/patients_combo', function(req, res) {
    console.log("get patients combo invoked");
    console.log(req);

    var patients = 'patient';

    Patient.find().lean().exec(function (err, patients) {
        //return res.end("options: "+JSON.stringify(patients));
        var pluginPatientArray = new Array();
        var valueCounter=1;
        patients.forEach(function(currentPatient) {
            var arrayElement = new Object();
            arrayElement.value = currentPatient._id;
            arrayElement.text = currentPatient.firstName+" "+currentPatient.middleName+" "+currentPatient.lastName;
            pluginPatientArray.push(arrayElement);
            valueCounter++;
        });
        //res.end("{options: "+JSON.stringify(pluginPatientArray)+"}");
        res.end(JSON.stringify(pluginPatientArray));
    });


});

app.get('/patients', function(req, res) {
    console.log("get patients invoked");
    console.log(req);

    var patients = 'patient';

    Patient.find().lean().exec(function (err, patients) {
        return res.end("{ \"data\": "+JSON.stringify(patients)+", \"options\":[] }");
    });
});



app.post('/patients', jsonParser, function(req, res) {
    console.log("post patients invoked");


    console.log(req.body);
    console.log(req.body['action']);
    console.log(req.body['data[firstName]']);


    var newPatient = new Patient();
    newPatient.firstName = req.body['data[firstName]'];
    newPatient.middleName = req.body['data[middleName]'];
    newPatient.lastName = req.body['data[lastName]'];
    newPatient.address = req.body['data[address]'];
    newPatient.registrationDate = req.body['data[registrationDate]'];
    newPatient.dateOfBirth = req.body['data[dateOfBirth]'];

    newPatient.save(function (err) {
        if (err) return console.error(err);
    });

    res.json({ });
});

app.put('/patients',jsonParser, function(req, res) {
    console.log("put patients invoked");
    console.log(req.param('id'));
    console.log(req.body);
    console.log(req.body['action']);
    console.log(req.body['data[firstName]']);

    Patient.findById(req.param('id'), function (err, doc){

        doc.firstName = req.body['data[firstName]'];
        doc.middleName = req.body['data[middleName]'];
        doc.lastName = req.body['data[lastName]'];
        doc.address = req.body['data[address]'];
        doc.registrationDate = req.body['data[registrationDate]'];
        doc.dateOfBirth = req.body['data[dateOfBirth]'];

        doc.save(function (err) {
            if (err) return console.error(err);
        });
    });

    res.json({});
});

app.delete('/patients', function(req, res) {
    console.log("delete patients invoked");
    console.log(req.param('id'));

    Patient.findById(req.param('id'), function (err, doc){
        doc.remove();
    });

    res.json({});
});

app.get('/templates_combo', function(req, res) {
    console.log("get templates combo invoked");

    var templates = 'template';

    Template.find().lean().exec(function (err, templates) {
        var pluginTemplateArray = new Array();
        var valueCounter=1;
        templates.forEach(function(currentTemplate) {
            var arrayElement = new Object();
            arrayElement.value = currentTemplate._id;
            arrayElement.text = currentTemplate.templateName;
            pluginTemplateArray.push(arrayElement);
            valueCounter++;
        });
        res.end("{options: "+JSON.stringify(pluginTemplateArray)+"}");
    });

});

app.get('/templates', function(req, res) {
    console.log("get templates invoked");

    var templates = 'template';

    Template.find().lean().exec(function (err, templates) {
        return res.end("{ \"data\": "+JSON.stringify(templates)+", \"options\":[] }");
    });
});


app.post('/templates',jsonParser , function(req, res) {
    console.log("post templates invoked");
    console.log(req);
    console.log(req.body);
    console.log(req.user['username']);

    var newTemplate = new Template();

    newTemplate.templateName = req.body['data[templateName]'];
    newTemplate.templateVersion = 1;
    newTemplate.createdBy = req.user['username'];
    newTemplate.creationDate = Date.now();
    newTemplate.updatedBy = req.user['username'];
    newTemplate.dateOfUpdate = Date.now();
    newTemplate.consentFormTemplate = req.body['data[consentFormTemplate]'];

    newTemplate.save(function (err) {
        if (err) return console.error(err);
    });

    res.json({});

});

app.put('/templates', function(req, res) {
    console.log("put templates invoked");
    console.log(req);
    console.log(req.body);
    console.log(req.user['username']);

    Template.findById(req.param('id'), function (err, doc){

        doc.templateName = req.body['data[templateName]'];
        doc.templateVersion = Number(req.body['data[templateVersion]'])+1;
        doc.updatedBy = req.user['username'];
        doc.dateOfUpdate = Date.now();
        doc.consentFormTemplate = req.body['data[consentFormTemplate]'];

        doc.save(function (err) {
            if (err) return console.error(err);
        });

        return res.end("{ \"data\": "+JSON.stringify(doc)+", \"options\":[] }");
    });


});

app.delete('/templates', function(req, res) {
    console.log("delete templates invoked");

    console.log(req.param('id'));

    Template.findById(req.param('id'), function (err, doc){
        doc.remove();
    });

    res.json({
    });
});


app.get('/consents', function(req, res){
    console.log("get templates invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "firstName": "Lael",
                    "lastName": "Greer",
                    "middleName": "Systems Administrator",
                    "createdBy": "Nixon",
                    "templateName": "System Architect",
                    "templateVersion": "61",
                    "creationDate": "2011-04-25"
                },
                {
                    "DT_RowId": "row_2",
                    "firstName": "Michael",
                    "lastName": "Bruce",
                    "middleName": "Javascript Developer",
                    "createdBy": "Winters",
                    "templateName": "Accountant",
                    "templateVersion": "63",
                    "creationDate": "2011-07-25"
                },
                {
                    "DT_RowId": "row_3",
                    "firstName": "Hermione",
                    "lastName": "Butler",
                    "middleName": "Regional Director",
                    "createdBy": "Cox",
                    "templateName": "Junior Technical Author",
                    "templateVersion": "66",
                    "creationDate": "2009-01-12"
                }
            ],
            "options": []
        }
    );
});

app.post('/consents', function(req, res) {
    console.log("post users invoked");
    res.json({
        "DT_RowId": "row_2",
        "firstName": "Michael",
        "lastName": "Bruce",
        "middleName": "Javascript Developer",
        "createdBy": "Winters",
        "templateName": "Accountant",
        "templateVersion": "63",
        "creationDate": "2011-07-25"
    });
});



app.post('/users', function(req, res) {
    console.log("post users invoked");

    console.log(req);
    console.log(req.body);
    console.log(req.user['username']);

    var newAccount = new Account();
    newAccount.username = req.body['data[username]'];
    newAccount.name = req.body['data[name]'];
    newAccount.email = req.body['data[email]'];
    newAccount.role = req.body['data[role]'];
    newAccount.status = req.body['data[status]'];

    Account.register(newAccount, req.body['data[password]'], function(err) {
        if (err) { console.log('error while user register!', err); return next(err); }

        console.log('user registered!');

    });

    res.json({});
});


app.put('/users', function(req, res) {
    console.log("put users invoked");

    Account.findById(req.param('id'), function (err, doc){
        doc.remove();
    });

    var newAccount = new Account();
    newAccount.username = req.body['data[username]'];
    newAccount.name = req.body['data[name]'];
    newAccount.email = req.body['data[email]'];
    newAccount.role = req.body['data[role]'];
    newAccount.status = req.body['data[status]'];

    Account.register(newAccount, req.body['data[password]'], function(err) {
        if (err) { console.log('error while user register!', err); return next(err); }

        console.log('user updated!');

    });

    res.json({ });
});


app.delete('/users', function(req, res) {
    console.log("delete users invoked");

    console.log(req.param('id'));

    Account.findById(req.param('id'), function (err, doc){
        doc.remove();
    });

    res.json({});
});

app.get('/users', function(req, res){
    console.log("get users invoked");

    console.log("get templates invoked");

    var accounts = 'account';

    Account.find().lean().exec(function (err, accounts) {
        return res.end("{ \"data\": "+JSON.stringify(accounts)+", \"options\":[] }");
    });


});


app.post('/todo', function(req, res) {
    console.log("post todo invoked");
    res.json({
        "DT_RowId": "row_1",
        "item": "Send business plan to clients",
        "done": "1",
        "priority": "1"
    });
});

app.get('/todo', function(req, res){
    console.log("get todo invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "item": "Send business plan to clients",
                    "done": "1",
                    "priority": "1"
                },
                {
                    "DT_RowId": "row_2",
                    "item": "Web-site copy revisions",
                    "done": "0",
                    "priority": "2"
                },
                {
                    "DT_RowId": "row_3",
                    "item": "Review client tracking",
                    "done": "0",
                    "priority": "2"
                },
                {
                    "DT_RowId": "row_4",
                    "item": "E-mail catchup",
                    "done": "0",
                    "priority": "3"
                },
                {
                    "DT_RowId": "row_5",
                    "item": "Complete worksheet",
                    "done": "0",
                    "priority": "4"
                },
                {
                    "DT_RowId": "row_6",
                    "item": "Prep sales presentation",
                    "done": "0",
                    "priority": "5"
                }
            ],
            "options": []
        }
    );
});

app.get('/patients1_combo', function(req, res){
    console.log("get patients1_combo invoked");
    res.json(

        jQuery1102007904226474616183_1425694110849(
            {"total":22,"movies":[{"id":"12487","title":"Dirty Rotten Scoundrels","year":1988,"mpaa_rating":"PG","runtime":112,"critics_consensus":"","release_dates":{"theater":"1988-01-01","dvd":"1997-12-17"},"ratings":{"critics_rating":"Fresh","critics_score":88,"audience_rating":"Upright","audience_score":84},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/pMsZwM1vgnFnbsPg2Qt5otOCQjU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/26/56/265606_ori.jpg","profile":"http://resizing.flixster.com/pMsZwM1vgnFnbsPg2Qt5otOCQjU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/26/56/265606_ori.jpg","detailed":"http://resizing.flixster.com/pMsZwM1vgnFnbsPg2Qt5otOCQjU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/26/56/265606_ori.jpg","original":"http://resizing.flixster.com/pMsZwM1vgnFnbsPg2Qt5otOCQjU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/26/56/265606_ori.jpg"},"abridged_cast":[{"name":"Michael Caine","id":"162652646","characters":["Lawrence Jamieson"]},{"name":"Steve Martin","id":"162654836","characters":["Freddy Benson"]},{"name":"Glenne Headly","id":"162661099","characters":["Janet Colgate"]},{"name":"Anton Rodgers","id":"770671402","characters":["Insp. Andre"]},{"name":"Barbara Harris","id":"162657139","characters":["Fanny Eubanks"]}],"alternate_ids":{"imdb":"0095031"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/12487.json","alternate":"http://www.rottentomatoes.com/m/dirty_rotten_scoundrels/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/12487/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/12487/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/12487/similar.json"}},{"id":"321779323","title":"City of Rott","year":2006,"mpaa_rating":"Unrated","runtime":77,"release_dates":{"theater":"2006-08-08","dvd":"2006-08-08"},"ratings":{"critics_score":-1,"audience_rating":"Spilled","audience_score":40},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/HchxQLwodpB8OzotUFwOzPzgQy8=/54x77/dkpu1ddg7pbsk.cloudfront.net/movie/26/09/86/2609863_ori.jpg","profile":"http://resizing.flixster.com/HchxQLwodpB8OzotUFwOzPzgQy8=/54x77/dkpu1ddg7pbsk.cloudfront.net/movie/26/09/86/2609863_ori.jpg","detailed":"http://resizing.flixster.com/HchxQLwodpB8OzotUFwOzPzgQy8=/54x77/dkpu1ddg7pbsk.cloudfront.net/movie/26/09/86/2609863_ori.jpg","original":"http://resizing.flixster.com/HchxQLwodpB8OzotUFwOzPzgQy8=/54x77/dkpu1ddg7pbsk.cloudfront.net/movie/26/09/86/2609863_ori.jpg"},"abridged_cast":[{"name":"Frank Sudol","id":"321782142"}],"alternate_ids":{"imdb":"0839762"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/321779323.json","alternate":"http://www.rottentomatoes.com/m/city_of_rott/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/321779323/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/321779323/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/321779323/similar.json"}},{"id":"770675848","title":"Ett Oga rott","year":2007,"mpaa_rating":"Unrated","runtime":"","release_dates":{"theater":"2007-09-07"},"ratings":{"critics_score":-1,"audience_rating":"Spilled","audience_score":46},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/V--rm1hKm5jORbzSapab6VVgqF0=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/99/36/53/9936535_ori.jpg","profile":"http://resizing.flixster.com/V--rm1hKm5jORbzSapab6VVgqF0=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/99/36/53/9936535_ori.jpg","detailed":"http://resizing.flixster.com/V--rm1hKm5jORbzSapab6VVgqF0=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/99/36/53/9936535_ori.jpg","original":"http://resizing.flixster.com/V--rm1hKm5jORbzSapab6VVgqF0=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/99/36/53/9936535_ori.jpg"},"abridged_cast":[{"name":"Adel Bakhani","id":"770833331"},{"name":"Anwar Albayati","id":"770681114"},{"name":"Evin Ahmad","id":"770681113"},{"name":"Mikael Persbrandt","id":"394295163"},{"name":"Sofia Bach","id":"770833330"}],"alternate_ids":{"imdb":"0876159"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/770675848.json","alternate":"http://www.rottentomatoes.com/m/ett-oga-rott/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/770675848/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/770675848/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/770675848/similar.json"}},{"id":"771034084","title":"Rotten Tomatoes UK at CERN","year":"","mpaa_rating":"Unrated","runtime":"","release_dates":{},"ratings":{"critics_score":-1,"audience_score":57},"synopsis":"","posters":{"thumbnail":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","profile":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","detailed":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","original":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif"},"abridged_cast":[],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/771034084.json","alternate":"http://www.rottentomatoes.com/m/rotten_tomatoes_uk_at_cern/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/771034084/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/771034084/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/771034084/similar.json"}},{"id":"770670612","title":"Rottweiler","year":1982,"mpaa_rating":"R","runtime":95,"release_dates":{"theater":"1982-01-01","dvd":"2005-07-19"},"ratings":{"critics_score":-1,"audience_rating":"Spilled","audience_score":18},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/0fruL6MZyX4SgcUIK0MgsoYoEvE=/54x78/dkpu1ddg7pbsk.cloudfront.net/movie/75/65/90/7565905_ori.jpg","profile":"http://resizing.flixster.com/0fruL6MZyX4SgcUIK0MgsoYoEvE=/54x78/dkpu1ddg7pbsk.cloudfront.net/movie/75/65/90/7565905_ori.jpg","detailed":"http://resizing.flixster.com/0fruL6MZyX4SgcUIK0MgsoYoEvE=/54x78/dkpu1ddg7pbsk.cloudfront.net/movie/75/65/90/7565905_ori.jpg","original":"http://resizing.flixster.com/0fruL6MZyX4SgcUIK0MgsoYoEvE=/54x78/dkpu1ddg7pbsk.cloudfront.net/movie/75/65/90/7565905_ori.jpg"},"abridged_cast":[{"name":"William Miller","id":"770671686","characters":["Dante"]},{"name":"Barbara Elorrieta","id":"770689657","characters":["Woman in White"]},{"name":"Paulina Galvez","id":"326433268","characters":["Alyah"]},{"name":"Cornell John","id":"770671687","characters":["Dongoro"]},{"name":"Lluis Homar","id":"326298552","characters":["Guard Borg"]}],"alternate_ids":{"imdb":"0371920"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/770670612.json","alternate":"http://www.rottentomatoes.com/m/rottweiler_1982/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/770670612/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/770670612/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/770670612/similar.json"}},{"id":"771378423","title":"Rotten Tomatoes Podcast","year":1928,"mpaa_rating":"Unrated","runtime":"","release_dates":{},"ratings":{"critics_score":-1,"audience_score":50},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/DP_MPN3DOa9B4vezCZC47_osBto=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/17/73/11177312_ori.jpg","profile":"http://resizing.flixster.com/DP_MPN3DOa9B4vezCZC47_osBto=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/17/73/11177312_ori.jpg","detailed":"http://resizing.flixster.com/DP_MPN3DOa9B4vezCZC47_osBto=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/17/73/11177312_ori.jpg","original":"http://resizing.flixster.com/DP_MPN3DOa9B4vezCZC47_osBto=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/17/73/11177312_ori.jpg"},"abridged_cast":[],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/771378423.json","alternate":"http://www.rottentomatoes.com/m/rotten_tomatoes_podcast/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/771378423/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/771378423/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/771378423/similar.json"}},{"id":"770973782","title":"Rottweiler","year":2005,"mpaa_rating":"Unrated","runtime":98,"release_dates":{"dvd":"2005-07-19"},"ratings":{"critics_score":-1,"audience_rating":"Spilled","audience_score":10},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/oqKUaSth-NjFfSzgFQnyCPhi1YU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/11/02/14/11021407_ori.jpg","profile":"http://resizing.flixster.com/oqKUaSth-NjFfSzgFQnyCPhi1YU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/11/02/14/11021407_ori.jpg","detailed":"http://resizing.flixster.com/oqKUaSth-NjFfSzgFQnyCPhi1YU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/11/02/14/11021407_ori.jpg","original":"http://resizing.flixster.com/oqKUaSth-NjFfSzgFQnyCPhi1YU=/54x75/dkpu1ddg7pbsk.cloudfront.net/movie/11/02/14/11021407_ori.jpg"},"abridged_cast":[],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/770973782.json","alternate":"http://www.rottentomatoes.com/m/rottweiler/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/770973782/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/770973782/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/770973782/similar.json"}},{"id":"770816031","title":"Rottenetter","year":2009,"mpaa_rating":"Unrated","runtime":90,"release_dates":{},"ratings":{"critics_score":-1,"audience_score":16},"synopsis":"","posters":{"thumbnail":"http://resizing.flixster.com/lnpQWRVIMy_fruy6i6YGwrmohMs=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/10/89/72/10897206_ori.jpg","profile":"http://resizing.flixster.com/lnpQWRVIMy_fruy6i6YGwrmohMs=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/10/89/72/10897206_ori.jpg","detailed":"http://resizing.flixster.com/lnpQWRVIMy_fruy6i6YGwrmohMs=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/10/89/72/10897206_ori.jpg","original":"http://resizing.flixster.com/lnpQWRVIMy_fruy6i6YGwrmohMs=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/10/89/72/10897206_ori.jpg"},"abridged_cast":[{"name":"Christian Rubeck","id":"528367036","characters":["Jonny"]},{"name":"Fridtjov Saheim","id":"573775431","characters":["Jonny`s mentor"]},{"name":"Kristoffer Joner","id":"348498619","characters":["Jonny`s brother Frank"]},{"name":"Silje Salomonsen","id":"573802375"}],"alternate_ids":{"imdb":"1398033"},"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/770816031.json","alternate":"http://www.rottentomatoes.com/m/rottenetter/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/770816031/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/770816031/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/770816031/similar.json"}},{"id":"770824434","title":"Rotting Christ: In Domine Sathana","year":2002,"mpaa_rating":"Unrated","runtime":"","release_dates":{"theater":"2002-12-31","dvd":"2005-02-15"},"ratings":{"critics_score":-1,"audience_score":0},"synopsis":"","posters":{"thumbnail":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","profile":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","detailed":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","original":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif"},"abridged_cast":[{"name":"Rotting Christ","id":"770738127"},{"name":"Sakis Tolis","id":"770867747"}],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/770824434.json","alternate":"http://www.rottentomatoes.com/m/rotting-christ-in-domine-sathana/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/770824434/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/770824434/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/770824434/similar.json"}},{"id":"771374804","title":"Rotten to the Core","year":1965,"mpaa_rating":"Unrated","runtime":"","release_dates":{},"ratings":{"critics_score":-1,"audience_score":0},"synopsis":"","posters":{"thumbnail":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","profile":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","detailed":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif","original":"http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif"},"abridged_cast":[{"name":"Anton Rodgers","id":"770671402"},{"name":"Charlotte Rampling","id":"162670589"},{"name":"Eric Sykes","id":"381421479"},{"name":"Ian Bannen","id":"162660518"},{"name":"Thorley Walters","id":"230363974"}],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies/771374804.json","alternate":"http://www.rottentomatoes.com/m/rotten_to_the_core_1965/","cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/771374804/cast.json","reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/771374804/reviews.json","similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/771374804/similar.json"}}],"links":{"self":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=rott&page_limit=10&page=1","next":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=rott&page_limit=10&page=2"},"link_template":"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q={search-term}&page_limit={results-per-page}&page={page-number}"}
        )


    );
});

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
