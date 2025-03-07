<?php
require '../php/conexion.php';

header('Content-Type: application/json');  
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Si se envían múltiples verificaciones
    if (isset($data['verificaciones']) && is_array($data['verificaciones'])) {
        $conn->beginTransaction(); // Iniciar transacción para evitar datos corruptos
        try {
            $sql = "INSERT INTO verificacion (categoria, elemento, estado) VALUES (:categoria, :elemento, :estado)";
            $stmt = $conn->prepare($sql);
            foreach ($data['verificaciones'] as $verificacion) {
                $stmt->execute([
                    ':categoria' => $verificacion['categoria'], 
                    ':elemento' => $verificacion['elemento'], 
                    ':estado' => $verificacion['estado']
                ]);
            }
            $conn->commit();
            echo json_encode(["mensaje" => "Verificación guardada correctamente"]);
        } catch (Exception $e) {
            $conn->rollBack();
            echo json_encode(["error" => "Error al guardar la verificación: " . $e->getMessage()]);
        }
        exit();
    }

    // Si se guardan observaciones
    if (isset($data['categoria'], $data['observaciones'], $data['verificacion_id'])) {
        $sql = "INSERT INTO Observacionesverificacion (categoria, observaciones, verificacion_id) VALUES (:categoria, :observaciones, :verificacion_id)";
        $stmt = $conn->prepare($sql);

        if ($stmt->execute([
            ':categoria' => $data['categoria'], 
            ':observaciones' => $data['observaciones'], 
            ':verificacion_id' => $data['verificacion_id']
        ])) {
            echo json_encode(["mensaje" => "Observación guardada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al guardar la observación"]);
        }
        exit();
    }

    echo json_encode(["error" => "Datos inválidos"]);
}
