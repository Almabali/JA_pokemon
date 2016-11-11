/**
 * Created by 212585843 on 11/11/2016.
 */


var app = angular.module('myApp', []);
app.controller('pokeController', function($scope, $http) {

  $scope.ngFilterTypeList = [];
  $http.get("//pokeapi.co/api/v2/type/").then(function(response){


    response.data.results.forEach(function(x){
      var ngFilterType = {};
      ngFilterType.checked=true;
      ngFilterType.type=x.name;
      $scope.ngFilterTypeList.push(ngFilterType);
    });
  });

  $scope.refreshPokemonList=function(){
    let listFrom = Number($scope.listFrom);
    let listTo = Number($scope.listTo )+1;
    $scope.ngPokemonList = [];
    for (let i = listFrom; i < listTo; i++) {
      let poke = {};
      var pokeurl = "//pokeapi.co/api/v2/pokemon/" + i + "/";
      $http.get(pokeurl)
          .then(function (response) {
            console.log("ListTo" + listTo);
            console.log("index: " + i);
            poke.name = response.data.forms[0].name;
            poke.id = i;
            poke.type = [];
            response.data.types.forEach(function(t){
              poke.type.push(t.type.name);
            });
            $scope.ngPokemonList.push(poke);
          });
    }
  };



});
