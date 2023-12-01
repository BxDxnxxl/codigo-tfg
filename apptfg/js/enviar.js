// Comprueba que el formulario no se envía vacío
function validarFormulario() {
  let esValido = true; // Booleano para indicar si el campo está relleno o no
  const elementosSelect = document.querySelectorAll("select"); // Coge los campos select

  // Recorre todos los elementos que sean select
  elementosSelect.forEach((elemento) => {
    const valor = elemento.value;
    const mensajeValidacion = elemento.nextElementSibling;

    // Si está vacío, pintará de rojo el campo y mostrará el mensaje "Rellena el campo"
    if (valor === "") {
      mensajeValidacion.textContent = "Rellena el campo";
      mensajeValidacion.className = "mensaje-validacion vacio";
      elemento.className = "campo-rojo";
      esValido = false;
    } else {
      mensajeValidacion.textContent = "Campo rellenado";
      mensajeValidacion.className = "mensaje-validacion rellenado";
      elemento.classList.remove("campo-rojo");
    }
  });

  return esValido;
}

/* FUNCIONES PARA REALIZAR EL ENVÍO DE DOCUMENTOS */

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Obtener el token de acceso de la URL
    const accessToken = new URLSearchParams(window.location.hash.substring(1)).get("access_token");

    // Si el token de acceso está en la URL, realizar operaciones necesarias
    if (accessToken) {
      console.log("Token de acceso obtenido:", accessToken);
    } else {
      // Si no hay token de acceso, iniciar sesión
      iniciarSesion();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

// Función para obtener el año solo en el que estamos
function obtenerAnioActual() {
  const fecha = new Date();
  return fecha.getFullYear().toString();
}

// Función para subir un archivo a OneDrive
async function subirAOneDrive(accessToken, archivo) {
  try {
    const cursoSeleccionado = $('#curso option:selected').text();
    console.log("Curso seleccionado:", cursoSeleccionado);
    
    const tipoDocumento = $('#documento option:selected').text();
    console.log("Tipo de documento seleccionado:", tipoDocumento);
    
    const profesorSeleccionado = $('#profesor option:selected').text();
    console.log("Profesor seleccionado:", profesorSeleccionado);
    

    const anioActual = obtenerAnioActual();

    let carpetaDestino;

    switch (tipoDocumento) {
      case "Reuniones de Departamento":
        carpetaDestino = "/Reuniones de Departamento/";
        break;
      case "Actas de Evaluación":
        carpetaDestino = "/Actas de Evaluación/";
        break;
      case "Reuniones de Padres":
        carpetaDestino = "/Reuniones de Padres/";
        break;
      case "Programación de la Tutoría":
      carpetaDestino = "/Programación de la Tutoría/";
        break;
      default:
        carpetaDestino = "/documentos/";
    }

    const extension = archivo.name.split('.').pop(); // Obtener la extensión del archivo
    const nuevoNombre = `${cursoSeleccionado}_${anioActual}_${tipoDocumento}_${profesorSeleccionado}.${extension}`;
    const urlSubida = `https://graph.microsoft.com/v1.0/me/drive/root:${carpetaDestino}${nuevoNombre}:/content`;
    
    // Establecer el tipo de contenido adecuado
    const contentType = archivo.type || "application/octet-stream";

    const response = await fetch(urlSubida, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': contentType,
      },
      body: archivo,
    });

    if (response.ok) {
      console.log("Documento subido exitosamente a OneDrive");
    } else {
      console.error("Error al subir el documento a OneDrive:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Función para enviar documentos a OneDrive
async function enviarDocumentos() {
  try {
    const archivoInput = document.getElementById('adjunto');
    const archivo = archivoInput.files[0];
    // Si ya tienes el token de acceso, úsalo directamente
    const accessToken = new URLSearchParams(window.location.hash.substring(1)).get("access_token");

    console.log("Subiendo a OneDrive...");

    // Puedes utilizar directamente el token de acceso
    await subirAOneDrive(accessToken, archivo);

    // Después de subir a OneDrive, ahora realiza la operación de la base de datos
    
    //saca el id del profesor seleecionado
    const profesorSeleccionado = $('#profesor option:selected').val();
    const [nombreProfesor, idProfesor] = profesorSeleccionado.split('|');
    console.log("Profesor seleccionado:", nombreProfesor, "con ID:", idProfesor);

    //Sacar id del documento seleccionado
    const documentoSeleccionado = $('#documento option:selected').val();
    const [nombreDocumento, idDocumento] = documentoSeleccionado.split('|');
    console.log("Tipo de documento seleccionado:", nombreDocumento, "con ID:", idDocumento);

    //Sacar el id del documento seleccionado
    const cursoSeleccionado = $('#curso option:selected').val();
    const [nombreCurso, idCurso] = cursoSeleccionado.split('|');
    console.log("Curso seleccionado:", nombreCurso, "con ID:", idCurso);


    // Realiza una solicitud AJAX para almacenar los datos en la base de datos
    await $.ajax({
      url: '../php/enviarDocumento.php',
      type: 'POST',
      dataType: 'json',
      data: {
        profesor: idProfesor,
        documento: idDocumento,
        curso: idCurso

      }
    });

    console.log("Documento enviado y almacenado con éxito.");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

/* FUNCIONES PARA CARGAR LOS SELECT */

function opcionesCurso() {
  $.ajax({
    url: '../php/cursoSelect.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var select = $('#curso');
      select.empty();
      data.forEach(function(option) {
        select.append($('<option>', {
          value: `${option.nombre}|${option.id}`,
          text: option.nombre,
        }));
      });
    },
    error: function() {
      console.log('Error al cargar las opciones de curso');
    }
  });
}

$(document).ready(function() {
  opcionesCurso();
});

function opcionesDocumento() {
  $.ajax({
    url: '../php/documentoSelect.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var select = $('#documento');
      select.empty();
      data.forEach(function(option) {
        select.append($('<option>', {
          value: `${option.nombre}|${option.id}`,  // Combina nombre e ID en el valor
          text: option.nombre,
        }));
      });
    },
    error: function() {
      console.log('Error al cargar las opciones de tipo de documento');
    }
  });
}

$(document).ready(function() {
  opcionesDocumento();
});

function opcionesProfesor() {
  $.ajax({
    url: '../php/profesorSelect.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var select = $('#profesor');
      select.empty();
      data.forEach(function(option) {
        select.append($('<option>', {
          value: `${option.nombre}|${option.id}`,
          text: option.nombre,
        }));
      });
    },
    error: function() {
      console.log('Error al cargar las opciones de profesor');
    }
  });
}

$(document).ready(function() {
  opcionesProfesor();
});

