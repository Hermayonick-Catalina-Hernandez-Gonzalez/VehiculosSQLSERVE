function salir() {
    window.location.href = "../vistas/index.php";
}

function ver(numeroEconomico) {
    window.location.href = "../vistas/historial.php?numero_economico=" + encodeURIComponent(numeroEconomico);
}

function regresar() {
    window.location.href = "../vistas/inicio.php";
}

function iniciar() {
    window.location.href = "../vistas/inicio.php";
}

function editar() {
    window.location.href = "http://localhost/xampp/VehiculosSQLSERVE/vistas/formulario/resguardante.html";
}

function siguiente() {
    window.location.href = "../../vistas/formulario/verificacion.html";
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
    const searchText = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#vehiculos tr');
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let match = false;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.toLowerCase().includes(searchText)) {
                match = true;
                break;
            }
        }
        row.style.display = match ? '' : 'none';
    });
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
        toggleIcon.src = '../img/cerrar-ojo.png'; // Cambia a la imagen de ojo cerrado
        toggleIcon.alt = 'Ocultar contraseña';
    } else {
        passwordField.type = 'password';
        toggleIcon.src = '../img/ojo.png'; // Cambia a la imagen de ojo abierto
        toggleIcon.alt = 'Mostrar contraseña';
    }
}

function buscarHistorial() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const historyCards = document.querySelectorAll('#history-section .history-card');

    historyCards.forEach(card => {
        const fecha = card.querySelector('p:nth-child(1)').textContent.toLowerCase();
        const municipio = card.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const resguardante = card.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const resguardanteInterno = card.querySelector('p:nth-child(4)').textContent.toLowerCase();
        const numEmpleado = card.querySelector('p:nth-child(5)').textContent.toLowerCase();

        // Verifica si alguno de los campos coincide con el texto de búsqueda
        if (
            fecha.includes(searchText) ||
            municipio.includes(searchText) ||
            resguardante.includes(searchText) ||
            resguardanteInterno.includes(searchText) ||
            numEmpleado.includes(searchText)
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
        window.location.href = '../../vistas/formulario/pdfs.html';  // Ajusta esta ruta según sea necesario
    });
}