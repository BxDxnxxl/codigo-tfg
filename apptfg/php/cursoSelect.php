<?php 
require 'conexion.php';

$sql = "SELECT idCurso, curso FROM curso";
$stmt = $conn->prepare($sql);
$stmt->execute();

$options = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $idCurso = $row['idCurso'];
    $curso = $row['curso'];
    $options[] = array('id' => $idCurso, 'nombre' => $curso);
}

header('Content-Type: application/json');
echo json_encode($options);
?>
