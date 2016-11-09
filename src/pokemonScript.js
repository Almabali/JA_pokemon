/**
 * Created by 212585843 on 11/9/2016.
 */

$(document).ready(function(){

    $('.refreshPokemonList').click(getPokemons($('#listFrom').val),$('#listTo').val);




});

function getPokemon(indxex) {
    var pokeurl= "http://pokeapi.co/api/v2/"+index;
    var resp=[]
    resp.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png");
    $.get(pokeurl, function (data, status) {
        pokemon=JSON.parse(data);
        resp.push(pokemon.forms[0].name);
        return resp;
    });
};

function getPokemons(start, end){
    starti=parseInt(start);
    endi=parseInt(end);
    var arr=new Array(endi -starti);
    arr.fill(starti);
    for(let i=0; i<arr.length; i++){
        arr[i]+=i;
    }

    arr.forEach((x)=>{x=getPokemon(x)});
    var htmlelem=("<li></li>");
    arr.forEach(x=>{$(".pokemonList").append(htmlelem.text(x[1]))});


}