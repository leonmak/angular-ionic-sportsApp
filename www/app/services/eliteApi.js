(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['CacheFactory' , '$ionicLoading' , '$http' , '$q' , eliteApi]);

  // factory for object with getter functions to expose api

  function eliteApi(CacheFactory,$ionicLoading, $http, $q) {
// console.log(CacheFactory.get("leaguesCache"));
// for some reason console.log changes local storage, I think.
    self.leaguesCache = CacheFactory.get("leaguesCache");
    self.leagueDataCache = CacheFactory.get("leagueDataCache");

    self.leaguesCache.setOptions({
      onExpire: function (key, value) {
        getLeagues()
        .then(function () {
          console.log("Leagues Cache was automatically refreshed.", new Date());
        }, function () {
          console.log("Error getting data. Putting expired item back in the cache.", new Date());
          self.leaguesCache.put(key, value);
        });
      }
    });


    self.leagueDataCache.setOptions({
      onExpire: function (key, value) {
        getLeagueData()
        .then(function () {
          console.log("League Data Cache was automatically refreshed.", new Date());
        }, function () {
          console.log("Error getting data. Putting expired item back in the cache.", new Date());
          self.leagueDataCache.put(key, value);
        });
      }
    });
    self.staticCache = CacheFactory.get("staticCache");

    function setLeagueId(leagueId){
      self.staticCache.put("currentLeagueId", leagueId);
    }
    // var currentLeagueId = '';
    function getLeagueId(){
      var id = self.staticCache.get("currentLeagueId");
      console.log("in get leagueid", id);
      return id;
    }

    function getLeagues(){
      var deferred = $q.defer(),
      cacheKey     = "leagues",
      leaguesData  = self.leaguesCache.get(cacheKey);

      if(leaguesData){
        console.log("found data in cache!", leaguesData);
        deferred.resolve(leaguesData);
      }else{
        $http.get("http://elite-schedule.net/api/leaguedata")
        .success(function(data){
          console.log("http >",data);
          self.leaguesCache.put(cacheKey, data);
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function() {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject();
          // deferred.reject();
        });
      }
      return deferred.promise;
    }

    function getLeagueData(forceRefresh){
      // if user never forceRefresh, set (boolean) flag to false
      if (typeof forceRefresh === "undefined") { forceRefresh = false; }

      var deferred = $q.defer(),
      cacheKey     = "leagueData-" + getLeagueId(),
      leagueData   = null;

      // by default flag is false, so leagueData will check if can get data from cache
      if(!forceRefresh){  leagueData   = self.leagueDataCache.get(cacheKey); }

      $ionicLoading.show({template:'Loading...'});

      if(leagueData){
        console.log("Found data in cache", leagueData);
        $ionicLoading.hide();
        deferred.resolve(leagueData);
      }else{
        $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
        .success(function(data, status) {
          console.log("Received schedule data via HTTP." , data   , status);
          self.leagueDataCache.put(cacheKey   , data);
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function() {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject();
        });
      }
      return deferred.promise;

    }

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };
  };
})();
