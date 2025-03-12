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
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            if (data.error) {
                Swal.fire({
                    title: "Oops...",
                    text: data.error,
                    icon: "error",
                    backdrop: false
                });
            } else {
                // Llenar los campos del formulario con los datos obtenidos
                document.getElementById("placa").value = data.PLACAS || "";
                document.getElementById("serie").value = data.SERIE || "";
                document.getElementById("color").value = data.COLOR || "";
                document.getElementById("clase_vehiculo").value = data.CLASEVEHICULO || "";
                document.getElementById("marca_vehiculo").value = data.MARCA || "";
                document.getElementById("submarca").value = data.SUBMARCA || "";
                document.getElementById("modelo_vehiculo").value = data.MODELO || "";

                localStorage.setItem("placa", data.PLACAS || "");
                localStorage.setItem("serie", data.SERIE || "");
                localStorage.setItem("color", data.COLOR || "");
                localStorage.setItem("clase_vehiculo", data.CLASEVEHICULO || "");
                localStorage.setItem("marca_vehiculo", data.MARCA || "");
                localStorage.setItem("submarca", data.SUBMARCA || "");
                localStorage.setItem("modelo_vehiculo", data.MODELO || "");

                Swal.fire({
                    title: "Vehículo encontrado",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    backdrop: false
                });
            }
        })
        .catch(error => {
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


document.addEventListener("DOMContentLoaded", function () {
    recuperarSeleccion();
});

function guardarSeleccion() {
    let tipoOcupacion = document.getElementById("tipo_ocupacion").value;
    let tipoVehiculoOperativo = document.getElementById("tipo_vehiculo_operativo")?.value;
    let tipoVehiculoAdministrativo = document.getElementById("tipo_vehiculo_administrativo")?.value;

    localStorage.setItem("tipo_ocupacion", tipoOcupacion);

    if (tipoOcupacion === "operativo") {
        localStorage.setItem("tipo_vehiculo", tipoVehiculoOperativo);
    } else if (tipoOcupacion === "administrativo") {
        localStorage.setItem("tipo_vehiculo", tipoVehiculoAdministrativo);
    }
}

function recuperarSeleccion() {
    let tipoOcupacion = localStorage.getItem("tipo_ocupacion");
    let tipoVehiculo = localStorage.getItem("tipo_vehiculo");

    if (tipoOcupacion) {
        let selectOcupacion = document.getElementById("tipo_ocupacion");
        if (selectOcupacion) {
            selectOcupacion.value = tipoOcupacion;
        }

        setTimeout(() => {
            if (tipoOcupacion === "operativo" && tipoVehiculo) {
                let selectOperativo = document.getElementById("tipo_vehiculo_operativo");

                if (selectOperativo) selectOperativo.value = tipoVehiculo;
            } else if (tipoOcupacion === "administrativo" && tipoVehiculo) {
                let selectAdministrativo = document.getElementById("tipo_vehiculo_administrativo");
                if (selectAdministrativo) selectAdministrativo.value = tipoVehiculo;
            }
        }, 100);
    }
}


// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}

function guardarVehiculo() {
    let formData = new FormData(document.getElementById("formularioVehiculo"));

    // Obtener el ID del resguardante desde sessionStorage o localStorage
    let resguardanteId = localStorage.getItem("resguardante_id");

    if (!resguardanteId) {
        Swal.fire({
            title: "Error",
            text: "No se encontró el ID del resguardante. Por favor, verifica la información.",
            icon: "error"
        });
        return;
    }


    formData.append("resguardante_id", resguardanteId);

    fetch("http://localhost/xampp/VehiculosSQLSERVE/php/guardar_vehiculo.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("vehiculo_id", data.vehiculo_id);
                window.location.href = "../formulario/verificacion.php";
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Oops...",
                text: "Hubo un problema con la solicitud",
                icon: "error"
            });
        });
}