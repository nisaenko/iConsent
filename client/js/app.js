/**
 * Created by nisaenko on 14-12-30.
 */

    angular.module('iConsent', ['ui.bootstrap', 'patientsApp']);
    angular.module('iConsent').controller('TabsMainCtrl', function ($scope, $window) {
        /*
        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];*/

        $scope.alertMe = function() {
            setTimeout(function() {
                $window.alert('You\'ve selected the alert tab!');
            });
        };

    });

angular.module('patientsApp', ['datatables']).controller('patientsTableCtrl', function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.dtOptions = DTOptionsBuilder
        .fromSource('data.json')
        // Add Bootstrap compatibility
        .withBootstrap();
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('middleName').withTitle('Middle name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
        DTColumnBuilder.newColumn('dateOfBirth').withTitle('Date of birth'),
        DTColumnBuilder.newColumn('registrationDate').withTitle('Registration date'),
        DTColumnBuilder.newColumn('address').withTitle('Address')
    ];
});