<?php
include "conexion.php";

// Verifica si los datos fueron enviados a través del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'];
    $contra = $_POST['contra'];

    $sql = "SELECT id, Correo, Contraseña FROM Usuarios WHERE Correo = ?";
    $params = array($correo);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(["status" => "error", "message" => "Error en la consulta."]);
        exit();
    }

    $usuario = sqlsrv_fetch_object($stmt);

    if (!$usuario) {
        echo json_encode(["status" => "error", "message" => "¡Correo no encontrado!"]);
    } else {
        if ($contra === $usuario->Contraseña) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Contraseña incorrecta."]);
        }
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
}
?>
