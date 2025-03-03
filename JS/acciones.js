document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".menu-link");
    let currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual

    links.forEach(link => {
        if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
        }
    });
});

function salir() {
    window.location.href = "../php/logout.php";  
}

function cerrar() {
    window.location.href = "../../php/logout.php";  
}
function ver(numeroEconomico) {
    localStorage.setItem('numeroEconomico', numeroEconomico);
    window.location.href = "../vistas/historial.php";
}

// Recuperar el número económico desde localStorage
let numeroEconomico = localStorage.getItem('numeroEconomico');
    
if (numeroEconomico) {
    // Realizamos una solicitud AJAX al archivo PHP que obtiene los detalles del vehículo
    fetch('../php/obtenerVehiculo.php?numeroEconomico=' + numeroEconomico)
        .then(response => response.json())
        .then(data => {
            // Aquí podemos manejar los datos del vehículo y mostrarlos en la página
            if (data) {
                document.getElementById('numeroEconomico').textContent = data.numero_economico;
                document.getElementById('placa').textContent = data.placa;
                document.getElementById('serie').textContent = data.serie;
                document.getElementById('color').textContent = data.color;
                document.getElementById('clase').textContent = data.clase_vehiculo;
                document.getElementById('marca').textContent = data.marca_vehiculo;
                document.getElementById('submarca').textContent = data.submarca;
                document.getElementById('modelo').textContent = data.modelo_vehiculo;
            }
        })
        .catch(error => console.error('Error al obtener los datos del vehículo:', error));
}


function regresar() {
    window.location.href = "../vistas/inicio.php";
}

function iniciar() {
    window.location.href = "../vistas/inicio.php";
}

function editar() {
    window.location.href = "http://localhost/xampp/VehiculosSQLSERVE/vistas/formulario/resguardante.php";
}

function siguiente() {
    window.location.href = "../../vistas/formulario/verificacion.php";
}

document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".menu-link");
    let currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual

    links.forEach(link => {
        if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
        }
    });
});

function buscar() {
    const searchText = normalizarTexto(document.getElementById('search').value.toLowerCase());
    const rows = document.querySelectorAll('#vehiculos tr');
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let match = false;
        for (let i = 0; i < cells.length; i++) {
            if (normalizarTexto(cells[i].textContent.toLowerCase()).includes(searchText)) {
                match = true;
                break;
            }
        }
        row.style.display = match ? '' : 'none';
    });
}

// Función para normalizar texto (eliminar acentos y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function mostrarSelectVehiculo() {
    let tipoOcupacion = document.getElementById("tipo_ocupacion").value;
    let selectOperativo = document.getElementById("select_operativo");
    let selectAdministrativo = document.getElementById("select_administrativo");

    // Oculta ambos select
    selectOperativo.style.display = "none";
    selectAdministrativo.style.display = "none";

    // Muestra el select correspondiente
    if (tipoOcupacion === "operativo") {
        selectOperativo.style.display = "block";
    } else if (tipoOcupacion === "administrativo") {
        selectAdministrativo.style.display = "block";
    }
}

function togglePassword() {
    const passwordField = document.getElementById('contra');
    const toggleIcon = document.getElementById('toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.src = 'img/cerrar-ojo.png'; // Cambia a la imagen de ojo cerrado
        toggleIcon.alt = 'Ocultar contraseña';
    } else {
        passwordField.type = 'password';
        toggleIcon.src = 'img/ojo.png'; // Cambia a la imagen de ojo abierto
        toggleIcon.alt = 'Mostrar contraseña';
    }
}

function buscarHistorial() {
    const searchText = normalizarTexto(document.getElementById('search').value.toLowerCase());
    const historyCards = document.querySelectorAll('#history-section .history-card');

    historyCards.forEach(card => {
        const fecha = normalizarTexto(card.querySelector('p:nth-child(1)').textContent.toLowerCase());
        const municipio = normalizarTexto(card.querySelector('p:nth-child(2)').textContent.toLowerCase());
        const resguardante = normalizarTexto(card.querySelector('p:nth-child(3)').textContent.toLowerCase());
        const resguardanteInterno = normalizarTexto(card.querySelector('p:nth-child(4)').textContent.toLowerCase());
        const observaciones= normalizarTexto(card.querySelector('p:nth-child(5)').textContent.toLowerCase());

        // Verifica si alguno de los campos normalizados coincide con el texto de búsqueda
        if (
            fecha.includes(searchText) ||
            municipio.includes(searchText) ||
            resguardante.includes(searchText) ||
            resguardanteInterno.includes(searchText) ||
            observaciones.includes(searchText)
        ) {
            card.style.display = '';  // Mostrar el div
        } else {
            card.style.display = 'none';  // Ocultar el div
        }
    });
}

function final() {
    // Mostrar el mensaje de éxito antes de redirigir
    Swal.fire({
        icon: 'success',
        title: '¡Se ha Guardado Exitosamente!',
        timer: 1500,
        showConfirmButton: false,
        backdrop: false
    }).then(() => {
        // Redirige a la página de PDFs después de generar el PDF
        window.location.href = '../../vistas/formulario/pdfs.php';  // Ajusta esta ruta según sea necesario
    });
}

