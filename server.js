/**
 * Created by nisaenko on 14-12-28.
 */
var express = require('express');
    app = express();



app.use(express.static('bower_components'));
//app.use(express.static('client'));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/patients', function(req, res){
    console.log("get patients invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "firstName": "Tiger",
                    "lastName": "Nixon",
                    "middleName": "System Architect",
                    "address": "t.nixon@datatables.net",
                    "office": "Edinburgh",
                    "extn": "5421",
                    "age": "61",
                    "registrationDate": "320800",
                    "dateOfBirth": "2011-04-25"
                },
                {
                    "DT_RowId": "row_2",
                    "firstName": "Garrett",
                    "lastName": "Winters",
                    "middleName": "Accountant",
                    "address": "g.winters@datatables.net",
                    "office": "Tokyo",
                    "extn": "8422",
                    "age": "63",
                    "registrationDate": "170750",
                    "dateOfBirth": "2011-07-25"
                },
                {
                    "DT_RowId": "row_3",
                    "firstName": "Ashton",
                    "lastName": "Cox",
                    "middleName": "Junior Technical Author",
                    "address": "a.cox@datatables.net",
                    "office": "San Francisco",
                    "extn": "1562",
                    "age": "66",
                    "registrationDate": "86000",
                    "dateOfBirth": "2009-01-12"
                },
                {
                    "DT_RowId": "row_4",
                    "firstName": "Cedric",
                    "lastName": "Kelly",
                    "middleName": "Senior Javascript Developer",
                    "address": "c.kelly@datatables.net",
                    "office": "Edinburgh",
                    "extn": "6224",
                    "age": "22",
                    "registrationDate": "433060",
                    "dateOfBirth": "2012-03-29"
                },
                {
                    "DT_RowId": "row_5",
                    "firstName": "Airi",
                    "lastName": "Satou",
                    "middleName": "Accountant",
                    "address": "a.satou@datatables.net",
                    "office": "Tokyo",
                    "extn": "5407",
                    "age": "33",
                    "registrationDate": "162700",
                    "dateOfBirth": "2008-11-28"
                },
                {
                    "DT_RowId": "row_6",
                    "firstName": "Brielle",
                    "lastName": "Williamson",
                    "middleName": "Integration Specialist",
                    "address": "b.williamson@datatables.net",
                    "office": "New York",
                    "extn": "4804",
                    "age": "61",
                    "registrationDate": "372000",
                    "dateOfBirth": "2012-12-02"
                },
                {
                    "DT_RowId": "row_7",
                    "firstName": "Herrod",
                    "lastName": "Chandler",
                    "middleName": "Sales Assistant",
                    "address": "h.chandler@datatables.net",
                    "office": "San Francisco",
                    "extn": "9608",
                    "age": "59",
                    "registrationDate": "137500",
                    "dateOfBirth": "2012-08-06"
                },
                {
                    "DT_RowId": "row_8",
                    "firstName": "Rhona",
                    "lastName": "Davidson",
                    "middleName": "Integration Specialist",
                    "address": "r.davidson@datatables.net",
                    "office": "Tokyo",
                    "extn": "6200",
                    "age": "55",
                    "registrationDate": "327900",
                    "dateOfBirth": "2010-10-14"
                },
                {
                    "DT_RowId": "row_9",
                    "firstName": "Colleen",
                    "lastName": "Hurst",
                    "middleName": "Javascript Developer",
                    "address": "c.hurst@datatables.net",
                    "office": "San Francisco",
                    "extn": "2360",
                    "age": "39",
                    "registrationDate": "205500",
                    "dateOfBirth": "2009-09-15"
                },
                {
                    "DT_RowId": "row_10",
                    "firstName": "Sonya",
                    "lastName": "Frost",
                    "middleName": "Software Engineer",
                    "address": "s.frost@datatables.net",
                    "office": "Edinburgh",
                    "extn": "1667",
                    "age": "23",
                    "registrationDate": "103600",
                    "dateOfBirth": "2008-12-13"
                },
                {
                    "DT_RowId": "row_11",
                    "firstName": "Jena",
                    "lastName": "Gaines",
                    "middleName": "Office Manager",
                    "address": "j.gaines@datatables.net",
                    "office": "London",
                    "extn": "3814",
                    "age": "30",
                    "registrationDate": "90560",
                    "dateOfBirth": "2008-12-19"
                },
                {
                    "DT_RowId": "row_12",
                    "firstName": "Quinn",
                    "lastName": "Flynn",
                    "middleName": "Support Lead",
                    "address": "q.flynn@datatables.net",
                    "office": "Edinburgh",
                    "extn": "9497",
                    "age": "22",
                    "registrationDate": "342000",
                    "dateOfBirth": "2013-03-03"
                },
                {
                    "DT_RowId": "row_13",
                    "firstName": "Charde",
                    "lastName": "Marshall",
                    "middleName": "Regional Director",
                    "address": "c.marshall@datatables.net",
                    "office": "San Francisco",
                    "extn": "6741",
                    "age": "36",
                    "registrationDate": "470600",
                    "dateOfBirth": "2008-10-16"
                },
                {
                    "DT_RowId": "row_14",
                    "firstName": "Haley",
                    "lastName": "Kennedy",
                    "middleName": "Senior Marketing Designer",
                    "address": "h.kennedy@datatables.net",
                    "office": "London",
                    "extn": "3597",
                    "age": "43",
                    "registrationDate": "313500",
                    "dateOfBirth": "2012-12-18"
                },
                {
                    "DT_RowId": "row_15",
                    "firstName": "Tatyana",
                    "lastName": "Fitzpatrick",
                    "middleName": "Regional Director",
                    "address": "t.fitzpatrick@datatables.net",
                    "office": "London",
                    "extn": "1965",
                    "age": "19",
                    "registrationDate": "385750",
                    "dateOfBirth": "2010-03-17"
                },
                {
                    "DT_RowId": "row_16",
                    "firstName": "Michael",
                    "lastName": "Silva",
                    "middleName": "Marketing Designer",
                    "address": "m.silva@datatables.net",
                    "office": "London",
                    "extn": "1581",
                    "age": "66",
                    "registrationDate": "198500",
                    "dateOfBirth": "2012-11-27"
                },
                {
                    "DT_RowId": "row_17",
                    "firstName": "Paul",
                    "lastName": "Byrd",
                    "middleName": "Chief Financial Officer (CFO)",
                    "address": "p.byrd@datatables.net",
                    "office": "New York",
                    "extn": "3059",
                    "age": "64",
                    "registrationDate": "725000",
                    "dateOfBirth": "2010-06-09"
                },
                {
                    "DT_RowId": "row_18",
                    "firstName": "Gloria",
                    "lastName": "Little",
                    "middleName": "Systems Administrator",
                    "address": "g.little@datatables.net",
                    "office": "New York",
                    "extn": "1721",
                    "age": "59",
                    "registrationDate": "237500",
                    "dateOfBirth": "2009-04-10"
                },
                {
                    "DT_RowId": "row_19",
                    "firstName": "Bradley",
                    "lastName": "Greer",
                    "middleName": "Software Engineer",
                    "address": "b.greer@datatables.net",
                    "office": "London",
                    "extn": "2558",
                    "age": "41",
                    "registrationDate": "132000",
                    "dateOfBirth": "2012-10-13"
                },
                {
                    "DT_RowId": "row_20",
                    "firstName": "Dai",
                    "lastName": "Rios",
                    "middleName": "Personnel Lead",
                    "address": "d.rios@datatables.net",
                    "office": "Edinburgh",
                    "extn": "2290",
                    "age": "35",
                    "registrationDate": "217500",
                    "dateOfBirth": "2012-09-26"
                },
                {
                    "DT_RowId": "row_21",
                    "firstName": "Jenette",
                    "lastName": "Caldwell",
                    "middleName": "Development Lead",
                    "address": "j.caldwell@datatables.net",
                    "office": "New York",
                    "extn": "1937",
                    "age": "30",
                    "registrationDate": "345000",
                    "dateOfBirth": "2011-09-03"
                },
                {
                    "DT_RowId": "row_22",
                    "firstName": "Yuri",
                    "lastName": "Berry",
                    "middleName": "Chief Marketing Officer (CMO)",
                    "address": "y.berry@datatables.net",
                    "office": "New York",
                    "extn": "6154",
                    "age": "40",
                    "registrationDate": "675000",
                    "dateOfBirth": "2009-06-25"
                },
                {
                    "DT_RowId": "row_23",
                    "firstName": "Caesar",
                    "lastName": "Vance",
                    "middleName": "Pre-Sales Support",
                    "address": "c.vance@datatables.net",
                    "office": "New York",
                    "extn": "8330",
                    "age": "21",
                    "registrationDate": "106450",
                    "dateOfBirth": "2011-12-12"
                },
                {
                    "DT_RowId": "row_24",
                    "firstName": "Doris",
                    "lastName": "Wilder",
                    "middleName": "Sales Assistant",
                    "address": "d.wilder@datatables.net",
                    "office": "Sidney",
                    "extn": "3023",
                    "age": "23",
                    "registrationDate": "85600",
                    "dateOfBirth": "2010-09-20"
                },
                {
                    "DT_RowId": "row_25",
                    "firstName": "Angelica",
                    "lastName": "Ramos",
                    "middleName": "Chief Executive Officer (CEO)",
                    "address": "a.ramos@datatables.net",
                    "office": "London",
                    "extn": "5797",
                    "age": "47",
                    "registrationDate": "1200000",
                    "dateOfBirth": "2009-10-09"
                },
                {
                    "DT_RowId": "row_26",
                    "firstName": "Gavin",
                    "lastName": "Joyce",
                    "middleName": "Developer",
                    "address": "g.joyce@datatables.net",
                    "office": "Edinburgh",
                    "extn": "8822",
                    "age": "42",
                    "registrationDate": "92575",
                    "dateOfBirth": "2010-12-22"
                },
                {
                    "DT_RowId": "row_27",
                    "firstName": "Jennifer",
                    "lastName": "Chang",
                    "middleName": "Regional Director",
                    "address": "j.chang@datatables.net",
                    "office": "Singapore",
                    "extn": "9239",
                    "age": "28",
                    "registrationDate": "357650",
                    "dateOfBirth": "2010-11-14"
                },
                {
                    "DT_RowId": "row_28",
                    "firstName": "Brenden",
                    "lastName": "Wagner",
                    "middleName": "Software Engineer",
                    "address": "b.wagner@datatables.net",
                    "office": "San Francisco",
                    "extn": "1314",
                    "age": "28",
                    "registrationDate": "206850",
                    "dateOfBirth": "2011-06-07"
                },
                {
                    "DT_RowId": "row_29",
                    "firstName": "Fiona",
                    "lastName": "Green",
                    "middleName": "Chief Operating Officer (COO)",
                    "address": "f.green@datatables.net",
                    "office": "San Francisco",
                    "extn": "2947",
                    "age": "48",
                    "registrationDate": "850000",
                    "dateOfBirth": "2010-03-11"
                },
                {
                    "DT_RowId": "row_30",
                    "firstName": "Shou",
                    "lastName": "Itou",
                    "middleName": "Regional Marketing",
                    "address": "s.itou@datatables.net",
                    "office": "Tokyo",
                    "extn": "8899",
                    "age": "20",
                    "registrationDate": "163000",
                    "dateOfBirth": "2011-08-14"
                },
                {
                    "DT_RowId": "row_31",
                    "firstName": "Michelle",
                    "lastName": "House",
                    "middleName": "Integration Specialist",
                    "address": "m.house@datatables.net",
                    "office": "Sidney",
                    "extn": "2769",
                    "age": "37",
                    "registrationDate": "95400",
                    "dateOfBirth": "2011-06-02"
                },
                {
                    "DT_RowId": "row_32",
                    "firstName": "Suki",
                    "lastName": "Burks",
                    "middleName": "Developer",
                    "address": "s.burks@datatables.net",
                    "office": "London",
                    "extn": "6832",
                    "age": "53",
                    "registrationDate": "114500",
                    "dateOfBirth": "2009-10-22"
                },
                {
                    "DT_RowId": "row_33",
                    "firstName": "Prescott",
                    "lastName": "Bartlett",
                    "middleName": "Technical Author",
                    "address": "p.bartlett@datatables.net",
                    "office": "London",
                    "extn": "3606",
                    "age": "27",
                    "registrationDate": "145000",
                    "dateOfBirth": "2011-05-07"
                },
                {
                    "DT_RowId": "row_34",
                    "firstName": "Gavin",
                    "lastName": "Cortez",
                    "middleName": "Team Leader",
                    "address": "g.cortez@datatables.net",
                    "office": "San Francisco",
                    "extn": "2860",
                    "age": "22",
                    "registrationDate": "235500",
                    "dateOfBirth": "2008-10-26"
                },
                {
                    "DT_RowId": "row_35",
                    "firstName": "Martena",
                    "lastName": "Mccray",
                    "middleName": "Post-Sales support",
                    "address": "m.mccray@datatables.net",
                    "office": "Edinburgh",
                    "extn": "8240",
                    "age": "46",
                    "registrationDate": "324050",
                    "dateOfBirth": "2011-03-09"
                },
                {
                    "DT_RowId": "row_36",
                    "firstName": "Unity",
                    "lastName": "Butler",
                    "middleName": "Marketing Designer",
                    "address": "u.butler@datatables.net",
                    "office": "San Francisco",
                    "extn": "5384",
                    "age": "47",
                    "registrationDate": "85675",
                    "dateOfBirth": "2009-12-09"
                },
                {
                    "DT_RowId": "row_37",
                    "firstName": "Howard",
                    "lastName": "Hatfield",
                    "middleName": "Office Manager",
                    "address": "h.hatfield@datatables.net",
                    "office": "San Francisco",
                    "extn": "7031",
                    "age": "51",
                    "registrationDate": "164500",
                    "dateOfBirth": "2008-12-16"
                },
                {
                    "DT_RowId": "row_38",
                    "firstName": "Hope",
                    "lastName": "Fuentes",
                    "middleName": "Secretary",
                    "address": "h.fuentes@datatables.net",
                    "office": "San Francisco",
                    "extn": "6318",
                    "age": "41",
                    "registrationDate": "109850",
                    "dateOfBirth": "2010-02-12"
                },
                {
                    "DT_RowId": "row_39",
                    "firstName": "Vivian",
                    "lastName": "Harrell",
                    "middleName": "Financial Controller",
                    "address": "v.harrell@datatables.net",
                    "office": "San Francisco",
                    "extn": "9422",
                    "age": "62",
                    "registrationDate": "452500",
                    "dateOfBirth": "2009-02-14"
                },
                {
                    "DT_RowId": "row_40",
                    "firstName": "Timothy",
                    "lastName": "Mooney",
                    "middleName": "Office Manager",
                    "address": "t.mooney@datatables.net",
                    "office": "London",
                    "extn": "7580",
                    "age": "37",
                    "registrationDate": "136200",
                    "dateOfBirth": "2008-12-11"
                },
                {
                    "DT_RowId": "row_41",
                    "firstName": "Jackson",
                    "lastName": "Bradshaw",
                    "middleName": "Director",
                    "address": "j.bradshaw@datatables.net",
                    "office": "New York",
                    "extn": "1042",
                    "age": "65",
                    "registrationDate": "645750",
                    "dateOfBirth": "2008-09-26"
                },
                {
                    "DT_RowId": "row_42",
                    "firstName": "Olivia",
                    "lastName": "Liang",
                    "middleName": "Support Engineer",
                    "address": "o.liang@datatables.net",
                    "office": "Singapore",
                    "extn": "2120",
                    "age": "64",
                    "registrationDate": "234500",
                    "dateOfBirth": "2011-02-03"
                },
                {
                    "DT_RowId": "row_43",
                    "firstName": "Bruno",
                    "lastName": "Nash",
                    "middleName": "Software Engineer",
                    "address": "b.nash@datatables.net",
                    "office": "London",
                    "extn": "6222",
                    "age": "38",
                    "registrationDate": "163500",
                    "dateOfBirth": "2011-05-03"
                },
                {
                    "DT_RowId": "row_44",
                    "firstName": "Sakura",
                    "lastName": "Yamamoto",
                    "middleName": "Support Engineer",
                    "address": "s.yamamoto@datatables.net",
                    "office": "Tokyo",
                    "extn": "9383",
                    "age": "37",
                    "registrationDate": "139575",
                    "dateOfBirth": "2009-08-19"
                },
                {
                    "DT_RowId": "row_45",
                    "firstName": "Thor",
                    "lastName": "Walton",
                    "middleName": "Developer",
                    "address": "t.walton@datatables.net",
                    "office": "New York",
                    "extn": "8327",
                    "age": "61",
                    "registrationDate": "98540",
                    "dateOfBirth": "2013-08-11"
                },
                {
                    "DT_RowId": "row_46",
                    "firstName": "Finn",
                    "lastName": "Camacho",
                    "middleName": "Support Engineer",
                    "address": "f.camacho@datatables.net",
                    "office": "San Francisco",
                    "extn": "2927",
                    "age": "47",
                    "registrationDate": "87500",
                    "dateOfBirth": "2009-07-07"
                },
                {
                    "DT_RowId": "row_47",
                    "firstName": "Serge",
                    "lastName": "Baldwin",
                    "middleName": "Data Coordinator",
                    "address": "s.baldwin@datatables.net",
                    "office": "Singapore",
                    "extn": "8352",
                    "age": "64",
                    "registrationDate": "138575",
                    "dateOfBirth": "2012-04-09"
                },
                {
                    "DT_RowId": "row_48",
                    "firstName": "Zenaida",
                    "lastName": "Frank",
                    "middleName": "Software Engineer",
                    "address": "z.frank@datatables.net",
                    "office": "New York",
                    "extn": "7439",
                    "age": "63",
                    "registrationDate": "125250",
                    "dateOfBirth": "2010-01-04"
                },
                {
                    "DT_RowId": "row_49",
                    "firstName": "Zorita",
                    "lastName": "Serrano",
                    "middleName": "Software Engineer",
                    "address": "z.serrano@datatables.net",
                    "office": "San Francisco",
                    "extn": "4389",
                    "age": "56",
                    "registrationDate": "115000",
                    "dateOfBirth": "2012-06-01"
                },
                {
                    "DT_RowId": "row_50",
                    "firstName": "Jennifer",
                    "lastName": "Acosta",
                    "middleName": "Junior Javascript Developer",
                    "address": "j.acosta@datatables.net",
                    "office": "Edinburgh",
                    "extn": "3431",
                    "age": "43",
                    "registrationDate": "75650",
                    "dateOfBirth": "2013-02-01"
                },
                {
                    "DT_RowId": "row_51",
                    "firstName": "Cara",
                    "lastName": "Stevens",
                    "middleName": "Sales Assistant",
                    "address": "c.stevens@datatables.net",
                    "office": "New York",
                    "extn": "3990",
                    "age": "46",
                    "registrationDate": "145600",
                    "dateOfBirth": "2011-12-06"
                },
                {
                    "DT_RowId": "row_52",
                    "firstName": "Hermione",
                    "lastName": "Butler",
                    "middleName": "Regional Director",
                    "address": "h.butler@datatables.net",
                    "office": "London",
                    "extn": "1016",
                    "age": "47",
                    "registrationDate": "356250",
                    "dateOfBirth": "2011-03-21"
                },
                {
                    "DT_RowId": "row_53",
                    "firstName": "Lael",
                    "lastName": "Greer",
                    "middleName": "Systems Administrator",
                    "address": "l.greer@datatables.net",
                    "office": "London",
                    "extn": "6733",
                    "age": "21",
                    "registrationDate": "103500",
                    "dateOfBirth": "2009-02-27"
                },
                {
                    "DT_RowId": "row_54",
                    "firstName": "Jonas",
                    "lastName": "Alexander",
                    "middleName": "Developer",
                    "address": "j.alexander@datatables.net",
                    "office": "San Francisco",
                    "extn": "8196",
                    "age": "30",
                    "registrationDate": "86500",
                    "dateOfBirth": "2010-07-14"
                },
                {
                    "DT_RowId": "row_55",
                    "firstName": "Shad",
                    "lastName": "Decker",
                    "middleName": "Regional Director",
                    "address": "s.decker@datatables.net",
                    "office": "Edinburgh",
                    "extn": "6373",
                    "age": "51",
                    "registrationDate": "183000",
                    "dateOfBirth": "2008-11-13"
                },
                {
                    "DT_RowId": "row_56",
                    "firstName": "Michael",
                    "lastName": "Bruce",
                    "middleName": "Javascript Developer",
                    "address": "m.bruce@datatables.net",
                    "office": "Singapore",
                    "extn": "5384",
                    "age": "29",
                    "registrationDate": "183000",
                    "dateOfBirth": "2011-06-27"
                },
                {
                    "DT_RowId": "row_57",
                    "firstName": "Donna",
                    "lastName": "Snider",
                    "middleName": "Customer Support",
                    "address": "d.snider@datatables.net",
                    "office": "New York",
                    "extn": "4226",
                    "age": "27",
                    "registrationDate": "112000",
                    "dateOfBirth": "2011-01-25"
                }
            ],
            "options": []
        }
    );
});

app.post('/patients', function(req, res) {
    console.log("post patients invoked");
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

app.post('/templates', function(req, res) {
    console.log("post templates invoked");
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


app.get('/templates', function(req, res){
    console.log("get templates invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "updatedBy": "Tiger",
                    "createdBy": "Nixon",
                    "templateName": "System Architect",
                    "consentFormTemplate": "t.nixon@datatables.net",
                    "templateVersion": "61",
                    "dateOfUpdate": "320800",
                    "creationDate": "2011-04-25"
                },
                {
                    "DT_RowId": "row_2",
                    "updatedBy": "Garrett",
                    "createdBy": "Winters",
                    "templateName": "Accountant",
                    "consentFormTemplate": "g.winters@datatables.net",
                    "templateVersion": "63",
                    "dateOfUpdate": "170750",
                    "creationDate": "2011-07-25"
                },
                {
                    "DT_RowId": "row_3",
                    "updatedBy": "Ashton",
                    "createdBy": "Cox",
                    "templateName": "Junior Technical Author",
                    "consentFormTemplate": "a.cox@datatables.net",
                    "templateVersion": "66",
                    "dateOfUpdate": "86000",
                    "creationDate": "2009-01-12"
                }
            ],
            "options": []
        }
    );
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

app.post('/examples', function(req, res) {
    console.log("examples");
    res.json({
        "DT_RowId": "row_1",
        "first_name": "Tiger",
        "last_name": "Nixon",
        "position": "System Architect",
        "email": "t.nixon@datatables.net",
        "office": "Edinburgh",
        "extn": "5421",
        "age": "61",
        "salary": "320800",
        "start_date": "2011-04-25"
    });
});


app.get('/examples', function(req, res){
    console.log("get examples invoked");
    res.json(
        {
            "data": [
                {
                    "DT_RowId": "row_1",
                    "first_name": "Tiger",
                    "last_name": "Nixon",
                    "position": "System Architect",
                    "email": "t.nixon@datatables.net",
                    "office": "Edinburgh",
                    "extn": "5421",
                    "age": "61",
                    "salary": "320800",
                    "start_date": "2011-04-25"
                },
                {
                    "DT_RowId": "row_2",
                    "first_name": "Garrett",
                    "last_name": "Winters",
                    "position": "Accountant",
                    "email": "g.winters@datatables.net",
                    "office": "Tokyo",
                    "extn": "8422",
                    "age": "63",
                    "salary": "170750",
                    "start_date": "2011-07-25"
                },
                {
                    "DT_RowId": "row_3",
                    "first_name": "Ashton",
                    "last_name": "Cox",
                    "position": "Junior Technical Author",
                    "email": "a.cox@datatables.net",
                    "office": "San Francisco",
                    "extn": "1562",
                    "age": "66",
                    "salary": "86000",
                    "start_date": "2009-01-12"
                },
                {
                    "DT_RowId": "row_4",
                    "first_name": "Cedric",
                    "last_name": "Kelly",
                    "position": "Senior Javascript Developer",
                    "email": "c.kelly@datatables.net",
                    "office": "Edinburgh",
                    "extn": "6224",
                    "age": "22",
                    "salary": "433060",
                    "start_date": "2012-03-29"
                },
                {
                    "DT_RowId": "row_5",
                    "first_name": "Airi",
                    "last_name": "Satou",
                    "position": "Accountant",
                    "email": "a.satou@datatables.net",
                    "office": "Tokyo",
                    "extn": "5407",
                    "age": "33",
                    "salary": "162700",
                    "start_date": "2008-11-28"
                },
                {
                    "DT_RowId": "row_6",
                    "first_name": "Brielle",
                    "last_name": "Williamson",
                    "position": "Integration Specialist",
                    "email": "b.williamson@datatables.net",
                    "office": "New York",
                    "extn": "4804",
                    "age": "61",
                    "salary": "372000",
                    "start_date": "2012-12-02"
                },
                {
                    "DT_RowId": "row_7",
                    "first_name": "Herrod",
                    "last_name": "Chandler",
                    "position": "Sales Assistant",
                    "email": "h.chandler@datatables.net",
                    "office": "San Francisco",
                    "extn": "9608",
                    "age": "59",
                    "salary": "137500",
                    "start_date": "2012-08-06"
                },
                {
                    "DT_RowId": "row_8",
                    "first_name": "Rhona",
                    "last_name": "Davidson",
                    "position": "Integration Specialist",
                    "email": "r.davidson@datatables.net",
                    "office": "Tokyo",
                    "extn": "6200",
                    "age": "55",
                    "salary": "327900",
                    "start_date": "2010-10-14"
                },
                {
                    "DT_RowId": "row_9",
                    "first_name": "Colleen",
                    "last_name": "Hurst",
                    "position": "Javascript Developer",
                    "email": "c.hurst@datatables.net",
                    "office": "San Francisco",
                    "extn": "2360",
                    "age": "39",
                    "salary": "205500",
                    "start_date": "2009-09-15"
                },
                {
                    "DT_RowId": "row_10",
                    "first_name": "Sonya",
                    "last_name": "Frost",
                    "position": "Software Engineer",
                    "email": "s.frost@datatables.net",
                    "office": "Edinburgh",
                    "extn": "1667",
                    "age": "23",
                    "salary": "103600",
                    "start_date": "2008-12-13"
                },
                {
                    "DT_RowId": "row_11",
                    "first_name": "Jena",
                    "last_name": "Gaines",
                    "position": "Office Manager",
                    "email": "j.gaines@datatables.net",
                    "office": "London",
                    "extn": "3814",
                    "age": "30",
                    "salary": "90560",
                    "start_date": "2008-12-19"
                },
                {
                    "DT_RowId": "row_12",
                    "first_name": "Quinn",
                    "last_name": "Flynn",
                    "position": "Support Lead",
                    "email": "q.flynn@datatables.net",
                    "office": "Edinburgh",
                    "extn": "9497",
                    "age": "22",
                    "salary": "342000",
                    "start_date": "2013-03-03"
                },
                {
                    "DT_RowId": "row_13",
                    "first_name": "Charde",
                    "last_name": "Marshall",
                    "position": "Regional Director",
                    "email": "c.marshall@datatables.net",
                    "office": "San Francisco",
                    "extn": "6741",
                    "age": "36",
                    "salary": "470600",
                    "start_date": "2008-10-16"
                },
                {
                    "DT_RowId": "row_14",
                    "first_name": "Haley",
                    "last_name": "Kennedy",
                    "position": "Senior Marketing Designer",
                    "email": "h.kennedy@datatables.net",
                    "office": "London",
                    "extn": "3597",
                    "age": "43",
                    "salary": "313500",
                    "start_date": "2012-12-18"
                },
                {
                    "DT_RowId": "row_15",
                    "first_name": "Tatyana",
                    "last_name": "Fitzpatrick",
                    "position": "Regional Director",
                    "email": "t.fitzpatrick@datatables.net",
                    "office": "London",
                    "extn": "1965",
                    "age": "19",
                    "salary": "385750",
                    "start_date": "2010-03-17"
                },
                {
                    "DT_RowId": "row_16",
                    "first_name": "Michael",
                    "last_name": "Silva",
                    "position": "Marketing Designer",
                    "email": "m.silva@datatables.net",
                    "office": "London",
                    "extn": "1581",
                    "age": "66",
                    "salary": "198500",
                    "start_date": "2012-11-27"
                },
                {
                    "DT_RowId": "row_17",
                    "first_name": "Paul",
                    "last_name": "Byrd",
                    "position": "Chief Financial Officer (CFO)",
                    "email": "p.byrd@datatables.net",
                    "office": "New York",
                    "extn": "3059",
                    "age": "64",
                    "salary": "725000",
                    "start_date": "2010-06-09"
                },
                {
                    "DT_RowId": "row_18",
                    "first_name": "Gloria",
                    "last_name": "Little",
                    "position": "Systems Administrator",
                    "email": "g.little@datatables.net",
                    "office": "New York",
                    "extn": "1721",
                    "age": "59",
                    "salary": "237500",
                    "start_date": "2009-04-10"
                },
                {
                    "DT_RowId": "row_19",
                    "first_name": "Bradley",
                    "last_name": "Greer",
                    "position": "Software Engineer",
                    "email": "b.greer@datatables.net",
                    "office": "London",
                    "extn": "2558",
                    "age": "41",
                    "salary": "132000",
                    "start_date": "2012-10-13"
                },
                {
                    "DT_RowId": "row_20",
                    "first_name": "Dai",
                    "last_name": "Rios",
                    "position": "Personnel Lead",
                    "email": "d.rios@datatables.net",
                    "office": "Edinburgh",
                    "extn": "2290",
                    "age": "35",
                    "salary": "217500",
                    "start_date": "2012-09-26"
                },
                {
                    "DT_RowId": "row_21",
                    "first_name": "Jenette",
                    "last_name": "Caldwell",
                    "position": "Development Lead",
                    "email": "j.caldwell@datatables.net",
                    "office": "New York",
                    "extn": "1937",
                    "age": "30",
                    "salary": "345000",
                    "start_date": "2011-09-03"
                },
                {
                    "DT_RowId": "row_22",
                    "first_name": "Yuri",
                    "last_name": "Berry",
                    "position": "Chief Marketing Officer (CMO)",
                    "email": "y.berry@datatables.net",
                    "office": "New York",
                    "extn": "6154",
                    "age": "40",
                    "salary": "675000",
                    "start_date": "2009-06-25"
                },
                {
                    "DT_RowId": "row_23",
                    "first_name": "Caesar",
                    "last_name": "Vance",
                    "position": "Pre-Sales Support",
                    "email": "c.vance@datatables.net",
                    "office": "New York",
                    "extn": "8330",
                    "age": "21",
                    "salary": "106450",
                    "start_date": "2011-12-12"
                },
                {
                    "DT_RowId": "row_24",
                    "first_name": "Doris",
                    "last_name": "Wilder",
                    "position": "Sales Assistant",
                    "email": "d.wilder@datatables.net",
                    "office": "Sidney",
                    "extn": "3023",
                    "age": "23",
                    "salary": "85600",
                    "start_date": "2010-09-20"
                },
                {
                    "DT_RowId": "row_25",
                    "first_name": "Angelica",
                    "last_name": "Ramos",
                    "position": "Chief Executive Officer (CEO)",
                    "email": "a.ramos@datatables.net",
                    "office": "London",
                    "extn": "5797",
                    "age": "47",
                    "salary": "1200000",
                    "start_date": "2009-10-09"
                },
                {
                    "DT_RowId": "row_26",
                    "first_name": "Gavin",
                    "last_name": "Joyce",
                    "position": "Developer",
                    "email": "g.joyce@datatables.net",
                    "office": "Edinburgh",
                    "extn": "8822",
                    "age": "42",
                    "salary": "92575",
                    "start_date": "2010-12-22"
                },
                {
                    "DT_RowId": "row_27",
                    "first_name": "Jennifer",
                    "last_name": "Chang",
                    "position": "Regional Director",
                    "email": "j.chang@datatables.net",
                    "office": "Singapore",
                    "extn": "9239",
                    "age": "28",
                    "salary": "357650",
                    "start_date": "2010-11-14"
                },
                {
                    "DT_RowId": "row_28",
                    "first_name": "Brenden",
                    "last_name": "Wagner",
                    "position": "Software Engineer",
                    "email": "b.wagner@datatables.net",
                    "office": "San Francisco",
                    "extn": "1314",
                    "age": "28",
                    "salary": "206850",
                    "start_date": "2011-06-07"
                },
                {
                    "DT_RowId": "row_29",
                    "first_name": "Fiona",
                    "last_name": "Green",
                    "position": "Chief Operating Officer (COO)",
                    "email": "f.green@datatables.net",
                    "office": "San Francisco",
                    "extn": "2947",
                    "age": "48",
                    "salary": "850000",
                    "start_date": "2010-03-11"
                },
                {
                    "DT_RowId": "row_30",
                    "first_name": "Shou",
                    "last_name": "Itou",
                    "position": "Regional Marketing",
                    "email": "s.itou@datatables.net",
                    "office": "Tokyo",
                    "extn": "8899",
                    "age": "20",
                    "salary": "163000",
                    "start_date": "2011-08-14"
                },
                {
                    "DT_RowId": "row_31",
                    "first_name": "Michelle",
                    "last_name": "House",
                    "position": "Integration Specialist",
                    "email": "m.house@datatables.net",
                    "office": "Sidney",
                    "extn": "2769",
                    "age": "37",
                    "salary": "95400",
                    "start_date": "2011-06-02"
                },
                {
                    "DT_RowId": "row_32",
                    "first_name": "Suki",
                    "last_name": "Burks",
                    "position": "Developer",
                    "email": "s.burks@datatables.net",
                    "office": "London",
                    "extn": "6832",
                    "age": "53",
                    "salary": "114500",
                    "start_date": "2009-10-22"
                },
                {
                    "DT_RowId": "row_33",
                    "first_name": "Prescott",
                    "last_name": "Bartlett",
                    "position": "Technical Author",
                    "email": "p.bartlett@datatables.net",
                    "office": "London",
                    "extn": "3606",
                    "age": "27",
                    "salary": "145000",
                    "start_date": "2011-05-07"
                },
                {
                    "DT_RowId": "row_34",
                    "first_name": "Gavin",
                    "last_name": "Cortez",
                    "position": "Team Leader",
                    "email": "g.cortez@datatables.net",
                    "office": "San Francisco",
                    "extn": "2860",
                    "age": "22",
                    "salary": "235500",
                    "start_date": "2008-10-26"
                },
                {
                    "DT_RowId": "row_35",
                    "first_name": "Martena",
                    "last_name": "Mccray",
                    "position": "Post-Sales support",
                    "email": "m.mccray@datatables.net",
                    "office": "Edinburgh",
                    "extn": "8240",
                    "age": "46",
                    "salary": "324050",
                    "start_date": "2011-03-09"
                },
                {
                    "DT_RowId": "row_36",
                    "first_name": "Unity",
                    "last_name": "Butler",
                    "position": "Marketing Designer",
                    "email": "u.butler@datatables.net",
                    "office": "San Francisco",
                    "extn": "5384",
                    "age": "47",
                    "salary": "85675",
                    "start_date": "2009-12-09"
                },
                {
                    "DT_RowId": "row_37",
                    "first_name": "Howard",
                    "last_name": "Hatfield",
                    "position": "Office Manager",
                    "email": "h.hatfield@datatables.net",
                    "office": "San Francisco",
                    "extn": "7031",
                    "age": "51",
                    "salary": "164500",
                    "start_date": "2008-12-16"
                },
                {
                    "DT_RowId": "row_38",
                    "first_name": "Hope",
                    "last_name": "Fuentes",
                    "position": "Secretary",
                    "email": "h.fuentes@datatables.net",
                    "office": "San Francisco",
                    "extn": "6318",
                    "age": "41",
                    "salary": "109850",
                    "start_date": "2010-02-12"
                },
                {
                    "DT_RowId": "row_39",
                    "first_name": "Vivian",
                    "last_name": "Harrell",
                    "position": "Financial Controller",
                    "email": "v.harrell@datatables.net",
                    "office": "San Francisco",
                    "extn": "9422",
                    "age": "62",
                    "salary": "452500",
                    "start_date": "2009-02-14"
                },
                {
                    "DT_RowId": "row_40",
                    "first_name": "Timothy",
                    "last_name": "Mooney",
                    "position": "Office Manager",
                    "email": "t.mooney@datatables.net",
                    "office": "London",
                    "extn": "7580",
                    "age": "37",
                    "salary": "136200",
                    "start_date": "2008-12-11"
                },
                {
                    "DT_RowId": "row_41",
                    "first_name": "Jackson",
                    "last_name": "Bradshaw",
                    "position": "Director",
                    "email": "j.bradshaw@datatables.net",
                    "office": "New York",
                    "extn": "1042",
                    "age": "65",
                    "salary": "645750",
                    "start_date": "2008-09-26"
                },
                {
                    "DT_RowId": "row_42",
                    "first_name": "Olivia",
                    "last_name": "Liang",
                    "position": "Support Engineer",
                    "email": "o.liang@datatables.net",
                    "office": "Singapore",
                    "extn": "2120",
                    "age": "64",
                    "salary": "234500",
                    "start_date": "2011-02-03"
                },
                {
                    "DT_RowId": "row_43",
                    "first_name": "Bruno",
                    "last_name": "Nash",
                    "position": "Software Engineer",
                    "email": "b.nash@datatables.net",
                    "office": "London",
                    "extn": "6222",
                    "age": "38",
                    "salary": "163500",
                    "start_date": "2011-05-03"
                },
                {
                    "DT_RowId": "row_44",
                    "first_name": "Sakura",
                    "last_name": "Yamamoto",
                    "position": "Support Engineer",
                    "email": "s.yamamoto@datatables.net",
                    "office": "Tokyo",
                    "extn": "9383",
                    "age": "37",
                    "salary": "139575",
                    "start_date": "2009-08-19"
                },
                {
                    "DT_RowId": "row_45",
                    "first_name": "Thor",
                    "last_name": "Walton",
                    "position": "Developer",
                    "email": "t.walton@datatables.net",
                    "office": "New York",
                    "extn": "8327",
                    "age": "61",
                    "salary": "98540",
                    "start_date": "2013-08-11"
                },
                {
                    "DT_RowId": "row_46",
                    "first_name": "Finn",
                    "last_name": "Camacho",
                    "position": "Support Engineer",
                    "email": "f.camacho@datatables.net",
                    "office": "San Francisco",
                    "extn": "2927",
                    "age": "47",
                    "salary": "87500",
                    "start_date": "2009-07-07"
                },
                {
                    "DT_RowId": "row_47",
                    "first_name": "Serge",
                    "last_name": "Baldwin",
                    "position": "Data Coordinator",
                    "email": "s.baldwin@datatables.net",
                    "office": "Singapore",
                    "extn": "8352",
                    "age": "64",
                    "salary": "138575",
                    "start_date": "2012-04-09"
                },
                {
                    "DT_RowId": "row_48",
                    "first_name": "Zenaida",
                    "last_name": "Frank",
                    "position": "Software Engineer",
                    "email": "z.frank@datatables.net",
                    "office": "New York",
                    "extn": "7439",
                    "age": "63",
                    "salary": "125250",
                    "start_date": "2010-01-04"
                },
                {
                    "DT_RowId": "row_49",
                    "first_name": "Zorita",
                    "last_name": "Serrano",
                    "position": "Software Engineer",
                    "email": "z.serrano@datatables.net",
                    "office": "San Francisco",
                    "extn": "4389",
                    "age": "56",
                    "salary": "115000",
                    "start_date": "2012-06-01"
                },
                {
                    "DT_RowId": "row_50",
                    "first_name": "Jennifer",
                    "last_name": "Acosta",
                    "position": "Junior Javascript Developer",
                    "email": "j.acosta@datatables.net",
                    "office": "Edinburgh",
                    "extn": "3431",
                    "age": "43",
                    "salary": "75650",
                    "start_date": "2013-02-01"
                },
                {
                    "DT_RowId": "row_51",
                    "first_name": "Cara",
                    "last_name": "Stevens",
                    "position": "Sales Assistant",
                    "email": "c.stevens@datatables.net",
                    "office": "New York",
                    "extn": "3990",
                    "age": "46",
                    "salary": "145600",
                    "start_date": "2011-12-06"
                },
                {
                    "DT_RowId": "row_52",
                    "first_name": "Hermione",
                    "last_name": "Butler",
                    "position": "Regional Director",
                    "email": "h.butler@datatables.net",
                    "office": "London",
                    "extn": "1016",
                    "age": "47",
                    "salary": "356250",
                    "start_date": "2011-03-21"
                },
                {
                    "DT_RowId": "row_53",
                    "first_name": "Lael",
                    "last_name": "Greer",
                    "position": "Systems Administrator",
                    "email": "l.greer@datatables.net",
                    "office": "London",
                    "extn": "6733",
                    "age": "21",
                    "salary": "103500",
                    "start_date": "2009-02-27"
                },
                {
                    "DT_RowId": "row_54",
                    "first_name": "Jonas",
                    "last_name": "Alexander",
                    "position": "Developer",
                    "email": "j.alexander@datatables.net",
                    "office": "San Francisco",
                    "extn": "8196",
                    "age": "30",
                    "salary": "86500",
                    "start_date": "2010-07-14"
                },
                {
                    "DT_RowId": "row_55",
                    "first_name": "Shad",
                    "last_name": "Decker",
                    "position": "Regional Director",
                    "email": "s.decker@datatables.net",
                    "office": "Edinburgh",
                    "extn": "6373",
                    "age": "51",
                    "salary": "183000",
                    "start_date": "2008-11-13"
                },
                {
                    "DT_RowId": "row_56",
                    "first_name": "Michael",
                    "last_name": "Bruce",
                    "position": "Javascript Developer",
                    "email": "m.bruce@datatables.net",
                    "office": "Singapore",
                    "extn": "5384",
                    "age": "29",
                    "salary": "183000",
                    "start_date": "2011-06-27"
                },
                {
                    "DT_RowId": "row_57",
                    "first_name": "Donna",
                    "last_name": "Snider",
                    "position": "Customer Support",
                    "email": "d.snider@datatables.net",
                    "office": "New York",
                    "extn": "4226",
                    "age": "27",
                    "salary": "112000",
                    "start_date": "2011-01-25"
                }
            ],
            "options": []
        }
    );
});


app.listen(3000, function () {
    console.log("iConsent Server is listening port 3000");
});