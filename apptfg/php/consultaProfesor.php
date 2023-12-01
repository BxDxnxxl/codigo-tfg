<?php
require 'conexion.php';

if (isset($_GET['profesor'])) {
    $profesor = $_GET['profesor'];

    $sql = "SELECT curso.curso, documentos.tipo_documento, entregas.entregado
            FROM entregas
            JOIN profesor ON entregas.profesorId = profesor.idProfesor
            JOIN curso ON entregas.cursoId = curso.idCurso
            JOIN documentos ON entregas.documentoId = documentos.idDocumento
            WHERE profesor.nombre = :profesor";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':profesor', $profesor, PDO::PARAM_STR);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($data);
    } else {
        echo json_encode(array());
    }
?>
