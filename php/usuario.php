<?php
require '../php/conexion.php'; // Asegúrate de conectar a la BD correctamente

$correo = "prueba@fgj.tam";
$contraseña = "prueba";

// Encriptar la contraseña con BCRYPT
$contraseña_encriptada = password_hash($contraseña, PASSWORD_BCRYPT);

try {
    // Preparar la consulta SQL para insertar el usuario
    $sql = "INSERT INTO usuarios (correo, contra) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$correo, $contraseña_encriptada]);

    echo "Usuario creado con éxito.";
} catch (PDOException $e) {
    echo "Error al crear usuario: " . $e->getMessage();
}

$conn = null; // Cerrar conexión
?>
