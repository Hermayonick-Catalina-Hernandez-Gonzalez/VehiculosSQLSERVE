<?php
include "conexion.php";

$query = "SELECT numero_economico, placa, serie, clase_vehiculo, marca_vehiculo, modelo_vehiculo FROM vehiculos";
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(json_encode(["error" => sqlsrv_errors()]));
}

$vehiculos = [];
while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $vehiculos[] = $row;
}

echo json_encode($vehiculos, JSON_UNESCAPED_UNICODE);
?>
