<?php
$serverName = "192.168.123.245"; 
$database = "FGJ_VERIFICACION_VEHICULAR"; 
$username = "usuarioCatalina";
$password = "FGJ_2025"; 

try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION 
    ));

} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage(); 
}
?>
