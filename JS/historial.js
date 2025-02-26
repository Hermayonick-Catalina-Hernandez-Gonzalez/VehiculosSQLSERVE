function guardarHistorial() {
    const datos = {
        fecha: document.getElementById("fecha").value,
        municipio: document.getElementById("municipio").value,
        FGJRM: document.getElementById("FGJRM").value,
        resguardante_id: document.getElementById("resguardante").value,
        licencia: document.getElementById("licencia").value,
        vigencia: document.getElementById("vigencia").value,
        resguardante_interno: document.getElementById("resguardante_interno").value,
        licencia_interna: document.getElementById("licencia_interna").value,
        vigencia_interna: document.getElementById("vigencia_interna").value,
        numero_economico: document.getElementById("numero_economico").value,
        tipo: document.querySelector('input[name="condicion"]:checked').value, // Para radio buttons
        km: document.getElementById("km").value
    };

    fetch("../php/guardar_historial.html", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(datos).toString()
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire("Éxito", data.success, "success");
        } else {
            Swal.fire("Error", data.error, "error");
        }
    })
    .catch(error => console.error("Error:", error));
}
