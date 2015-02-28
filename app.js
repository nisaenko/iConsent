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

app.get('/patients', function(req, res) {
    console.log("get patients invoked");

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

app.put('/patients', function(req, res) {
    console.log("put patients invoked");

    res.json({
        "DT_RowId": "row_58",
        "firstName": "Donna",
        "lastName": "Snider",
        "middleName": "Customer Support",
        "address": "d.snider@datatables.net",
        "office": "New York",
        "extn": "4226",
        "age": "27",
        "registrationDate": "112000",
        "dateOfBirth": "2011-01-25"
    });
});

app.delete('/patients', function(req, res) {
    console.log("delete patients invoked");

    var deleteID = req.param('id');
    var patients = 'patient';
    console.log(deleteID);


    Patient.findById(deleteID, function (err, doc){
        doc.remove();
    });

    res.json({});
});

app.get('/templates', function(req, res) {
    console.log("get templates invoked");

    var templates = 'template';

    Template.find().lean().exec(function (err, templates) {
        return res.end("{ \"data\": "+JSON.stringify(templates)+", \"options\":[] }");
    });
});


app.post('/templates', function(req, res) {
    console.log("post templates invoked");
    console.log(req.json);
    Template.create(req.json , function (err, small) {
        if (err) return handleError(err);
        // saved!
    })

    res.json({ });
});

app.put('/templates', function(req, res) {
    console.log("put templates invoked");
    res.json({
        "DT_RowId": "row_58",
        "updatedBy": "Donna",
        "createdBy": "Snider",
        "templateName": "Customer Support",
        "consentFormTemplate": "d.snider@datatables.net",
        "templateVersion": "27",
        "dateOfUpdate": "112000",
        "creationDate": "2011-01-25"
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
    res.json({
        "DT_RowId": "row_58",
        "userID": "Donna",
        "userName": "Snider",
        "role": "0",
        "email": "d.snider@datatables.net",
        "status": "1",
        "password": "12345"
    });
});


app.get('/users', function(req, res){
    console.log("get users invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "userID": "Tiger",
                    "userName": "Nixon",
                    "role": "0",
                    "email": "t.nixon@datatables.net",
                    "status": "0",
                    "password": "12345"
                },
                {
                    "DT_RowId": "row_2",
                    "userID": "Garrett",
                    "userName": "Winters",
                    "role": "1",
                    "email": "g.winters@datatables.net",
                    "status": "1",
                    "password": "12345"
                },
                {
                    "DT_RowId": "row_3",
                    "userID": "Ashton",
                    "userName": "Cox",
                    "role": "0",
                    "email": "a.cox@datatables.net",
                    "status": "1",
                    "password": "12345"
                }
            ]
        }
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
