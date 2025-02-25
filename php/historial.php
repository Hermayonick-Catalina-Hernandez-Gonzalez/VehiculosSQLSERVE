<?php
include "conexion.php";

// Obtener matrícula de la URL
$matricula = $_GET["matricula"] ?? '';

if (empty($matricula)) {
    die(json_encode(["error" => "No se proporcionó una matrícula."]));
}

// Consulta SQL
$sql = "SELECT N_Control AS num_economico, Matricula AS placa, Modelo, '32545' AS serie, 'Blanco' AS color, 'Patrulla' AS clase, 'RAM' AS marca, 'RAM' AS submarca FROM Vehiculos WHERE Matricula = ?";
$params = array($matricula);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(["error" => "Error en la consulta."]));
}

$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if ($row) {
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Vehículo no encontrado."]);
}

sqlsrv_close($conn);
?>
