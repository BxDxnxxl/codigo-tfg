/* FUNCION PARA REALIZAR EL FILTRO DE PROFESOR */
function buscarProfesor() {
    var profesor = $("#profesor").val();
    console.log("Valor de profesor:", profesor);

    if (profesor != "") {
        $.ajax({
            type: "GET",
            url: "../php/consultaProfesor.php",
            dataType: "json",
            data: { profesor: profesor },
            success: function (resultados) {
                mostrarResultadosProfesor(resultados);
            },
            error: function (xhr, status, error) {
                console.log("Error en la solicitud AJAX: " + error);
            }
        });
    }else{
        alert("rellena con un nombre el filtro que estas intentando efectuar");
    }
}

/* FUNCION QUE COGE LOS RESULTADOS, LOS ENCAPSULA Y LOS LLEVA AL FICHERO HTML INDICADO PARA DESPUES MOSTRARLOS EN PANTALLA */
function mostrarResultadosProfesor(resultados) {
    var resultadosJSON = JSON.stringify(resultados);

    var resultadosCodificados = encodeURIComponent(resultadosJSON);

    window.location.href = "tablaProfesor.html?resultados=" + resultadosCodificados;
}

/* FUNCION PARA REALIZAR EL FILTRO DE CURSO */
function buscarCurso() {
    var curso = $("#curso").val();

    if (curso != "") {
        $.ajax({
            type: "GET",
            url: "../php/consultaCurso.php",
            data: { curso: curso },
            dataType: "json",
            success: function (datos) {
                mostrarResultadosCurso(datos);
            },
            error: function (xhr, status, error) {
                console.log("Error en la solicitud AJAX: " + error);
            }
        });
    }else{
        alert("rellena con un codigo de curso el filtro que estas intentando efectuar");
    }
}

function mostrarResultadosCurso(datos) {
    var datosJSON = JSON.stringify(datos);

    var datosCodificados = encodeURIComponent(datosJSON);

    window.location.href = "tablaCurso.html?datos=" + datosCodificados;
}