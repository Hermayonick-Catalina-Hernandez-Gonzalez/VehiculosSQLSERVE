<?php
require '../php/conexion.php'; // Asegúrate de que la conexión esté bien configurada para SQL Server

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if (!isset($_GET['nombre'])) {
    echo json_encode(["error" => "Falta el parámetro 'nombre'"]);
    exit;
}

$nombre = $_GET['nombre'];

try {
    // Consulta con los nombres de columna correctos
    $sql = "SELECT nombre, cargo, numero_empleado, celular, 
                   fiscalia_general, fiscalia_especializada_en, vicefiscalia_en, 
                   direccion_general, departamento_area 
            FROM empleados 
            WHERE nombre = ?";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre]);
    
    $empleado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($empleado) {
        echo json_encode($empleado);
    } else {
        echo json_encode(["error" => "Empleado no encontrado"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}

$conn = null; // Cerrar conexión
?>
