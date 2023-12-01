<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos del formulario
    $profesor = $_POST['profesor'];
    $documento = $_POST['documento'];
    $curso = $_POST['curso'];

    // Realiza la inserción en la tabla de entregas
    $sql = "INSERT INTO entregas (profesorId, documentoId, cursoId, fecha, entregado) VALUES (:profesor, :documento, :curso, YEAR(NOW()), 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':profesor', $profesor);
    $stmt->bindParam(':documento', $documento);
    $stmt->bindParam(':curso', $curso);

    if ($stmt->execute()) {
        // La entrega se ha almacenado correctamente
        $response = array('success' => true);
        echo json_encode($response);
    } else {
        // Error al almacenar la entrega
        $response = array('success' => false, 'error' => 'Error al almacenar la entrega en la base de datos');
        echo json_encode($response);
    }
} else {
    // Método no permitido
    http_response_code(405);
    exit('Método no permitido');
}
?>