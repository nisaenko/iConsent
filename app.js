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
var moment = require('moment');

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


app.get('/patients', function(req, res) {
    console.log("get patients invoked");
    console.log(req);

    var patients = 'patient';

    Patient.find().lean().exec(function (err, patients) {

        var pluginPatientArray = new Array();

        patients.forEach(function(currentPatient) {
            var arrayElement = currentPatient;
            arrayElement.registrationDate = moment(currentPatient.registrationDate).format('YYYY-MM-DD');
            arrayElement.dateOfBirth = moment(currentPatient.dateOfBirth).format('YYYY-MM-DD');
            pluginPatientArray.push(arrayElement);

        });
        res.end("{ \"data\": "+JSON.stringify(pluginPatientArray)+", \"options\":[] }");

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

app.get('/patient_lookup', function(req, res) {
    console.log("get patients combo invoked");
    console.log(req.param('term'));

    var patients = 'patient';
    var termSearch = new RegExp(req.param('term'), 'i');

    Patient.find().or([{firstName: {$regex: termSearch}}, {middleName: {$regex: termSearch}}, {lastName: {$regex: termSearch}}])
        .lean().exec(function (err, patients) {
        var pluginPatientArray = new Array();

        patients.forEach(function(currentPatient) {
            var arrayElement = new Object();
            arrayElement.id = currentPatient._id;
            arrayElement.value = currentPatient.firstName +" "+currentPatient.middleName +" "+currentPatient.lastName;
            arrayElement.label = currentPatient.firstName +" "+currentPatient.middleName +" "+currentPatient.lastName;
            pluginPatientArray.push(arrayElement);

        });
        res.end(JSON.stringify(pluginPatientArray));
    });

});


app.get('/template_lookup', function(req, res) {
    console.log("get templates combo invoked");
    console.log(req.param('term'));

    var termSearch = new RegExp(req.param('term'), 'i');

    var templates = 'template';

    Template.find({templateName: {$regex: termSearch}}).lean().exec(function (err, templates) {
        var pluginTemplateArray = new Array();

        templates.forEach(function(currentTemplate) {
            var arrayElement = new Object();
            arrayElement.id = currentTemplate._id;
            arrayElement.value = currentTemplate.templateName;
            arrayElement.label = currentTemplate.templateName;
            arrayElement.version = currentTemplate.templateVersion;
            arrayElement.createdBy = req.user['username'];
            arrayElement.consentFormTemplate = currentTemplate.consentFormTemplate;
            pluginTemplateArray.push(arrayElement);

        });
        res.end(JSON.stringify(pluginTemplateArray));
    });

});

app.get('/templates', function(req, res) {
    console.log("get templates invoked");

    var templates = 'template';

    Template.find().lean().exec(function (err, templates) {
        var pluginTemplateArray = new Array();

        templates.forEach(function(currentTemplate) {
            var arrayElement = currentTemplate;
            arrayElement.dateOfUpdate = moment(currentTemplate.dateOfUpdate).format('YYYY-MM-DD');
            arrayElement.creationDate = moment(currentTemplate.creationDate).format('YYYY-MM-DD');
            pluginTemplateArray.push(arrayElement);

        });
        res.end("{ \"data\": "+JSON.stringify(pluginTemplateArray)+", \"options\":[] }");

        //return res.end("{ \"data\": "+JSON.stringify(templates)+", \"options\":[] }");
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
    var consents = 'consent';

    Consent.find().lean().exec(function (err, consents) {
        return res.end("{ \"data\": "+JSON.stringify(consents)+", \"options\":[] }");
    });
});

app.post('/consents', function(req, res) {
    console.log("post users invoked");
    console.log(req);
    console.log(req.body);
    console.log(req.user['username']);
    var newConsent = new Consent();

    newConsent.templateName = req.body['data[templateName]'];
    newConsent.templateVersion = req.body['data[templateVersion]'];
    newConsent.createdBy = req.user['username'];
    newConsent.creationDate = req.body['data[creationDate]'];
    newConsent.patientName = req.body['data[patientName]'];
    newConsent.patientSignature = req.body['data[patientSignature]'];

    Template.findById(req.body['data[templateID]'], function (err, doc){
        newConsent.template = doc;
    });

    Patient.findById(req.body['data[patientID]'], function (err, doc){
        newConsent.patient = doc;
    });

    newConsent.save(function (err) {
        if (err) return console.error(err);
    });

    res.json({});
});

app.put('/consents', function(req, res) {
    console.log("put users invoked");
    res.json({
        "DT_RowId": "row_2",
        "patientName": "Javascript Developer",
        "createdBy": "Winters",
        "templateName": "Accountant",
        "templateVersion": "63",
        "creationDate": "2011-07-25"
    });
});

app.delete('/consents', function(req, res) {
    console.log("delete users invoked");
    console.log(req.param('id'));

    Consent.findById(req.param('id'), function (err, doc){
        doc.remove();
    });

    res.json({
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
