const apiUrl = 'https://dog.ceo/api/breeds/image/random';

const btn = document.querySelector('#random');
const imgDog = document.querySelector('#perrito');

function peticion(url){
    fetch (apiUrl).then(respuesta => {
        console.log(respuesta);
        return respuesta.json();
    }).then(datos =>{
        console.log(datos);
        imgDog.setAttribute('src', datos.message);
    }).catch(error =>{
        console.log(error);
    })
}

btn.addEventListener('click', function(){
    peticion(apiUrl);
})

