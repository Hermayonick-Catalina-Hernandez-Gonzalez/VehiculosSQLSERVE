<?php
include '../php/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $pdo->beginTransaction();

        $sql = "INSERT INTO observaciones_verificacion (vehiculo_id, categoria, observacion, historial_id) 
                VALUES (:vehiculo_id, :categoria, :observacion, :historial_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':vehiculo_id' => $_POST['vehiculo_id'],
            ':categoria' => $_POST['categoria'],
            ':observacion' => $_POST['observacion'],
            ':historial_id' => $_POST['historial_id']
        ]);

        $pdo->commit();
        echo "Observation added!";
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "Error: " . $e->getMessage();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $pdo->beginTransaction();

        $sql = "INSERT INTO verificacion (vehiculo_id, categoria, elemento, estado, historial_id) 
                VALUES (:vehiculo_id, :categoria, :elemento, :estado, :historial_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':vehiculo_id' => $_POST['vehiculo_id'],
            ':categoria' => $_POST['categoria'],
            ':elemento' => $_POST['elemento'],
            ':estado' => $_POST['estado'],
            ':historial_id' => $_POST['historial_id']
        ]);

        $pdo->commit();
        echo "Verification record added!";
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "Error: " . $e->getMessage();
    }
}
?>
