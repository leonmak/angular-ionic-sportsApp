(function(){
  'use strict';
  angular.module('eliteApp').controller('LocationMapCtrl',['$stateParams','eliteApi','$scope',LocationMapCtrl]);

  function LocationMapCtrl($stateParams, eliteApi, $scope){
    var vm = this;


    vm.locationId = Number($stateParams.id);

    vm.map = {
      center: {
        latitude: 38.897677,
        longitude: -77.036530,
      },
      zoom: 12
    };
    vm.marker = { }


    eliteApi.getLeagueData().then(function(data){

      vm.location = _.find(data.locations, { id: vm.locationId });
      vm.marker = {
        latitude: vm.location.latitude,
        longitude: vm.location.longitude,
        labelContent: vm.location.name + "<br/>(Tap for directions)",
        labelClass: 'marker-labels',
        opacity:0.5,
        labelAnchor: (30, 0)
      };

      vm.map.center.latitude = vm.location.latitude;
      vm.map.center.longitude = vm.location.longitude;
    });

    vm.locationClicked = function(marker){
        window.location = "geo:0,0?q=" + marker.latitude + "," + marker.longitude +"("+vm.location.name+")";
        // window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
    };

  }
})();
