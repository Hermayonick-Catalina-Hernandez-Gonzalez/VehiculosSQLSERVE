<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../../index.php"); 
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación Vehicular</title>
    <link rel="shortcut icon" href="../../img/Icono.png" />
    <link rel="stylesheet" href="../../css/stylesformulario.css">
    <link rel="stylesheet" href="../../css/stylestabla.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <!-- Menú lateral -->
    <div class="menu">
        <img src="../../img/Logo2.png" alt="Logo FGJ" class="logo">

        <nav>
            <ul>
                <li><a href="../formulario/resguardante.php" class="menu-link">Resguardante</a></li>
                <li><a href="../formulario/unidadVehicular.php" class="menu-link">Datos de la unidad</a></li>
                <li><a href="../formulario/verificacion.php" class="menu-link">Verificación</a></li>
                <li><a href="../formulario/fotografias.php" class="menu-link">Fotografías de la unidad</a></li>
            </ul>
        </nav>
        <button class="btn-salir" onclick="cerrar()">
            <img src="../../img/Salir.png" alt="Salir">Salir
        </button>
        <img src="../../img/Vehiculo.png" alt="Vehículo" class="vehiculo">
    </div>

    <!-- Sección derecha (formulario) -->
    <div class="right-section">
        <h1>Verificacion Vehicular</h1>
        <!-- Menú para las categorías -->
        <div class="tabs">
            <button class="tablink" id="exterior" onclick="openTab(event, 'Exterior')">Exterior</button>
            <button class="tablink" id="interior" onclick="openTab(event, 'Interior')">Interior</button>
            <button class="tablink" id="accesorios" onclick="openTab(event, 'Accesorios')">Accesorios y otros</button>
        </div>

        <!-- Contenido para Exterior, Interior y Accesorios -->
        <div id="Exterior" class="tabcontent">
            <iframe src="../../tablas/exterior.html" width="100%" height="500px" title="Tabla Exterior"></iframe>
        </div>

        <div id="Interior" class="tabcontent">
            <iframe src="../../tablas/interior.html" width="100%" height="500px" title="Tabla Exterior"></iframe>
        </div>

        <div id="Accesorios" class="tabcontent">
            <iframe src="../../tablas/accesorios.html" width="100%" height="500px" title="Tabla Exterior"></iframe>
        </div>

        <button class="btn" type="button" onclick="nextTab()">Siguiente</button>
    </div>
    <script src="../../JS/acciones.js"></script>
    <script src="../../JS/verificacion.js"></script>
</body>

</html>