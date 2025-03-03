document.addEventListener("DOMContentLoaded", function () {
    // Ocultar todas las pestañas
    document.querySelectorAll(".tabcontent").forEach(tab => {
        tab.style.display = "none";
    });

    // Mostrar la pestaña "Exterior" por defecto
    const defaultTab = document.getElementById("Exterior");
    const defaultButton = document.getElementById("exterior");

    if (defaultTab && defaultButton) {
        defaultTab.style.display = "block"; // Mostrar pestaña
        defaultButton.classList.add("active"); // Marcar botón como activo
    }

    // Comunicación con los iframes para cargar radios
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach(iframe => {
        iframe.addEventListener("load", function () {
            iframe.contentWindow.postMessage({ type: "loadRadios" }, "*");
        });
    });

    window.addEventListener("message", function (event) {
        if (event.data.type === "saveRadio") {
            localStorage.setItem(event.data.name, event.data.value);
        } else if (event.data.type === "loadRadios") {
            let storedValues = {};
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                storedValues[key] = localStorage.getItem(key);
            }
            event.source.postMessage({ type: "restoreRadios", values: storedValues }, "*");
        }
    });
});


function openTab(evt, tabName) {
    document.querySelectorAll(".tabcontent").forEach(tab => tab.style.display = "none");
    document.querySelectorAll(".tablink").forEach(btn => btn.classList.remove("active"));

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

function nextTab() {
    const tabs = ["Exterior", "Interior", "Accesorios"];
    let currentTabIndex = tabs.findIndex(tab => document.getElementById(tab).style.display === "block");

    if (currentTabIndex < tabs.length - 1) {
        document.getElementById(tabs[currentTabIndex + 1]).style.display = "block";
        document.getElementById(tabs[currentTabIndex]).style.display = "none";

        document.querySelectorAll(".tablink").forEach(btn => btn.classList.remove("active"));
        document.getElementById(tabs[currentTabIndex + 1].toLowerCase()).classList.add("active");
    } else {
        window.location.href = "../formulario/fotografias.php";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Restaurar selecciones desde localStorage
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        const storedValue = localStorage.getItem(radio.name);
        if (storedValue && radio.value === storedValue) {
            radio.checked = true;
        }

        // Guardar selección en localStorage cuando cambie
        radio.addEventListener("change", function () {
            localStorage.setItem(radio.name, radio.value);
        });
    });
});


// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
}

