<?php
include '../php/conexion.php';  // Asegúrate de incluir tu conexión a la base de datos

// Función para obtener los datos del empleado a partir de su nombre
function obtenerDatosEmpleado($nombre, $conn) {
    // Consulta para obtener los datos del empleado
    $sql = "SELECT numero_empleado, cargo, celular, fiscalia_general, fiscalia_especializada_en, vicefiscalia_en, direccion_general, departamento_area 
            FROM empleados 
            WHERE nombre = :nombre";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->execute();
    
    return $stmt->fetch(PDO::FETCH_ASSOC);  // Retorna los datos del empleado
}

// Verificar si se enviaron los datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Recoger los datos del formulario
    $fecha = $_POST['fecha'];
    $municipio = $_POST['municipio'];
    $FGJRM = $_POST['FGJRM'];
    $resguardante = $_POST['resguardante'];  // Nombre del resguardante
    $licencia = $_POST['licencia'];
    $vigencia = $_POST['vigencia'];
    $resguardante_interno = $_POST['resguardante_interno'];  // Nombre del resguardante interno
    $licencia_interna = $_POST['licencia_interna'];
    $vigencia_interna = $_POST['vigencia_interna'];
    $numero_empleado = $_POST['numero_empleado'];
    $celular = $_POST['celular'];

    // Obtener datos del resguardante de la tabla empleados
    $empleado_resguardante = obtenerDatosEmpleado($resguardante, $conn);
    $empleado_resguardante_interno = obtenerDatosEmpleado($resguardante_interno, $conn);

    // Si el empleado resguardante no se encuentra, manejar el error
    if (!$empleado_resguardante) {
        echo "No se encontró al resguardante.";
        exit();
    }

    // Si el empleado resguardante interno no se encuentra, manejar el error
    if (!$empleado_resguardante_interno) {
        echo "No se encontró al resguardante interno.";
        exit();
    }

    // Asignar valores a las variables (si están disponibles)
    $resguardante_empleado_id = $empleado_resguardante['numero_empleado'];
    $cargo = $empleado_resguardante['cargo'];
    $fiscalia_general = $empleado_resguardante['fiscalia_general'];
    $fiscalia_especializada_en = $empleado_resguardante['fiscalia_especializada_en'];
    $vicefiscalia_en = $empleado_resguardante['vicefiscalia_en'];
    $direccion_general = $empleado_resguardante['direccion_general'];
    $departamento_area = $empleado_resguardante['departamento_area'];
    
    // Datos del resguardante interno
    $resguardante_interno_empleado_id = $empleado_resguardante_interno['numero_empleado'];
    $cargo_interno = $empleado_resguardante_interno['cargo'];
    $celular_interno = $empleado_resguardante_interno['celular'];

    // Preparar la consulta SQL para insertar los datos en la tabla de resguardante
    $sql = "INSERT INTO resguardante(fecha, municipio, FGJRM, resguardante_empleado_id, cargo, licencia, vigencia, fiscalia_general, fiscalia_especializada_en, vicefiscalia_en, direccion_general, departamento_area, resguardante_interno_empleado_id, cargo_interno, licencia_interna, vigencia_interna, numero_empleado, celular) 
            VALUES (:fecha, :municipio, :FGJRM, :resguardante_empleado_id, :cargo, :licencia, :vigencia, :fiscalia_general, :fiscalia_especializada_en, :vicefiscalia_en, :direccion_general, :departamento_area, :resguardante_interno_empleado_id, :cargo_interno, :licencia_interna, :vigencia_interna, :numero_empleado, :celular)";

    // Preparar la sentencia
    $stmt = $conn->prepare($sql);

    // Enlazar los parámetros
    $stmt->bindParam(':fecha', $fecha);
    $stmt->bindParam(':municipio', $municipio);
    $stmt->bindParam(':FGJRM', $FGJRM);
    $stmt->bindParam(':resguardante_empleado_id', $resguardante_empleado_id);
    $stmt->bindParam(':cargo', $cargo);
    $stmt->bindParam(':licencia', $licencia);
    $stmt->bindParam(':vigencia', $vigencia);
    $stmt->bindParam(':fiscalia_general', $fiscalia_general);
    $stmt->bindParam(':fiscalia_especializada_en', $fiscalia_especializada_en);
    $stmt->bindParam(':vicefiscalia_en', $vicefiscalia_en);
    $stmt->bindParam(':direccion_general', $direccion_general);
    $stmt->bindParam(':departamento_area', $departamento_area);
    $stmt->bindParam(':resguardante_interno_empleado_id', $resguardante_interno_empleado_id);
    $stmt->bindParam(':cargo_interno', $cargo_interno);
    $stmt->bindParam(':licencia_interna', $licencia_interna);
    $stmt->bindParam(':vigencia_interna', $vigencia_interna);
    $stmt->bindParam(':numero_empleado', $numero_empleado);
    $stmt->bindParam(':celular', $celular);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Si la inserción fue exitosa, redirigir a la siguiente página del formulario
        header('Location: ../../vistas/formulario/unidadVehicular.html'); // Redirigir a la página de unidad vehicular
        exit();
    } else {
        echo "Error al guardar los datos.";
    }
}
?>
