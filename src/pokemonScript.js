/**
 * Created by 212585843 on 11/9/2016.
 */

$(document).ready(function(){

    $('.refreshPokemonList').click(function(){
        getPokemons($("#listFrom").val(),$("#listTo").val());
    });
    // $(".refreshPokemonList").click(console.log($('#listFrom').val()));
    // $('.refreshPokemonList').click(console.log($("#listTo").val()));


});

function getPokemon(index,callback) {
    var pokeurl= "http://pokeapi.co/api/v2/pokemon/"+index+"/";
    var poke=[];
    poke.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png");
    $.get(pokeurl, function (data, status) {
        let pokename=data.forms[0].name;
        console.log(pokename);
        poke.push(pokename);
        callback(poke);
    });
};

function getPokemons(start, end){
    console.log("Started get pokemons");
    let starti=Number(start);
    let endi=Number(end);
    console.log(starti);// azt irja, hogy nem szám
    // starti=5;//test
    // endi=8;//test

    var arr=new Array(endi -starti+1);
    arr.fill(starti);
    for(let i=0; i<arr.length; i++){
        arr[i]+=i;
    }

    $('.pokemonList').empty();

    console.log("pokelist empty");

    arr.forEach((x)=>{getPokemon(x, makeListElement)});

}

function makeListElement(poke){
    let elem=$("<li></li>");
    let pic= $("<img src=''>");
    pic.attr("src",poke[0]);
    elem.text(poke[1]);
    //console.log(poke);
    $(".pokemonList").append(elem,pic);

}