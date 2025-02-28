$(document).ready(function() {
    $("#formularioResguardante, #formularioVehiculo").submit(function(event) {
        event.preventDefault(); // Evita la recarga de la página

        var formData = $(this).serialize(); // Serializa los datos del formulario

        $.ajax({
            type: "POST",
            url: "../php/insertar_historial.php",
            data: formData,
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    Swal.fire("Éxito", response.message, "success");
                } else {
                    Swal.fire("Error", response.message, "error");
                }
            },
            error: function() {
                Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
            }
        });
    });
});
