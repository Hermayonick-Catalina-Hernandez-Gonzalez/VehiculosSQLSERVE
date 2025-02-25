function salir() {
    window.location.href = "../vistas/index.html";
}

function ver() {
    window.location.href = "../vistas/historial.html";
}

function regresar() {
    window.location.href = "../vistas/inicio.html";
}

function iniciar() {
    window.location.href = "../vistas/inicio.html";
}

function editar() {
    window.location.href = "../../vistas/formulario/resguardante.html";
}

function siguiente() {
    window.location.href = "../../vistas/formulario/verificacion.html";
}



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
    const tipoOcupacion = document.getElementById('tipo_ocupacion').value;
    const selectOperativo = document.getElementById('select_operativo');
    const selectAdministrativo = document.getElementById('select_administrativo');

    if (tipoOcupacion === 'operativo') {
        selectOperativo.style.display = 'block';
        selectAdministrativo.style.display = 'none';
    } else if (tipoOcupacion === 'administrativo') {
        selectOperativo.style.display = 'none';
        selectAdministrativo.style.display = 'block';
    } else {
        selectOperativo.style.display = 'none';
        selectAdministrativo.style.display = 'none';
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

