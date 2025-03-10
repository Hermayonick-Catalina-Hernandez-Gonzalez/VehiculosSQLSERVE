<?php
session_start();
include '../php/conexion.php'; // Asegúrate de incluir tu conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $imagenes = $_FILES['imagenes']; 
    $observaciones = $_POST['observaciones']; // Recogemos las observaciones

    if (!empty($imagenes)) {
        try {
            $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password, array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_UTF8 
            ));

            $uploadDir = "../vehiculos/";

            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            foreach ($imagenes['name'] as $key => $name) {
                $tmpName = $imagenes['tmp_name'][$key];
                $extension = pathinfo($name, PATHINFO_EXTENSION);
                $nombreArchivo = 'vehiculo_' . time() . '_' . $key . '.' . $extension;
                $rutaFinal = $uploadDir . $nombreArchivo;

                if (move_uploaded_file($tmpName, $rutaFinal)) {
                    // Guardar la imagen y la observación en la base de datos
                    $stmt = $conn->prepare("INSERT INTO fotos (nombre, nombre_archivo, extension, tamaño, observaciones) VALUES (?, ?, ?, ?, ?)");
                    $nombre = "Imagen_" . time();  // Un nombre dinámico
                    $tamaño = filesize($rutaFinal);  // Tamaño del archivo

                    // Asigna la observación correspondiente
                    $observacion = isset($observaciones[$key]) ? $observaciones[$key] : '';

                    $stmt->bindParam(1, $nombre);
                    $stmt->bindParam(2, $nombreArchivo);
                    $stmt->bindParam(3, $extension);
                    $stmt->bindParam(4, $tamaño);
                    $stmt->bindParam(5, $observacion);

                    if ($stmt->execute()) {
                        echo "Imágenes y observaciones guardadas exitosamente.";
                    } else {
                        echo "Error al guardar la imagen o la observación.";
                    }
                } else {
                    echo "Error al subir el archivo.";
                }
            }
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
    } else {
        echo "No se recibieron imágenes.";
    }
} else {
    echo "Método de solicitud no permitido.";
}
?>
