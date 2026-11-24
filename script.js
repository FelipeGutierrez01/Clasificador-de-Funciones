const spanB = document.querySelector("#b");
const spanC = document.querySelector("#c");
const cajaLineal = document.querySelector("#lineal");
const cajaAfin = document.querySelector("#afin");
const cajaNula = document.querySelector("#nula");
const listaLineal = document.querySelector("#listalineal");
const listaAfin = document.querySelector("#listaafin");
const listaNula = document.querySelector("#listanula");
const boton = document.querySelector("#boton");

let apiGgb = null;
let bActual = 0;
let cActual = 0;

// Inicializar Grafico GeoGebra

let appGgb = new GGBApplet({
    appName: "graphing",
    width: 620,
    height: 360,
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    enableRightClick: false,
    appletOnLoad: function (api) {
        apiGgb = api;
        graficar(bActual, cActual);
    }
}, true);

function graficar(b, c) {
    if (apiGgb === null) {
        return;
    }

    apiGgb.reset();

    if (b === 0) {
        if (c === 0) {
            apiGgb.evalCommand("Delete(f)");
        } else {
            apiGgb.evalCommand("f(x) = " + c);
        }
    } else if (c === 0) {
        apiGgb.evalCommand("f(x) = " + b + "x");
    } else if (c > 0) {
        apiGgb.evalCommand("f(x) = " + b + "x + " + c);
    } else {
        apiGgb.evalCommand("f(x) = " + b + "x - " + Math.abs(c));
    }
}

// Generar valores aleatorios y actualizar la interfaz

function generar() {
    let b = Math.floor(Math.random() * 7) - 3;
    let c = Math.floor(Math.random() * 7) - 3;

    bActual = b;
    cActual = c;
    spanB.textContent = b;
    spanC.textContent = c;

    listaLineal.innerHTML = "";
    listaAfin.innerHTML = "";
    listaNula.innerHTML = "";
    cajaLineal.className = "caja";
    cajaAfin.className = "caja";
    cajaNula.className = "caja";

// Determinar el tipo de función y actualizar la interfaz

    if (b === 0) {
        if (c === 0) {
            cajaNula.className = "caja error";
            listaNula.innerHTML = "<li><strong>Resultado:</strong> No hay función (b = 0 y c = 0)</li>";
            alert("No hay función: b = 0 y c = 0");
        } else {
            cajaAfin.className = "caja activa";
            listaAfin.innerHTML =
                "<li><strong>Tipo:</strong> Constante</li>" +
                "<li><strong>Fórmula:</strong> f(x) = " + c + "</li>" +
                "<li><strong>Corte Eje Y:</strong> (0, " + c + ")</li>";
        }
    } else if (c === 0) {
        cajaLineal.className = "caja activa";
        listaLineal.innerHTML =
            "<li><strong>Tipo:</strong> Lineal</li>" +
            "<li><strong>Fórmula:</strong> f(x) = " + b + "x</li>" +
            "<li><strong>Corte:</strong> Pasa por (0, 0)</li>";
    } else {
        cajaAfin.className = "caja activa";
        let signo = "+ " + c;
        if (c < 0) {
            signo = "- " + Math.abs(c);
        }
        listaAfin.innerHTML =
            "<li><strong>Tipo:</strong> Afín</li>" +
            "<li><strong>Fórmula:</strong> f(x) = " + b + "x " + signo + "</li>" +
            "<li><strong>Corte Eje Y:</strong> (0, " + c + ")</li>";
    }

    graficar(b, c);
}

boton.addEventListener("click", generar);
window.addEventListener("load", function () {
    generar();
    appGgb.inject("ggb");
});