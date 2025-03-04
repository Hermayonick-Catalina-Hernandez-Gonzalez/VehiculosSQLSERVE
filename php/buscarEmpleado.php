<?php
require '../php/conexion.php'; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if (!isset($_GET['nombre'])) {
    echo json_encode(["error" => "Falta el parámetro 'nombre'"]);
    exit;
}

$nombre = $_GET['nombre'];

// Normalizamos el nombre (convertirlo a minúsculas y quitar acentos)
$nombre = strtolower($nombre);
$nombre = preg_replace('/[áàäâã]/u', 'a', $nombre);
$nombre = preg_replace('/[éèëê]/u', 'e', $nombre);
$nombre = preg_replace('/[íìïî]/u', 'i', $nombre);
$nombre = preg_replace('/[óòöôõ]/u', 'o', $nombre);
$nombre = preg_replace('/[úùüû]/u', 'u', $nombre);
$nombre = preg_replace('/[ñ]/u', 'n', $nombre);

// Consulta con los nombres de columna correctos
$sql = "SELECT nombre, cargo, numero_empleado, celular, 
               fiscalia_general, fiscalia_especializada_en, vicefiscalia_en, 
               direccion_general, departamento_area 
        FROM empleados 
        WHERE LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(nombre, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u'), 'ñ', 'n')) = ?";

$stmt = $conn->prepare($sql);
$stmt->execute([$nombre]);

$empleado = $stmt->fetch(PDO::FETCH_ASSOC);

if ($empleado) {
    echo json_encode($empleado);
} else {
    echo json_encode(["error" => "Empleado no encontrado"]);
}

$conn = null; 
?>
