var Cont = document.getElementById('Cont')


var contador=0


Cont.innerHTML=contador

function soma() {
    contador++;
    Cont.innerHTML=contador
}

function subtr() {
    if (contador>0){
    contador--;
    Cont.innerHTML=contador
    }

}

function reset(){

contador=0
Cont.innerHTML=contador

}



