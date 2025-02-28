<?php
session_start();
include '../php/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Capturar datos del formulario
        $vehiculo_id = $_POST['numero_economico'];
        $resguardante_id = $_POST['numero_empleado'];
        $resguardante_interno_id = $_POST['resguardante_interno'];
        $fecha = date('Y-m-d H:i:s'); // Fecha actual del sistema
        $municipio = $_POST['municipio'];
        $FGJRM = $_POST['FGJRM'];
        $licencia = $_POST['licencia'];
        $vigencia = $_POST['vigencia'];
        $licencia_interna = $_POST['licencia_interna'];
        $vigencia_interna = $_POST['vigencia_interna'];
        $tipo_condicion = $_POST['condicion']; // Propio, Arrendado, Decomisado
        $km = $_POST['km'];

        // Insertar datos en la tabla historial
        $sql = "INSERT INTO historial (vehiculo_id, resguardante_id, resguardante_interno_id, fecha, municipio, FGJRM, licencia, vigencia, licencia_interna, vigencia_interna, tipo_condicion, km) 
                VALUES (:vehiculo_id, :resguardante_id, :resguardante_interno_id, :fecha, :municipio, :FGJRM, :licencia, :vigencia, :licencia_interna, :vigencia_interna, :tipo_condicion, :km)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':vehiculo_id', $vehiculo_id);
        $stmt->bindParam(':resguardante_id', $resguardante_id);
        $stmt->bindParam(':resguardante_interno_id', $resguardante_interno_id);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->bindParam(':municipio', $municipio);
        $stmt->bindParam(':FGJRM', $FGJRM);
        $stmt->bindParam(':licencia', $licencia);
        $stmt->bindParam(':vigencia', $vigencia);
        $stmt->bindParam(':licencia_interna', $licencia_interna);
        $stmt->bindParam(':vigencia_interna', $vigencia_interna);
        $stmt->bindParam(':tipo_condicion', $tipo_condicion);
        $stmt->bindParam(':km', $km);

        $stmt->execute();

        echo json_encode(["success" => true, "message" => "Registro insertado correctamente en historial"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
}
