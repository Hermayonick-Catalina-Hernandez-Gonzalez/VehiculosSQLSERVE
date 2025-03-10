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

    // Recuperar observaciones de imágenes normales al cargar la página
    let observacionesNormales = document.querySelectorAll("textarea[id^='observaciones-']");

    // Recuperar las observaciones guardadas en localStorage
    observacionesNormales.forEach((observacion) => {
        const observacionGuardada = localStorage.getItem(observacion.id);
        if (observacionGuardada) {
            observacion.value = observacionGuardada;
        }

        // Guardar observaciones cuando el usuario las escriba
        observacion.addEventListener("input", function () {
            localStorage.setItem(observacion.id, observacion.value);
        });
    });
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

    // Guardar foto extra en localStorage
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

    // Guardar observación de la foto extra
    const observacionElement = document.getElementById(`observaciones-${idImagen}`);
    const observacion = observacionElement ? observacionElement.value : "";
    localStorage.setItem(`observacion-${idImagen}`, observacion); 
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

        // Recuperar observación si existe en localStorage
        const observacionGuardada = localStorage.getItem(`observacion-${idExtra}`);
        if (observacionGuardada) {
            document.getElementById(`observaciones-${idExtra}`).value = observacionGuardada;
        }
    });

    contadorExtra = fotosExtras.length > 0 ? parseInt(fotosExtras[fotosExtras.length - 1].split('-')[2]) + 1 : 1;
}

function guardar() {
    let formData = new FormData();
    let observaciones = [];

    // Contar las fotos principales que ya están tomadas
    let fotoCount = 0;

    // Verificar si las fotos principales están presentes
    const fotosPrincipales = [
        'foto-frontal',
        'foto-posterior',
        'foto-derecho',
        'foto-izquierdo',
        'kilometraje',
        'numero-serie'
    ];

    fotosPrincipales.forEach((fotoId) => {
        const img = document.getElementById(fotoId);
        if (img.src.startsWith("data:image")) {
            const blob = dataURLtoBlob(img.src);
            formData.append('imagenes[]', blob, `${fotoId}.png`);
            localStorage.setItem(fotoId, img.src);

            // Recoger las observaciones para las fotos principales
            const observacionElement = document.getElementById(`observaciones-${fotoId}`);
            const observacion = observacionElement ? observacionElement.value : "";
            observaciones.push(observacion);
            localStorage.setItem(`observacion_${fotoId}`, observacion);

            fotoCount++;
        }
    });

    // Si no se han tomado todas las fotos principales, no permitir guardar
    if (fotoCount < 6) {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan fotos principales',
            text: 'Por favor, tome todas las fotos principales antes de continuar.',
            backdrop: true
        });
        return;
    }

    // Recopilar fotos adicionales (si hay)
    let fotosExtras = JSON.parse(localStorage.getItem("fotosExtras")) || [];
    fotosExtras.forEach((idExtra) => {
        const imagenGuardada = localStorage.getItem(idExtra);
        if (imagenGuardada) {
            const blob = dataURLtoBlob(imagenGuardada);
            formData.append('imagenes[]', blob, `${idExtra}.png`);
        }
        const observacionGuardada = localStorage.getItem(`observacion-${idExtra}`);
        if (observacionGuardada) {
            formData.append('observaciones_extra[]', observacionGuardada);
        }
    });

    // Recoger observaciones adicionales
    let observacionesNormales = document.querySelectorAll("textarea[id^='observaciones-foto']");
    observacionesNormales.forEach((observacion) => {
        const observacionValor = observacion.value;
        observaciones.push(observacionValor);
        formData.append('observaciones_normales[]', observacionValor);
    });

    // Enviar la información al servidor
    fetch('http://localhost/xampp/VehiculosSQLSERVE/php/guardar_fotografias.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: '¡Se ha Guardado Exitosamente!',
            timer: 1500,
            showConfirmButton: false,
            backdrop: false
        }).then(() => {
            window.location.href = '../../vistas/formulario/pdfs.php';
        });
    })
    .catch(error => {
        Swal.fire("Error", "No se pudo guardar las imágenes.", "error");
        console.error(error);
    });
}


function dataURLtoBlob(dataurl) {
    const [header, base64] = dataurl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
}

// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}