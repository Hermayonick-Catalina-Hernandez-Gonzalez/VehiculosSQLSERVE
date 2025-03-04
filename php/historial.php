<?php
require '../php/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vehiculo_id = $_POST['vehiculo_id'];
    $resguardante_id = $_POST['resguardante_id'];
    $municipio = $_POST['municipio'];
    $kilometraje = $_POST['kilometraje'];
    $tipo_condicion = $_POST['tipo_condicion']; // Recibe el valor del botón seleccionado

    try {
        $sql = "INSERT INTO historial (vehiculo_id, resguardante_id, municipio, kilometraje, tipo_condicion) 
                VALUES (:vehiculo_id, :resguardante_id, :municipio, :kilometraje, :tipo_condicion)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':vehiculo_id', $vehiculo_id);
        $stmt->bindParam(':resguardante_id', $resguardante_id);
        $stmt->bindParam(':municipio', $municipio);
        $stmt->bindParam(':kilometraje', $kilometraje);
        $stmt->bindParam(':tipo_condicion', $tipo_condicion);
        
        if ($stmt->execute()) {
            echo "Registro guardado exitosamente.";
        } else {
            echo "Error al guardar.";
        }
    } catch (PDOException $e) {
        echo "Error en la consulta: " . $e->getMessage();
    }
} else {
    echo "Acceso no permitido.";
}
?>
