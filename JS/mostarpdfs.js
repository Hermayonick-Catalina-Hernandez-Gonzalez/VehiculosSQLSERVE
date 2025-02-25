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

// Inicializar la primera pestaña como activa al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya tiene la clase 'active' al cargar
    const reglasTab = document.getElementById("reglas");
    if (!reglasTab.classList.contains("active")) {
        openTab({ currentTarget: reglasTab }, "Reglas");
    }
});

