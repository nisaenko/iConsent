/**
 * Created by nisaenko on 14-12-30.
 */

    angular.module('iConsent', ['ui.bootstrap']);
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