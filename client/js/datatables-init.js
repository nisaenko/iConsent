/**
 * Created by aisaenko on 15-01-17.
 */


var editor;
var templatesEditor;

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
} );


