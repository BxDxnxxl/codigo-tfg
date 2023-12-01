<?php 
require 'conexion.php';

$sql = "SELECT idDocumento, tipo_documento FROM documentos";
$stmt = $conn->prepare($sql);
$stmt->execute();

$options = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $idDocumento = $row['idDocumento'];
    $tipoDocumento = $row['tipo_documento'];
    $options[] = array('id' => $idDocumento, 'nombre' => $tipoDocumento);
}

header('Content-Type: application/json');
echo json_encode($options);
?>
