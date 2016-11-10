/**
 * Created by 212585843 on 11/9/2016.
 */

$(document).ready(function(){
    loadPokeTypes();

    $('.refreshPokemonList').click(function(event){
        event.preventDefault();
        getPokemons($("#listFrom").val(),$("#listTo").val());

    });

    $('#filterTypeBtn').click(function (event) {
        event.preventDefault();
        var selected = [];
        $('#filterTypeList input:checked').each(function() {
            selected.push($(this).val());
        });
        let del=[];
        console.log("selected: "+selected);

        $(".pokemonList li").each(function(){
            let ptypes=$(this).attr("types").split(",");

            console.log(ptypes);
            let b=true;

            for(p of ptypes){
                if (selected.indexOf(p)>=0){b=false}
            }
            del.push(b)

        });

        console.log(del);

        for(let i=0; i<del.length;i++){
            if (del[i]){
                //console.log($(".pokemonList > li").eq(i+1));
                $(".pokemonList > li").eq(i).addClass("hide");
            }
        }


    })

});

function getPokemon(index,callback) {
    var pokeurl= "//pokeapi.co/api/v2/pokemon/"+index+"/";
    var poke=[];

    poke.push("//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+index+".png");
    $.get(pokeurl, function (data, status) {
        let pokename=data.forms[0].name;
        let poketypes=[];
        data.types.forEach(function(t){
            poketypes.push(t.type.name);
        });
        console.log(pokename+" type: "+poketypes);
        poke.push(pokename);
        poke.push(poketypes)

        callback(poke);
    });
};

function getPokemons(start, end){
    let starti=Number(start);
    let endi=Number(end);
    var arr=new Array(endi -starti+1);
    arr.fill(starti);
    for(let i=0; i<arr.length; i++){
        arr[i]+=i;
    }

    $('.pokemonList').empty();

    arr.forEach((x)=>{getPokemon(x, makeListElement)});

}

function makeListElement(poke){
    console.log(poke);
    let elem=$("<li></li>");

    elem.attr("types", poke[2].toString())
    let pic= $("<img src=''>");
    pic.attr("src",poke[0]);
    elem.text(capitalizeFirstLetter(poke[1]));
    elem.append(pic);
    $(".pokemonList").append(elem);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function loadPokeTypes(){

    $.get( "http://pokeapi.co/api/v2/type/", function (data, status) {
        let res=[];
        data.results.forEach(x=>res.push(x.name));
        res.forEach(function (r) {
            let cbelem=$("<div class='checkbox'></div>");
            let cblabel=$("<label></label>");
            let cbin=$("<input type='checkbox'>");

            cbin.val(r.toString());
            cblabel.text(capitalizeFirstLetter(r));
            cblabel.prepend(cbin);
            cbelem.append(cblabel);
           $("#filterTypeList").append(cbelem);

        })
    });
}