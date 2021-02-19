const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
//Cuando el formulario de crear o editar se ejecuta
formularioContactos.addEventListener('submit', leerFormulario);

//Listener para eliminar el boton
  if (listadoContactos) {
    listadoContactos.addEventListener('click', eliminarContacto);
  }
  //Buscador
    inputBuscador.addEventListener('input', buscarContactos);

    //Cantidad de registros
    numeroContactos();
}
function leerFormulario(e) {
  e.preventDefault();

  //Leer los datos de los inputs
  const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;
  if(nombre === '' || empresa === '' || telefono === '') {
    //2 parametros: texto y clase
    mostrarNotificacion('Todos los campos son obligatorios', 'error');
  } else {
    //Pasa la validacion, crear llamado a AJAX
    const infoContacto = new FormData();
    infoContacto.append('nombre', nombre);
    infoContacto.append('empresa', empresa);
    infoContacto.append('telefono', telefono);
    infoContacto.append('accion', accion);

    console.log(...infoContacto);

    if(accion === 'crear') {
      //crearemos un nuevo contacto
      insertarBD(infoContacto);
    } else {
      //editar el contacto
      //Leer el id
      const idRegistro = document.querySelector('#id').value;
      infoContacto.append('id', idRegistro);
      actualizarRegistro(infoContacto);
    }
  }
}
/*Inserta en la base de datos via AJAX */
function insertarBD(datos) {
  //llamado a AJAX

  //Crear objeto
  const xhr = new XMLHttpRequest();
  //Abrir la conexion
  xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
  //Pasar los datos
  xhr.onload = function() {
    if(this.status === 200) {
      console.log(JSON.parse(xhr.responseText));
      //Leemos la respuesta de PHP
      const respuesta = JSON.parse(xhr.responseText);
      //Inserta un nuevo elemento a la tabla
      const nuevoContacto = document.createElement('tr');
      nuevoContacto.innerHTML = `
      <td>${respuesta.datos.nombre}</td>
      <td>${respuesta.datos.empresa}</td>
      <td>${respuesta.datos.telefono}</td>
      `;
      //Crear contenedor para los botones
      const contenedorAcciones = document.createElement('td');

      //Crear el icono de editar
      const iconoEditar = document.createElement('i');
      iconoEditar.classList.add('far', 'fa-edit');

      //Crea el enlace para editar
      const btnEditar = document.createElement('a');
      btnEditar.appendChild(iconoEditar);
      btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
      btnEditar.classList.add('btn', 'btn-editar');

      //Agregarlo al padre
      contenedorAcciones.appendChild(btnEditar);

      //Crear el icono de eliminar
      const iconoEliminar = document.createElement('i');
      iconoEliminar.classList.add('far', 'fa-trash-alt');

      //Crear el boton de eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.appendChild(iconoEliminar);
      btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
      btnEliminar.classList.add('btn', 'btn-borrar');

      //Agregarlo al padre
      contenedorAcciones.appendChild(btnEliminar);

      //Agregarlo al tr
      nuevoContacto.appendChild(contenedorAcciones);

      //Agregarlo con los contactos
      listadoContactos.appendChild(nuevoContacto);

      //Resetar el formulario
      document.querySelector('form').reset();

      //Mostrar la notificacion de exito
      mostrarNotificacion('Contacto creado correctamente', 'correcto');

      //Actualizar cantidad de registros
      numeroContactos();
    }
  }
  //enviar los datos
  xhr.send(datos);
}
//Actualizar registros o editarlos
function actualizarRegistro(datos) {
  //Crear el objeto
  const xhr = new XMLHttpRequest();
  //Abrir la conexion
  xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
  //Leer la respuesta
  xhr.onload = function() {
    if (this.status === 200) {
      const respuesta = JSON.parse(xhr.responseText);
      if(respuesta.respuesta === 'correcto') {
        //mostrar notificacion
        mostrarNotificacion ('Contacto editado correctamente', 'correcto');
      } else {
        //hubo un error
        mostrarNotificacion ('No se editó el contacto', 'error');
      }
      //Despues de 3 segundos redireccionar
      setTimeout(() => {
        window.location.href = 'index.php';
      }, 4000);
    }
  }
  //Enviar la peticion
  xhr.send(datos);

}

//Eliminar el contacto
function eliminarContacto(e) {
  if(e.target.parentElement.classList.contains('btn-borrar')) {
    //Tomar el id
    const id = e.target.parentElement.getAttribute('data-id');
    //console.log(id);
    //Preguntar al usuario
    const respuesta = confirm('¿Estás seguro(a)?');
    if(respuesta) {
      //Llamar a ajax
      //Crear el objeto
      const xhr = new XMLHttpRequest();
      //Abrir la conexión
      xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
      //Leer la respuesta
      xhr.onload = function() {
        if(this.status === 200) {
          const resultado = JSON.parse(xhr.responseText);

          if (resultado.respuesta == 'correcto') {
            //Eliminar el registro del DOM
            console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.remove();
            //Mostrar notificacion
            mostrarNotificacion('Contacto eliminado', 'correcto');
            //Actualizar cantidad de registros
              numeroContactos();
          } else {
            //Mostramos una notificacion
            mostrarNotificacion('Hubo un error...', 'error');
          }
        }
      }
      //Enviar la petición
      xhr.send();
    }
  }
}


//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
  const notificacion = document.createElement('div');
  notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

  //Formulario
  formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

  //Ocultar y mostrar la notificacion
  setTimeout(() => {
    notificacion.classList.add('visible');
    setTimeout(() => {
      notificacion.classList.remove('visible');
      setTimeout(() => {
        notificacion.remove();
      }, 500);
    }, 3000);
  }, 100);
}

//Buscador de registros
function buscarContactos(e) {
  const expresion =  RegExp(e.target.value, "i"),
        registros = document.querySelectorAll('tbody tr');

        registros.forEach(registro => {
          registro.style.display = 'none';

          if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
            registro.style.display = 'table-row';
          }
          numeroContactos();
        })
}

//Muestra la cantidad de registros guardados
function numeroContactos() {
  const totalContactos =  document.querySelectorAll('tbody tr'),
  contenedorNumero = document.querySelector('.total-contactos span');

  let total = 0;
  totalContactos.forEach(contacto => {
    if(contacto.style.display === '' || contacto.style.display === 'table-row'){
      total++;
    }
  });

  contenedorNumero.textContent = total;
}