// Aquí realizamos un la consulta de la promesa, esperando su respuesta asíncrona
const apiUrl = 'https://randomuser.me/api/';
const btn = document.getElementById('random');
const tarjeta = document.querySelector('.tarjeta');


function apiGetData(uri){
fetch(uri)
.then(response => {
    return response.json()
})
.then(data => {     
    tarjeta.innerHTML = renderizarDatosUsuario(data.results[0]);
});
}
    /* -------------------------------- CONSIGNA 1 -------------------------------- */
    // Aquí deben desarrollar una función que muestre en pantalla:
    // la foto, el nombre completo del usuario y su email.
    // Esto debe estar basado en la info que nos llega desde la API e insertarse en el HTML.

function renderizarDatosUsuario(datos) {
let templateDatosPersonales = `
<img src="${datos.picture.large}" alt="">
<p>Nombre: ${datos.name.title} ${datos.name.first} ${datos.name.last}</p>
<p>Email: ${datos.email}</p>
`
return templateDatosPersonales;
}


btn.addEventListener('click', function(){
    apiGetData(apiUrl);
})


/* --------------------------- CONSIGNA 2 (extra) --------------------------- */
// Aqui pueden ir por el punto extra de utilizar el boton que se encuentra comentado en el HTML
// Pueden descomentar el código del index.html y usar ese boton para ejecutar un nuevo pedido a la API, sin necesidad de recargar la página.
// Es criterio del equipo QUÉ bloque del código debe contenerse dentro de una función para poder ser ejecutada cada vez que se escuche un click.