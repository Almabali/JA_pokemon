/**
 * Created by 212585843 on 11/9/2016.
 */

$(document).ready(function(){

    $('.refreshPokemonList').click(getPokemons($("#listFrom").val(),$("#listTo").val()));
    $(".refreshPokemonList").click(console.log($('#listFrom').val()));
    $('.refreshPokemonList').click(console.log($("#listTo").val()));


});

function getPokemon(index) {
    var pokeurl= "http://pokeapi.co/api/v2/pokemon/"+index+"/";
    var resp=[];
    resp.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png");
    $.get(pokeurl, function (data, status) {
        let pokename=data.forms[0].name;
        console.log(pokename);
        resp.push(pokename);
        return resp;
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

    arr.forEach((x)=>{x=getPokemon(x)});
    let elem=$("<li></li>");
    let pic= $("<img src=''>");
    $(".pokemonList").empty();
    arr.forEach(x=>{
        pic.attr("src",x[0]);
        elem.text(x[1]);
        $(".pokemonList").append(elem,pic);
    });


}