(function(){
  'use strict';
  angular.module('eliteApp').controller('LocationsCtrl',['eliteApi',LocationsCtrl]);
  // to use eliteApi must inject into controller. 'LC' is name in <ng-controller="LC">. [LC] is the function below

  // inject into function to use
  function LocationsCtrl(eliteApi){
    var vm = this; // vm stands for view-model
    var data = eliteApi.getLeagueData();
    vm.locations = data.locations;

  }
})();
