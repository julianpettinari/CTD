const buttons = document.querySelectorAll("button");

buttons.forEach((button) => button.addEventListener('click', enviarMensaje));

function enviarMensaje(evento){

    const elemento = evento.target;
    console.log("ELEMENTO QUE DISPARA EL EVENTO: ", elemento);

    const dataset = elemento.dataset;
    console.log("DATASET DEL ELEMENTO", dataset);

    const titulo = dataset.titulo;
    console.log("TITULO: ", titulo);

    const idUsuario = Number(dataset.idUsuario);
    console.log("ID USUARIO: ", idUsuario);

    fetch("https://jsonplaceholder.typicode.com/posts", {  // si a fetch no le aclaramos por defecto usa get, por lo cual tenemos que decirle que queremos usar post.
        method: "POST",
        body: JSON.stringify({
            title:titulo,
            userId: idUsuario,
            
        }),
        headers:{
        'Content-type' : 'application/json; charset=UTF-8' ,
    },
    })
    .then ((response) => response.json())
    .then ((data) =>{
        console.log("RESPUESTA DE LA API: ", data);
        const mensaje = document.querySelector("#mensaje-posteado");
        mensaje.textContent = data.title;
    });
}

