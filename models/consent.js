/**
 * Created by aisaenko on 15-03-01.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Consent = new Schema({

    firstName: String,
    middleName: String,
    lastName: String,
    patient: Object,
    template: Object,
    templateName: String,
    templateVersion: Number,
    createdBy: Date,
    creationDate: Date
});

module.exports = mongoose.model('Consent', Consent);