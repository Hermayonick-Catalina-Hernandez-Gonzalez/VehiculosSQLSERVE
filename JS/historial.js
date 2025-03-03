document.getElementById("formularioResguardante").addEventListener("submit", function (event) {
    event.preventDefault(); 
    let formData = new FormData(this);

    fetch("../../php/historial.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            Swal.fire("Éxito", "Resguardo guardado con ID: " + data.historial_id, "success");
        } else {
            Swal.fire("Error", data.message, "error");
        }
    })
    .catch(error => Swal.fire("Error", "No se pudo conectar al servidor", "error"));
});
