<?php
include 'conexion.php'; // Your PDO connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $pdo->beginTransaction(); // Start transaction

        // Insert into historial
        $sql = "INSERT INTO historial (vehiculo_id, resguardante_id, resguardante_interno_id, fecha, municipio, FGJRM, licencia, vigencia, licencia_interna, vigencia_interna, tipo_condicion, km)
                VALUES (:vehiculo_id, :resguardante_id, :resguardante_interno_id, GETDATE(), :municipio, :FGJRM, :licencia, :vigencia, :licencia_interna, :vigencia_interna, :tipo_condicion, :km)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':vehiculo_id' => $_POST['vehiculo_id'],
            ':resguardante_id' => $_POST['resguardante_id'],
            ':resguardante_interno_id' => $_POST['resguardante_interno_id'],
            ':fecha' => date("Y-m-d "),
            ':municipio' => $_POST['municipio'],
            ':FGJRM' => $_POST['FGJRM'],
            ':licencia' => $_POST['licencia'],
            ':vigencia' => $_POST['vigencia'],
            ':licencia_interna' => $_POST['licencia_interna'],
            ':vigencia_interna' => $_POST['vigencia_interna'],
            ':tipo_condicion' => $_POST['tipo_condicion'],
            ':km' => $_POST['km']
        ]);

        $historial_id = $pdo->lastInsertId(); // Get inserted historial ID

        // Commit transaction
        $pdo->commit();
        echo "Historial inserted successfully, ID: " . $historial_id;
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "Error: " . $e->getMessage();
    }
}
?>
