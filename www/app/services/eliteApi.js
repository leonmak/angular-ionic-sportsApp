(function () {
    'use strict';

    angular.module('eliteApp').factory('eliteApi', ['$http', eliteApi]);

// factory for object with getter functions to expose api

    function eliteApi($http) {
        var currentLeagueId;

// use callback for fisrt iteration
        function getLeagues(callback){
          $http.get("http://elite-schedule.net/api/leaguedata")
          .success(function(data){
            callback(data);
          });

        }

        function getLeagueData(callback){
          $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
          .success(function(data, status) {
            console.log("Received schedule data via HTTP.", data, status);
            callback(data);
            // self.leagueDataCache.put(cacheKey, data);
            // $ionicLoading.hide();
            // deferred.resolve(data);
          })
          .error(function() {
            console.log("Error while making HTTP call.");
            // $ionicLoading.hide();
            // deferred.reject();
          });
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
