function buscarVehiculo() {
    let numeroEconomico = document.getElementById("numero_economico").value.trim();

    if (numeroEconomico === "") {
        Swal.fire({
            title: "Oops...",
            text: "Por favor, ingrese un número económico.",
            icon: "error",
            backdrop: false
        });
        return;
    }

    fetch(`http://localhost/xampp/VehiculosSQLSERVE/php/buscarVehiculo.php?numero_economico=${numeroEconomico}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    title: "Oops...",
                    text: data.error,
                    icon: "error",
                    backdrop: false
                });
            } else {
                // Asegurarse de que los campos del formulario se actualizan con los datos
                document.getElementById("placa").value = data.placa || "";
                document.getElementById("serie").value = data.serie || "";
                document.getElementById("color").value = data.color || "";
                document.getElementById("clase_vehiculo").value = data.clase_vehiculo || "";
                document.getElementById("marca_vehiculo").value = data.marca_vehiculo || "";
                document.getElementById("submarca").value = data.submarca || "";
                document.getElementById("modelo_vehiculo").value = data.modelo_vehiculo || "";

                // Guardar datos en localStorage
                localStorage.setItem("placa", data.placa || "");
                localStorage.setItem("serie", data.serie || "");
                localStorage.setItem("color", data.color || "");
                localStorage.setItem("clase_vehiculo", data.clase_vehiculo || "");
                localStorage.setItem("marca_vehiculo", data.marca_vehiculo || "");
                localStorage.setItem("submarca", data.submarca || "");
                localStorage.setItem("modelo_vehiculo", data.modelo_vehiculo || "");

                Swal.fire({
                    title: "Good job!",
                    text: "Vehículo encontrado.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
            Swal.fire({
                title: "Oops...",
                text: "Error en la solicitud.",
                icon: "error",
                backdrop: false
            });
        });
}

document.addEventListener("DOMContentLoaded", function () {
    cargarDatosFormulario();

    document.querySelectorAll("input[type='text'], input[type='number'], input[type='date']").forEach(input => {
        input.addEventListener("input", function () {
            localStorage.setItem(input.id, input.value);
        });
    });

    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", function () {
            localStorage.setItem(select.id, select.value);
        });
    });

    document.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", function () {
            localStorage.setItem(radio.name, radio.value);
        });
    });


});

function cargarDatosFormulario() {
    document.querySelectorAll("input[type='text'], input[type='number'], input[type='date']").forEach(input => {
        let valorGuardado = localStorage.getItem(input.id);
        if (valorGuardado) {
            input.value = valorGuardado;
        }
    });

    document.querySelectorAll("select").forEach(select => {
        let valorGuardado = localStorage.getItem(select.id);
        if (valorGuardado) {
            select.value = valorGuardado;
        }
    });

    document.querySelectorAll("input[type='radio']").forEach(radio => {
        let valorGuardado = localStorage.getItem(radio.name);
        if (valorGuardado && radio.value === valorGuardado) {
            radio.checked = true;
        }
    });
}


// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}
