(function(){
  'use strict';
  angular.module('eliteApp').controller('TeamsCtrl',['$scope','eliteApi',TeamsCtrl]);

  function TeamsCtrl($scope,eliteApi){
    var vm = this;
    
    // loadlist method is called when user forceRefresh
    vm.loadList = function(forceRefresh){
      eliteApi.getLeagueData(forceRefresh).then(function(data){
        vm.teams = data.teams;
        // complete the promise so ionic knows to hide the refresher
      }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    vm.loadList(false);
  }
})();
