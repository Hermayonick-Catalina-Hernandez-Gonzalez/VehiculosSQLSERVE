document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el campo de entrada de tipo 'date' por su ID
    var fechaInput = document.getElementById('fecha');
    // Obtiene la fecha actual
    var today = new Date();
    // Formatea la fecha en el formato 'YYYY-MM-DD' que acepta el campo de tipo 'date'
    var formattedDate = today.toISOString().split('T')[0];
    // Asigna la fecha actual al campo de fecha
    fechaInput.value = formattedDate;
});


function siguiente() {
    window.location.href = "../../vistas/formulario/unidadVehicular.html";
}
