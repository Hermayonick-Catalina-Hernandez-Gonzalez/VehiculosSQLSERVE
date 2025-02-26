<?php
include '../php/conexion.php'; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 

// Obtener el número económico desde la URL
if (isset($_GET["numero_economico"])) {
    $numero_economico = $_GET["numero_economico"];

    try {
        // Consulta con prepared statement para evitar inyección SQL
        $stmt = $conn->prepare("SELECT * FROM vehiculos WHERE numero_economico = ?");
        $stmt->execute([$numero_economico]);

        $vehiculo = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($vehiculo) {
            echo json_encode($vehiculo); // Enviar datos en formato JSON
        } else {
            echo json_encode(["error" => "Vehículo no encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Número económico no proporcionado"]);
}

$conn = null; // Cerrar la conexión
?>
