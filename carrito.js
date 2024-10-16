var todo = document.getElementById("todo");
var boton_carro = document.getElementById("boton");
var cerrar = document.getElementsByClassName("cierre")[0];



boton_carro.onclick = function(){
    todo.style.display = "block";
}




cerrar.onclick = function(){
    todo.style.display = "none";
}

window.onclick = function(evento){
    if(evento.target == todo){
        todo.style.display = "none";
    }
}



