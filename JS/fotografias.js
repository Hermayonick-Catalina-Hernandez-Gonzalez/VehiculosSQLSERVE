let videoStream;
let imagenDestino;
let contadorExtra = 1;

function abrirCamara(idImagen) {
    imagenDestino = document.getElementById(idImagen);
    const modal = document.getElementById("modalCamara");
    const video = document.getElementById("video");

    modal.style.display = "flex";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta acceso a la cámara.");
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch(function (error) {
            alert("No se pudo acceder a la cámara.");
            console.error(error);
        });
}

function tomarFoto() {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imagenBase64 = canvas.toDataURL("image/png");
    imagenDestino.src = imagenBase64;

    localStorage.setItem(imagenDestino.id, imagenBase64);
    cerrarCamara();
}

function cerrarCamara() {
    const modal = document.getElementById("modalCamara");

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    // Restaurar imágenes guardadas
    const imagenes = document.querySelectorAll("img");
    imagenes.forEach(imagen => {
        const imagenGuardada = localStorage.getItem(imagen.id);
        if (imagenGuardada) {
            imagen.src = imagenGuardada;
        }
    });

    // Restaurar fotos extras
    restaurarFotosExtras();
});

function agregarFotoExtra() {
    const contenedor = document.getElementById("extra-fotos-container");

    let filas = contenedor.getElementsByClassName("foto-apartado-container");
    let ultimaFila = filas[filas.length - 1];

    if (!ultimaFila || ultimaFila.children.length >= 2) {
        ultimaFila = document.createElement("div");
        ultimaFila.classList.add("foto-apartado-container");
        contenedor.appendChild(ultimaFila);
    }

    const nuevoApartado = document.createElement("div");
    nuevoApartado.classList.add("foto-apartado");
    const idExtra = `extra-dinamico-${contadorExtra}`;

    nuevoApartado.innerHTML = `
        <p>Extra ${contadorExtra}:</p>
        <button class="btn-remove" onclick="eliminarFotoExtra(this, '${idExtra}')"> ✖</button>
        <img src="../../img/agregar.png" alt="extra" class="foto-preview" id="${idExtra}" onclick="abrirCamara('${idExtra}')">
        <textarea id="observaciones-${idExtra}" name="observaciones" rows="2" cols="5" placeholder="Observaciones"></textarea>
    `;

    ultimaFila.appendChild(nuevoApartado);

    // Guardar en localStorage
    guardarFotoExtra(idExtra);
    contadorExtra++;
}

function eliminarFotoExtra(boton, idImagen) {
    const apartado = boton.parentElement;
    const fila = apartado.parentElement;

    apartado.remove();
    localStorage.removeItem(idImagen);

    let fotosExtras = JSON.parse(localStorage.getItem("fotosExtras")) || [];
    fotosExtras = fotosExtras.filter(id => id !== idImagen);
    localStorage.setItem("fotosExtras", JSON.stringify(fotosExtras));

    if (fila.children.length === 0) {
        fila.remove();
    }

    // Si no quedan imágenes, reiniciar el contador a 1
    const contenedor = document.getElementById("extra-fotos-container");
    if (contenedor.getElementsByClassName("foto-apartado").length === 0) {
        contadorExtra = 1;
    }
}

function guardarFotoExtra(idImagen) {
    let fotosExtras = JSON.parse(localStorage.getItem("fotosExtras")) || [];
    if (!fotosExtras.includes(idImagen)) {
        fotosExtras.push(idImagen);
    }
    localStorage.setItem("fotosExtras", JSON.stringify(fotosExtras));
}

function restaurarFotosExtras() {
    let fotosExtras = JSON.parse(localStorage.getItem("fotosExtras")) || [];

    fotosExtras.forEach(idExtra => {
        const contenedor = document.getElementById("extra-fotos-container");

        let filas = contenedor.getElementsByClassName("foto-apartado-container");
        let ultimaFila = filas[filas.length - 1];

        if (!ultimaFila || ultimaFila.children.length >= 2) {
            ultimaFila = document.createElement("div");
            ultimaFila.classList.add("foto-apartado-container");
            contenedor.appendChild(ultimaFila);
        }

        const nuevoApartado = document.createElement("div");
        nuevoApartado.classList.add("foto-apartado");

        nuevoApartado.innerHTML = `
            <p>Extra ${idExtra.split('-')[2]}:</p>
            <button class="btn-remove" onclick="eliminarFotoExtra(this, '${idExtra}')"> ✖</button>
            <img src="../../img/agregar.png" alt="extra" class="foto-preview" id="${idExtra}" onclick="abrirCamara('${idExtra}')">
            <textarea id="observaciones-${idExtra}" name="observaciones" rows="2" cols="5" placeholder="Observaciones"></textarea>
        `;

        ultimaFila.appendChild(nuevoApartado);

        // Restaurar imagen si existe en localStorage
        const imagenGuardada = localStorage.getItem(idExtra);
        if (imagenGuardada) {
            document.getElementById(idExtra).src = imagenGuardada;
        }
    });

    contadorExtra = fotosExtras.length > 0 ? parseInt(fotosExtras[fotosExtras.length - 1].split('-')[2]) + 1 : 1;
}


// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}

function guardarFotos() {
    let imagenes = [
        { id: "foto-frontal", tipo: "Frontal" },
        { id: "foto-posterior", tipo: "Posterior" },
        { id: "foto-derecho", tipo: "Lado Derecho" },
        { id: "foto-izquierdo", tipo: "Lado Izquierdo" },
        { id: "kilometraje", tipo: "Kilometraje" },
        { id: "numero-serie", tipo: "Numero de Serie" }
    ];

    let fotosExtras = JSON.parse(localStorage.getItem("fotosExtras")) || [];

    let formData = new FormData();

    imagenes.forEach(img => {
        let imagenBase64 = localStorage.getItem(img.id);
        if (imagenBase64) {
            formData.append("imagenes[]", imagenBase64);
            formData.append("tipos[]", img.tipo);
        }
    });

    fotosExtras.forEach(idExtra => {
        let imagenBase64 = localStorage.getItem(idExtra);
        if (imagenBase64) {
            formData.append("imagenesExtras[]", imagenBase64);
        }
    });

    fetch("../../php/guardar_fotos.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire("Good job!", "Fotos guardadas correctamente!", "success");
            localStorage.clear();
        } else {
            Swal.fire("Oops...", "Hubo un error al guardar las fotos!", "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire("Oops...", "Error en la solicitud!", "error");
    });
}
