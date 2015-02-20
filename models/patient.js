/**
 * Created by aisaenko on 15-02-19.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Patient = new Schema({
    _id: String,
    DT_RowId: String,
    firstName: String,
    middleName: String,
    address: String,
    office: String,
    extn: Number,
    age: Number,
    registrationDate: Date,
    dateOfBirth: Date
});

module.exports = mongoose.model('Patient', Patient);
