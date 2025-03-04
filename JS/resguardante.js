document.addEventListener("DOMContentLoaded", function () {
    var observer = new MutationObserver(() => {
        var fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            observer.disconnect(); 
            asignarFecha(); 
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

function asignarFecha() {
    var fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.removeAttribute("disabled"); 
        var today = new Date();
        fechaInput.value = today.toISOString().split('T')[0];
        fechaInput.setAttribute("disabled", "disabled");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".menu-link");
    let currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual

    links.forEach(link => {
        if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
        }
    });
});
// Redirigir a la siguiente página
function siguiente() {
    window.location.href = "../../vistas/formulario/unidadVehicular.php";
}
function cerrar() {
    window.location.href = "../../php/logout.php";  
}
// Función para normalizar el nombre (quitar acentos y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function buscarEmpleados() {
    let resguardante = document.getElementById("resguardante").value.trim();
    let resguardanteInterno = document.getElementById("resguardante_interno").value.trim();

    // Si ambos campos están vacíos, no hacer la búsqueda
    if (resguardante === "" && resguardanteInterno === "") {
        return;
    }

    if (resguardante) {
        let nombreNormalizado = normalizarTexto(resguardante);
        buscarEmpleadoPorNombre(nombreNormalizado, "resguardante");
    }

    if (resguardanteInterno) {
        let nombreNormalizadoInterno = normalizarTexto(resguardanteInterno);
        buscarEmpleadoPorNombre(nombreNormalizadoInterno, "resguardante_interno");
    }
}

function buscarEmpleadoPorNombre(nombreNormalizado, tipo) {
    let url = `http://localhost/xampp/VehiculosSQLSERVE/php/buscarEmpleado.php?nombre=${encodeURIComponent(nombreNormalizado)}`;

    fetch(url)
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
                if (tipo === "resguardante") {
                    document.getElementById("resguardante").value = data.nombre || nombreNormalizado;
                    document.getElementById("cargo").value = data.cargo || "";
                    document.getElementById("fiscalia_general").value = data.fiscalia_general || "";
                    document.getElementById("fiscalia_especializada_en").value = data.fiscalia_especializada_en || "";
                    document.getElementById("vicefiscalia_en").value = data.vicefiscalia_en || "";
                    document.getElementById("direccion_general").value = data.direccion_general || "";
                    document.getElementById("departamento_area").value = data.departamento_area || "";
            
                    localStorage.setItem("cargo", data.cargo || "");
                    localStorage.setItem("fiscalia_general", data.fiscalia_general || "");
                    localStorage.setItem("fiscalia_especializada_en", data.fiscalia_especializada_en || "");
                    localStorage.setItem("vicefiscalia_en", data.vicefiscalia_en || "");
                    localStorage.setItem("direccion_general", data.direccion_general || "");
                    localStorage.setItem("departamento_area", data.departamento_area || "");
                } else if (tipo === "resguardante_interno") {
                    document.getElementById("resguardante_interno").value = data.nombre || nombreNormalizado;
                    document.getElementById("cargo_interno").value = data.cargo || "";
                    document.getElementById("numero_empleado").value = data.numero_empleado || "";
                    document.getElementById("celular").value = data.celular || "";

                    localStorage.setItem("cargo_interno", data.cargo || "");
                    localStorage.setItem("numero_empleado", data.numero_empleado || "");
                    localStorage.setItem("celular", data.celular || "");
                }

            }
            Swal.fire({
                title: "¡Éxito!",
                text: "Empleado encontrado.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                backdrop: false
            });

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
    document.querySelectorAll("#formularioResguardante input").forEach(input => {
        input.addEventListener("input", function () {
            localStorage.setItem(input.id, input.value);
        });
    });
});

function cargarDatosFormulario() {
    document.querySelectorAll("#formularioResguardante input").forEach(input => {
        let valorGuardado = localStorage.getItem(input.id);
        if (valorGuardado) {
            input.value = valorGuardado;
        }
    });
}


// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}


