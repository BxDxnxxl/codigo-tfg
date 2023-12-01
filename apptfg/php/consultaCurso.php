<?php
require 'conexion.php';

if (isset($_GET['curso'])) {
    $curso = $_GET['curso'];

    $sql = "SELECT CONCAT(profesor.nombre, ' ', profesor.primer_apellido) AS nombre_completo, documentos.tipo_documento, entregas.entregado
            FROM entregas
            JOIN profesor ON entregas.profesorId = profesor.idProfesor
            JOIN curso ON entregas.cursoId = curso.idCurso
            JOIN documentos ON entregas.documentoId = documentos.idDocumento
            WHERE curso.curso = :curso";

    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':curso', $curso, PDO::PARAM_STR);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
} else {
    echo json_encode(array());
}
?>





