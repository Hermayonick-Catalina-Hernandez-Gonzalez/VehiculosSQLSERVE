<?php
include '../php/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["foto"])) {
    try {
        $pdo->beginTransaction();

        $foto = file_get_contents($_FILES["foto"]["tmp_name"]);
        $sql = "INSERT INTO fotos (vehiculo_id, nombre_foto, foto, observacion, historial_id) 
                VALUES (:vehiculo_id, :nombre_foto, :foto, :observacion, :historial_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':vehiculo_id' => $_POST['vehiculo_id'],
            ':nombre_foto' => $_FILES["foto"]["name"],
            ':foto' => $foto,
            ':observacion' => $_POST['observacion'],
            ':historial_id' => $_POST['historial_id']
        ]);

        $pdo->commit();
        echo "Photo uploaded successfully!";
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "Error: " . $e->getMessage();
    }
}
?>
