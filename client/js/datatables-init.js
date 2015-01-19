/**
 * Created by aisaenko on 15-01-17.
 */


var editor;
var templatesEditor;
var administrationEditor;

$(document).ready(function() {

    editor = new $.fn.dataTable.Editor( {
        ajax: "/patients",
        table: "#patients-table",
        fields: [ {
            label: "First name:",
            name: "firstName"
        }, {
            label: "Middle name:",
            name: "middleName"

        }, {
            label: "Last name:",
            name: "lastName"
        }, {
            label: "Date of birth:",
            name: "dateOfBirth",
            type: "date"
        }, {
            label: "Registration date:",
            name: "registrationDate",
            type: "date"
        }, {
            label: "Adress:",
            name: "address"
        }
        ]
    } );

    $('#patients-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/patients",
        columns: [
            { data: "firstName"},
            { data: "middleName" },
            { data: "lastName"},
            { data: "dateOfBirth" },
            { data: "registrationDate" },
            { data: "address" }
        ],
        tableTools: {
            sRowSelect: "os",
            aButtons: [
                { sExtends: "editor_create", editor: editor },
                { sExtends: "editor_edit",   editor: editor },
                { sExtends: "editor_remove", editor: editor }
            ]
        }
    } );



    templatesEditor = new $.fn.dataTable.Editor( {
        ajax: "/templates",
        table: "#templates-table",
        fields: [ {
            label: "Template Name:",
            name: "templateName"
        }, {
            label: "Template Version:",
            name: "templateVersion",
            type: "readonly"

        }, {
            label: "Created By:",
            name: "createdBy",
            type: "readonly"
        }, {
            label: "Creation Date:",
            name: "creationDate",
            type: "readonly"
        }, {
            label: "Updated By:",
            name: "updatedBy",
            type: "readonly"
        }, {
            label: "Date of Update:",
            name: "dateOfUpdate",
            type: "readonly"
        }, {
            label: "Consent Form Template:",
            name: "consentFormTemplate",
            type: "textarea"
        }

        ]
    } );

    $('#templates-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/templates",
        columns: [
            { data: "templateName"},
            { data: "templateVersion" },
            { data: "createdBy"},
            { data: "creationDate" },
            { data: "updatedBy" },
            { data: "dateOfUpdate" }
        ],
        tableTools: {
            sRowSelect: "os",
            aButtons: [
                { sExtends: "editor_create", editor: templatesEditor },
                { sExtends: "editor_edit",   editor: templatesEditor },
                { sExtends: "editor_remove", editor: templatesEditor }
            ]
        }
    } );

    $.fn.dataTable.Editor.prototype.dependant = function ( parent, child, url ) {
        var that = this;

        $('select', this.field( parent ).node()).on( 'change', function () {
            var data = {};
            data[ parent ] = that.field( parent ).val();

            $.ajax( {
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function ( json ) {
                    that.field( child ).update( json );
                }
            } );
        } );
    };

        administrationEditor = new $.fn.dataTable.Editor( {
            ajax: "/users",
            table: "#administration-table",
            fields: [ {
                label: "User ID:",
                name: "userID"
            }, {
                label: "User Name:",
                name: "userName"

            }, {
                label: "Password:",
                name: "password",
                type: "password"
            }, {
                label: "Email:",
                name: "email"
            }, {
                label: "Role:",
                name: "role",
                type: "select",
                options: [
                    { label: "Clinical Research Coordinator", value: 0},
                    { label: "Administrator", value: 1}
                ]
            }, {
                label: "Status:",
                name: "status",
                type: "select",
                options: [
                    { label: "Active", value: 1 },
                    { label: "Inactive", value: 0 }
                ]
            }
            ]
        } );

    $('#administration-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/users",
        columns: [
            { data: "userID"},
            { data: "userName" },
            { data: "email"},
            {
                "class": "center",
                "data": "role",
                "render": function (val, type, row) {
                    return val == 0 ? "Clinical Research Coordinator" : "Administrator";
                }
            },
            {
                "class": "center",
                "data": "status",
                "render": function (val, type, row) {
                    return val == 0 ? "Inactive" : "Active";
                }
            }
        ],
        tableTools: {
            sRowSelect: "os",
            aButtons: [
                { sExtends: "editor_create", editor: administrationEditor },
                { sExtends: "editor_edit",   editor: administrationEditor },
                { sExtends: "editor_remove", editor: administrationEditor }
            ]
        }
    } );

});


