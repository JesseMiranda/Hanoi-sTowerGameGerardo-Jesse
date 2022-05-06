var objetos = {
    "a": ["disco_1", "disco_2", "disco_3", "disco_4", "disco_5"]
}

var discosTotales = 5;
function main() {
    colocar("a");
    inicio();
}

function inicio() {
    console.log("Juego cargardo");
    var discos = document.querySelectorAll("#container> div > div");
    var soltar = document.querySelectorAll("#container > div");

// Arrastrar
    for(var i = 0; i < discos.length; i++) {
        discos[i].addEventListener("dragstart", arrastradoInicial, false);
        discos[i].addEventListener("dragend", finalizado, false);
    }
    
// Soltar
    for(var i = 0; i < soltar.length; i++) {
        soltar[i].addEventListener("dragenter", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("dragover", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("drop", dropFinal, false);
    }
    
}

function arrastradoInicial(e) {
    var padre = e.target.parentNode;
    if(padre.childNodes[0].id === e.target.id) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);        
    }

}
function finalizado(e) {
    var final1 = document.getElementById("b");
    var final2 = document.getElementById("c");
    e.preventDefault();
    
        if(final1.childNodes.length === discosTotales) {
            window.alert('HAS GANADO');
        }
   
        if(final2.childNodes.length === discosTotales) {
            window.alert('HAS GANADO');
        }  
    
}

function dropFinal(e) {
    e.preventDefault();
    var puntero = e.target;
    var padre = document.getElementById(puntero.id).childNodes;   
    var item = e.dataTransfer.getData("Text");

    var puedoPoner = cortaCompa(padre, item);

    if(puntero.id != "disco_1" && puntero.id != "disco_2" && puntero.id != "disco_3" && puntero.id != "disco_4" && puntero.id != "disco_5" && item != '' &&  puedoPoner ) {
        
        var quitar = document.getElementById(item);
        quitar.parentNode.removeChild(quitar);
        puntero.innerHTML = '<div id="'+item+'" draggable="true"></div>' + puntero.innerHTML;
    }
    else{
        alert("NO SE PUEDE HACER ESTE MOVIMIENTO");
    }
    inicio();
}

function colocar(p) {
    var lineas = document.getElementById(p);
    lineas.innerHTML = '';
    for(var i = 0; i < objetos[p].length; i++) {
        lineas.innerHTML += '<div id="'+objetos[p][i]+'" draggable="true"></div>';
    }
    
}

function cortaCompa(primero, segundo) {
    if(primero[0] == undefined) {
        base = true;
    } else {
        var base = ( segundo.split("_")[1] < primero[0].id.split("_")[1] ) ? true: false;
    }
    return base;
}
// setTimeout(main, 2000);
window.addEventListener("load", main, false);
