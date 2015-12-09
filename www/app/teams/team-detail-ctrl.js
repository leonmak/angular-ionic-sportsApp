(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamDetailCtrl', ['$stateParams', TeamDetailCtrl]);
// injecting $stateParams
    function TeamDetailCtrl($stateParams) {
        var vm = this;

        console.log("$stateParams", $stateParams);

    };
})();
