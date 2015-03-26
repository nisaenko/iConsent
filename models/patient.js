/**
 * Created by aisaenko on 15-02-19.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Patient = new Schema({

    DT_RowId: String,
    firstName: String,
    middleName: String,
    lastName: String,
    address: String,
    office: String,
    extn: Number,
    age: Number,
    registrationDate: String,
    dateOfBirth: String
});

module.exports = mongoose.model('Patient', Patient);
