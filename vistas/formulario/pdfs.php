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
    <title>Verificacion de datos</title>
    <link rel="shortcut icon" href="../../img/Icono.png" />
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="../../css/stylesformulario.css">
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

    <!-- Sección principal -->
    <div class="right-section">
        <h1>Verificacion de Datos</h1>
        <button onclick="generarPDF()" class="btn">Ver PDF</button>
        <form id="Pdf">
            <div class="tabs">
                <button class="tablink" id="reglas"
                    onclick="openTab(event, 'Reglas')">Reglas</button>
                <button class="tablink" id="resguardo"
                    onclick="openTab(event, 'Resguardo')">Resguardo</button>
            </div>

            <!-- Contenido  -->
            <div id="Reglas" class="tabcontent">
                <iframe id="preview1" width="100%" height="400px"></iframe>
            </div>

            <div id="Resguardo" class="tabcontent">
                <iframe id="preview2" width="100%" height="400px"></iframe>
            </div>

        </form>
        <button onclick="abrirFirma(); finalizarFormulario();"
            class="btn">Aceptar</button>
    </div>

    <!-- Modal de Firma Digital -->
    <div id="modalFirma" class="modal">
        <div class="modal-content">
            <h2>Firma Digital Resguardante Interno</h2>
            <canvas id="canvasFirma" width="400" height="200"></canvas>
            <br>
            <button onclick="limpiarFirma()"
                class="btn-foto">Limpiar</button>
            <button onclick="cerrarFirma()"
                class="btn-close">Cerrar</button>
            <button onclick="guardarFirma()" class="btn">Guardar
                Firma</button>
        </div>
    </div>

    <script src="../../JS/PDF.js"></script>
    <script src="../../JS/PDFsFirma.js"></script>
    <script src="../../JS/extras.js"></script>
    <script src="../../JS/resguardante.js"></script>
    <script src="../../JS/unidadVehicular.js"></script>
    <script src="../../JS/fotografias.js"></script>
    <script src="../../JS/verificacion.js"></script>
    <script src="../../JS/acciones.js"></script>
</body>
</html>