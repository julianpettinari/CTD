/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

    const urlTareas = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
    const urlUsuario = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
    const token = JSON.parse(localStorage.jwt);
  
    const formCrearTarea = document.querySelector('.nueva-tarea');
    const nuevaTarea = document.querySelector('#nuevaTarea');
    const btnCerrarSesion = document.querySelector('#closeApp');
  
    obtenerNombreUsuario();
    consultarTareas();
  
    /* -------------------------------------------------------------------------- */
    /*                          FUNCIÓN 1 - Cerrar sesión                         */
    /* -------------------------------------------------------------------------- */
  
    btnCerrarSesion.addEventListener('click', function () {
      const cerrarSesion = confirm("¿Desea cerrar sesión?");
      if (cerrarSesion) {
        //limpiamos el localstorage y redireccioamos a login
        localStorage.clear();
        location.replace('./index.html');
      }
    });
  
    /* -------------------------------------------------------------------------- */
    /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
    /* -------------------------------------------------------------------------- */
  
    function obtenerNombreUsuario() {
      const settings = {
        method: 'GET',
        headers: {
          authorization: token
        }
      };
      console.log("Consultando mi usuario...");
      fetch(urlUsuario, settings)
        .then(response => response.json())
        .then(data => {
          console.log("Nombre de usuario:");
          console.log(data.firstName);
          const nombreUsuario = document.querySelector('.user-info p');
          nombreUsuario.innerText = data.firstName;
        })
        .catch(error => console.log(error));
    }
  
  
    /* -------------------------------------------------------------------------- */
    /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
    /* -------------------------------------------------------------------------- */
  
    function consultarTareas() {
      const settings = {
        method: 'GET',
        headers: {
          authorization: token
        }
      };
      console.log("Consultando mis tareas...");
      fetch(urlTareas, settings)
        .then(response => response.json())
        .then(tareas => {
          console.log("Tareas del usuario");
          console.table(tareas);
  
          renderizarTareas(tareas);
          botonesCambioEstado();
          botonBorrarTarea();
        })
        .catch(error => console.log(error));
    };
  
  
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
    /* -------------------------------------------------------------------------- */
  
    formCrearTarea.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log("crear terea");
      console.log(nuevaTarea.value);
  
      const payload = {
        description: nuevaTarea.value.trim()
      };
      const settings = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }
      console.log("Creando un tarea en la base de datos");
      fetch(urlTareas, settings)
        .then(response => response.json())
        .then(tarea => {
          console.log(tarea)
          consultarTareas();
        })
        .catch(error => console.log(error));
  
  
      //limpiamos el form
      formCrearTarea.reset();
    })

    /* -------------------------------------------------------------------------- */
    /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
    /* -------------------------------------------------------------------------- */
    function renderizarTareas(listado) {
      let tareasPendientes = document.querySelector(".tareas-pendientes");
      console.log(tareasPendientes);
      tareasPendientes.innerHTML = "";

      listado.forEach(element => {
        tareasPendientes.innerHTML += `<li class="tarea"> ${element.description} </li>`;
      });


    }

    /* -------------------------------------------------------------------------- */
    /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
    /* -------------------------------------------------------------------------- */
    function botonesCambioEstado() {


    }


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
    /* -------------------------------------------------------------------------- */
    function botonBorrarTarea() {


    }
    
});
  
  