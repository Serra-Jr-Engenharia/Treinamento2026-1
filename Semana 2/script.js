let x = 0;

function remover(){
    if(x > 0){
        x--;
        document.getElementById("contador").innerText = x;
    }
}

function reset(){
    if(x > 0){
        x = 0;
        document.getElementById("contador").innerText = x;
    }
}

function adicionar(){
    x++;
    document.getElementById("contador").innerText = x;
}
