/**
 * Created by 212585843 on 11/9/2016.
 */

$(document).ready(function(){
    loadPokeTypes();

    $('.refreshPokemonList').click(function(){
        getPokemons($("#listFrom").val(),$("#listTo").val());
    });
});

function getPokemon(index,callback) {
    var pokeurl= "//pokeapi.co/api/v2/pokemon/"+index+"/";
    var poke=[];
    poke.push("//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png");
    $.get(pokeurl, function (data, status) {
        let pokename=data.forms[0].name;
        let poketypes=[];
        data.types.forEach(function(t){
            poketypes.push(t.type.name)
        });
        console.log(pokename+" type: "+poketypes);
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
    elem.text(capitalizeFirstLetter(poke[1]));
    //console.log(poke);
    $(".pokemonList").append(elem,pic);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function loadPokeTypes(){

    $.get( "http://pokeapi.co/api/v2/type/", function (data, status) {
        let res=[];
        data.results.forEach(x=>res.push(x.name));
        //console.log(res);
        res.forEach(function (r) {
            let cbelem=$("<div class='checkbox'></div>");
            let cblabel=$("<label></label>");
            let cbin=$("<input type='checkbox'>")
            console.log(r);
            cbin.val(r.toString());
            cbin.text(capitalizeFirstLetter(r));
            cblabel.append(cbin);
            cbelem.append(cblabel);
           $("#filterTypeList").append(cbelem);

        })
    });
}