var todo = document.getElementById("todo");
var boton_carro = document.getElementById("boton");
var cerrar = document.getElementsByClassName("cierre")[0];
var agrego_carrito = document.querySelector("btn-producto")


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

agrego_carrito.addEventListener('click',function(){
    alert("Se agregó al carrito.");
});
