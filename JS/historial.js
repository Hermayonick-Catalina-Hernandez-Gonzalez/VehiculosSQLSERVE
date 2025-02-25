document.addEventListener("DOMContentLoaded", function () {
    // Obtener matrícula de la URL
    const params = new URLSearchParams(window.location.search);
    const matricula = params.get("matricula");

    if (!matricula) {
        Swal.fire("Oops...", "No se encontró información del vehículo.", "error");
        return;
    }

    // Hacer la petición al servidor
    fetch(`../PHP/historial.php?matricula=${matricula}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire("Oops...", data.error, "error");
                return;
            }

            // Insertar los datos en el HTML
            document.getElementById("num_economico").textContent = data.num_economico;
            document.getElementById("placa").textContent = data.placa;
            document.getElementById("serie").textContent = data.serie;
            document.getElementById("color").textContent = data.color;
            document.getElementById("clase").textContent = data.clase;
            document.getElementById("marca").textContent = data.marca;
            document.getElementById("submarca").textContent = data.submarca;
            document.getElementById("modelo").textContent = data.modelo;
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
            Swal.fire("Oops...", "Error al cargar la información del vehículo.", "error");
        });
});
