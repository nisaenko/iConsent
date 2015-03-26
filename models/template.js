/**
 * Created by aisaenko on 15-02-19.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Template = new Schema({

    updatedBy: String,
    createdBy: String,
    templateName: String,
    consentFormTemplate: String,
    templateVersion: Number,
    dateOfUpdate: Date,
    creationDate: Date
});

module.exports = mongoose.model('Template', Template);
