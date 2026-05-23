    var numero = 0;
    function Add(){
        numero++;
        document.getElementById("numero").innerHTML = numero;
    }
    function rmv(){
        if(numero > 0){
            numero--;
            document.getElementById("numero").innerHTML = numero;
        }
    }