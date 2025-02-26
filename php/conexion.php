<?php
$serverName = "DGTIT3327383"; // Nombre del servidor SQL
$database = "prueba_vehiculosFGJ";

try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", null, null, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ));
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
