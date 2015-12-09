(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q',eliteApi]);

  // factory for object with getter functions to expose api

  function eliteApi($http,$q) {
    var currentLeagueId='';

    // use callback for fisrt iteration
    function getLeagues(){
      var deferred = $q.defer();
      $http.get("http://elite-schedule.net/api/leaguedata")
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function() {
        console.log("Error while making HTTP call.");
        deferred.reject();
        // $ionicLoading.hide();
        // deferred.reject();
      });
      return deferred.promise;
    }

    function getLeagueData(){
      var deferred = $q.defer();
      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
      .success(function(data, status) {
        console.log("Received schedule data via HTTP.", data, status);
        deferred.resolve(data);
        // self.leagueDataCache.put(cacheKey, data);
        // $ionicLoading.hide();
        // deferred.resolve(data);
      })
      .error(function() {
        console.log("Error while making HTTP call.");
        deferred.reject();
        // $ionicLoading.hide();
        // deferred.reject();
      });
      return deferred.promise;
    }

    function setLeagueId(leagueId){
      currentLeagueId = leagueId;
    }
    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };
  };
})();
