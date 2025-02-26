<?php
include "../php/conexion.php";

// Obtener el número económico desde la URL
$numeroEconomico = isset($_GET['numeroEconomico']) ? $_GET['numeroEconomico'] : null;

if ($numeroEconomico) {
    try {
        // Realizar la consulta para obtener los datos del vehículo con el número económico
        $query = "SELECT * FROM vehiculos WHERE numero_economico = :numero_economico";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':numero_economico', $numeroEconomico);
        $stmt->execute();

        // Obtener los datos del vehículo
        $vehiculo = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($vehiculo) {
            // Devolver los datos en formato JSON
            echo json_encode($vehiculo);
        } else {
            // Si no se encuentra el vehículo, devolvemos un valor nulo
            echo json_encode(null);
        }
    } catch (PDOException $e) {
        // En caso de error, devolvemos el mensaje de error en formato JSON
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }
} else {
    // Si no se pasa un número económico, devolvemos un valor nulo
    echo json_encode(null);
}
?>
