<?php
header('Content-Type: application/json');

require "../php/conexion.php";  // Asegúrate de que la ruta sea correcta

// Verificar si se ha recibido el ID del vehículo mediante POST
if (isset($_POST['vehiculo_id']) && !empty($_POST['vehiculo_id'])) {
    $vehiculo_id = $_POST['vehiculo_id'];

    // Verificar que la conexión se haya establecido
    if (!$conn) {
        echo json_encode(['error' => 'No se pudo establecer la conexión a la base de datos.']);
        exit();
    }

    // Consulta SQL para obtener el historial del vehículo, adaptada para SQL Server
    // Usamos STUFF + FOR XML PATH para concatenar registros
    $sql = "
    SELECT 
        v.id AS vehiculo_id,
        v.numero_economico,
        v.placa,
        v.serie,
        v.color,
        v.clase,
        v.marca,
        v.submarca,
        v.modelo,
        v.estado,
        v.kilometraje,
        v.ocupacion,
        r.id AS resguardante_id,
        r.fech AS fecha_resguardo,
        r.municipio,
        r.FGJRM,
        r.numero_empleado,
        r.resguardante,
        r.cargo,
        r.licencia,
        r.vigencia,
        r.fiscalia_general,
        r.fiscalia_especializada_en,
        r.vicefiscalia_en,
        r.direccion_general,
        r.departamento_area,
        r.numero_empleado_interno,
        r.resguardante_interno,
        r.cargo_interno,
        r.licencia_interna,
        r.vigencia_interna,
        r.celular,
        -- Datos de verificación usando STUFF + FOR XML PATH
        (
            SELECT STUFF((
                SELECT ' | ' + CONCAT(vr.categoria, ': ', vr.elemento, ' (', vr.estado, ')')
                FROM verificacion vr
                WHERE vr.vehiculo_id = v.id
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 3, '')
        ) AS verificacion,
        -- Observaciones generales
        (
            SELECT STUFF((
                SELECT ' | ' + CAST(ov.observaciones AS NVARCHAR(MAX))
                FROM Observacionesverificacion ov
                WHERE ov.vehiculo_id = v.id
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 3, '')
        ) AS observaciones,
        -- Información de fotos (nombre + observaciones)
        (
            SELECT STUFF((
                SELECT ' | ' + CONCAT(f.nombre_archivo, '.', f.extension, '||', f.observaciones)
                FROM fotos f
                WHERE f.vehiculo_id = v.id
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 3, '')
        ) AS fotos
    FROM vehiculo v
    LEFT JOIN resguardante r ON v.resguardante_id = r.id
    WHERE v.id = :vehiculo_id
    ";

    try {
        // Preparar la consulta usando la conexión $conn
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':vehiculo_id', $vehiculo_id, PDO::PARAM_INT);
        $stmt->execute();

        // Obtener los resultados
        $historial = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($historial) {
            // Devolver los resultados como JSON
            echo json_encode($historial);
        } else {
            echo json_encode(['error' => 'No se encontró el historial para el vehículo especificado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener el historial: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No se ha recibido el ID del vehículo']);
}
?>
