document.getElementById('Verificacion').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene que la página se recargue
});

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    const tablinks = document.getElementsByClassName("tablink");

    // Ocultar todas las pestañas
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Eliminar la clase 'active' de todos los botones de pestañas
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual y agregar una clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
    // Se asegura de que la pestaña 'Reglas' esté activa y se muestre automáticamente
    const reglasTab = document.getElementById("reglas");
    openTab({ currentTarget: reglasTab }, "Reglas");

    // Mostrar el iframe vacío al inicio
    const iframe1 = document.getElementById("preview1");
    iframe1.src = "";  // Dejarlo vacío o configurar una fuente si lo necesitas
});


// Funciones para la firma
function abrirFirma() {
    document.getElementById("modalFirma").style.display = "flex";
}

function cerrarFirma() {
    document.getElementById("modalFirma").style.display = "none";
}

// Funciones para capturar la firma en canvas
let esTactil = "ontouchstart" in window || navigator.maxTouchPoints > 0;

let canvas = document.getElementById("canvasFirma");
let ctx = canvas.getContext("2d");
let pintando = false;

// Eventos para mouse
canvas.addEventListener("mousedown", iniciarDibujo);
canvas.addEventListener("mouseup", detenerDibujo);
canvas.addEventListener("mousemove", dibujar);

// Eventos para dispositivos táctiles
canvas.addEventListener("touchstart", iniciarDibujo);
canvas.addEventListener("touchend", detenerDibujo);
canvas.addEventListener("touchmove", dibujar);

function obtenerCoordenadas(event) {
    let rect = canvas.getBoundingClientRect();
    if (event.touches) {
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
    } else {
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}

function iniciarDibujo(event) {
    event.preventDefault();
    pintando = true;
    let coord = obtenerCoordenadas(event);
    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);
}

function detenerDibujo(event) {
    event.preventDefault();
    pintando = false;
    ctx.beginPath();
}

function dibujar(event) {
    if (!pintando) return;
    event.preventDefault();
    let coord = obtenerCoordenadas(event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}

function limpiarFirma() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarFirma() {
    let canvas = document.getElementById("canvasFirma");
    let imagenFirma = canvas.toDataURL("image/png"); // Convertir firma a imagen

    Swal.fire({
        icon: "success",
        title: "Datos Guardados",
        text: "Los datos han sido registrados correctamente.",
    });

    cerrarFirma();
    descargarPDFConFirma(imagenFirma);
}
