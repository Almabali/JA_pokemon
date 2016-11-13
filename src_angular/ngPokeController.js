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
            poke.show=true;
            response.data.types.forEach(function(t){
              poke.type.push(t.type.name);
            });
            $scope.ngPokemonList.push(poke);
          });
    }
  };

    $scope.ngFilterTypeChange= function (vmi) {
        vmi=!vmi;
        console.log("Runs: ");
        let noneSelected = $scope.ngFilterTypeList.reduce(function (a, b) {
            return a.checked | b.checked;
        }, false);

        if (!noneSelected) {
            console.log("Nothing selected ");
            $scope.ngPokemonList.forEach(x=>x.show = true);

        } else{
            $scope.ngFilterTypeList.forEach(function (f) {
                if(!f.checked){
                    $scope.ngPokemonList.forEach(function (poke) {
                        console.log("Hide: "+ poke.name);
                        if(poke.type.indexOf(f.type)>=0){poke.show=false}

                    })
                }else{
                    $scope.ngPokemonList.forEach(function (poke) {
                        console.log("Show: "+ poke.name);
                        if(poke.type.indexOf(f.type)>=0){poke.show=true}
                    })

                }
            })
        }


    };




});
