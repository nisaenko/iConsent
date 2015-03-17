/**
 * Created by aisaenko on 15-01-17.
 */


var editor;
var templatesEditor;
var administrationEditor;
var consentEditor;


$(document).ready(function() {



    editor = new $.fn.dataTable.Editor( {
        ajax: {
            create: {
                type: 'POST',
                url:  'patients'
            },
            edit: {
                type: 'PUT',
                url:  'patients?id=_id_'
            },
            remove: {
                type: 'DELETE',
                url:  'patients?id=_id_'
            }
        },
        idSrc: "_id",
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



    templatesEditor = new $.fn.dataTable.Editor( {
        ajax: {
            create: {
                type: 'POST',
                url:  'templates'
            },
            edit: {
                type: 'PUT',
                url:  'templates?id=_id_'
            },
            remove: {
                type: 'DELETE',
                url:  'templates?id=_id_'
            }
        },
        idSrc: "_id",
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

    $('#patients-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/patients",
        idSrc: "_id",
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

    $('#templates-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/templates",
        idSrc: "_id",
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
        ajax: {
            create: {
                type: 'POST',
                url:  'users'
            },
            edit: {
                type: 'PUT',
                url:  'users?id=_id_'
            },
            remove: {
                type: 'DELETE',
                url:  'users?id=_id_'
            }
        },
        table: "#administration-table",
        idSrc: "_id",
        fields: [ {
            label: "User ID:",
            name: "username"
        }, {
            label: "User Name:",
            name: "name"

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
            ipOpts: [
                { label: "Clinical Research Coordinator", value: 0},
                { label: "Administrator", value: 1}
            ]
        }, {
            label: "Status:",
            name: "status",
            type: "select",
            ipOpts: [
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 }
            ]
        }
        ]
    } );

    administrationEditor.dependant( 'role', 'status', 'whatever' );

    $('#administration-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/users",
        idSrc: "_id",
        columns: [
            { data: "username"},
            { data: "name" },
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

    var currentConsentTemplate;

    consentEditor = new $.fn.dataTable.Editor( {
        ajax: {
            create: {
                type: 'POST',
                url:  'consents'
            },
            edit: {
                type: 'PUT',
                url:  'consents?id=_id_'
            },
            remove: {
                type: 'DELETE',
                url:  'consents?id=_id_'
            }
        },
        idSrc: "_id",
        table: "#consents-table",
        fields: [ {
            label: "Patient Name:",
            name: "patientName",
            type: "autoComplete",
            opts: {
                source: "patient_lookup",
                minLength: 1,
                select: function( event, ui ) {
                    console.log( ui.item ?
                    "Selected: " + ui.item.value + " aka " + ui.item.id :
                    "Nothing selected, input was " + this.value );

                }
            }

        },{
            label: "Template Name:",
            name: "templateName",
            type: "autoComplete",
            opts: {
                   source: "template_lookup",
                    minLength: 1,
                    select: function( event, ui ) {
                        console.log( ui.item ?
                        "Selected: " + ui.item.value + " aka " + ui.item.id :
                        "Nothing selected, input was " + this.value );
                        currentConsentTemplate = ui.item;
                    }
          }
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
            type: "date"

        }
        ]
    } );

    consentEditor.dependent( 'templateName', function ( val, data, callback ) {

        consentEditor.field( 'templateVersion' ).val(currentConsentTemplate.version);
        consentEditor.field( 'createdBy' ).val(currentConsentTemplate.createdBy);
        consentEditor.field( 'creationDate' ).val(Date.now());
    } );

    //administrationEditor.dependant( 'role', 'status', 'whatever' ); { sExtends: "editor_edit",   editor: consentEditor },

    $('#consents-table').DataTable( {
        dom: "Tfrtip",
        ajax: "/consents",
        columns: [
            { data: "patientName"},
            { data: "templateName"},
            { data: "templateVersion" },
            { data: "creationDate" },
            { data: "createdBy"}
        ],
        tableTools: {
            sRowSelect: "os",
            aButtons: [
                { sExtends: "editor_create", editor: consentEditor },

                { sExtends: "editor_remove", editor: consentEditor }
            ]
        }
    } );

} );


