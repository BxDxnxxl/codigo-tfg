<?php 
require 'conexion.php';

$sql = "SELECT idProfesor, nombre, primer_apellido FROM profesor";
$stmt = $conn->prepare($sql);
$stmt->execute();

$options = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $idProfesor = $row['idProfesor'];
    $nombre = $row['nombre'];
    $primerApellido = $row['primer_apellido'];
    $options[] = array('id' => $idProfesor, 'nombre' => "{$nombre} {$primerApellido}");
}

header('Content-Type: application/json');
echo json_encode($options);
?>