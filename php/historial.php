<?php
// Incluir la conexión a la base de datos
require('../php/conexion.php');

// Obtener los datos del formulario
$fecha = $_POST['fecha'];
$municipio = $_POST['municipio'];
$FGJRM = $_POST['FGJRM'];
$resguardante = $_POST['resguardante'];
$licencia = $_POST['licencia'];
$vigencia = $_POST['vigencia'];
$resguardanteInterno = $_POST['resguardanteInterno'];
$licenciaInterna = $_POST['licenciaInterna'];
$vigenciaInterna = $_POST['vigenciaInterna'];
$vehiculoId = $_POST['vehiculoId'];
$tipoCondicion = $_POST['tipoCondicion'];
$kilometraje = $_POST['kilometraje'];

// Consulta para insertar en la tabla historial
$query = "INSERT INTO historial (vehiculo_id, resguardante_id, resguardante_interno_id, fecha_registro, municipio, FGJRM, licencia_resguardante, vigencia_licencia_resguardante, licencia_resguardante_interno, vigencia_licencia_resguardante_interno, tipo_condicion, kilometraje)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Preparar la consulta
$stmt = $conn->prepare($sql);
// Ejecutar la consulta
if ($stmt->execute()) {
    echo 'Historial guardado correctamente';
} else {
    echo 'Error al guardar historial';
}


?>
