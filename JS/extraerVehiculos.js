document.addEventListener("DOMContentLoaded", function () {
    cargarVehiculos();
});

function cargarVehiculos() {
    fetch("../PHP/vehiculos.php")
        .then(response => response.json())
        .then(data => {
            let tbody = document.getElementById("vehiculos");
            tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

            data.forEach(vehiculo => {
                let row = `
                    <tr>
                        <td>${vehiculo.numero_economico}</td>
                        <td>${vehiculo.placa}</td>
                        <td>${vehiculo.serie}</td>
                        <td>${vehiculo.clase_vehiculo}</td>
                        <td>${vehiculo.marca_vehiculo}</td>
                        <td>${vehiculo.modelo_vehiculo}</td>
                        <td>
                            <button onclick="editar(${vehiculo.numero_economico})">
                                <i class="fa fa-pencil"></i> Editar
                            </button>
                            <button onclick="ver(${vehiculo.numero_economico})">
                                <i class="fa fa-eye"></i> Ver
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error al cargar vehículos:", error));
}

function editar(numeroEconomico) {
    alert("Editar vehículo: " + numeroEconomico);
    // Aquí puedes redirigir a otra página o abrir un formulario modal
}

function ver(numeroEconomico) {
    alert("Ver detalles del vehículo: " + numeroEconomico);
    // Aquí puedes redirigir a otra página o abrir un modal con información
}
