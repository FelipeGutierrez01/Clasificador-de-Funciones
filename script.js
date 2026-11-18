const spanB = document.querySelector("#b");
const spanC = document.querySelector("#c");
const cajaLineal = document.querySelector("#lineal");
const cajaAfin = document.querySelector("#afin");
const listaLineal = document.querySelector("#listalineal");
const listaAfin = document.querySelector("#listaafin");
const boton = document.querySelector("#boton");

function generar() {
    let b = Math.floor(Math.random() * 21) - 10;
    let c = Math.floor(Math.random() * 21) - 10;

    spanB.textContent = b;
    spanC.textContent = c;

    listaLineal.innerHTML = "";
    listaAfin.innerHTML = "";

    let pendiente = "";
    if (b > 0) {
        pendiente = "Creciente (b = " + b + " > 0)";
    } else {
        if (b < 0) {
            pendiente = "Decreciente (b = " + b + " < 0)";
        } else {
            pendiente = "Constante (b = 0)";
        }
    }

    if (c === 0) {
        cajaLineal.className = "caja activa";
        cajaAfin.className = "caja";

        let item1 = document.createElement("li");
        item1.innerHTML = "<strong>Expresión:</strong> f(x) = " + b + "x";
        listaLineal.appendChild(item1);

        let item2 = document.createElement("li");
        item2.innerHTML = "<strong>Gráfica:</strong> Línea recta continua que pasa por el origen (0, 0).";
        listaLineal.appendChild(item2);

        let item3 = document.createElement("li");
        item3.innerHTML = "<strong>Pendiente:</strong> " + pendiente + ".";
        listaLineal.appendChild(item3);

    } else {
        cajaAfin.className = "caja activa";
        cajaLineal.className = "caja";

        let signo = "";
        if (c > 0) {
            signo = "+ " + c;
        } else {
            signo = "- " + Math.abs(c);
        }

        let item4 = document.createElement("li");
        item4.innerHTML = "<strong>Expresión:</strong> f(x) = " + b + "x " + signo;
        listaAfin.appendChild(item4);

        let item5 = document.createElement("li");
        item5.innerHTML = "<strong>Corte Eje Y:</strong> Interseca en las coordenadas (0, " + c + ").";
        listaAfin.appendChild(item5);

        let item6 = document.createElement("li");
        item6.innerHTML = "<strong>Pendiente:</strong> " + pendiente + ".";
        listaAfin.appendChild(item6);

        let item7 = document.createElement("li");
        item7.innerHTML = "<strong>Traslación:</strong> Desplazamiento vertical de " + c + " unidades respecto al origen.";
        listaAfin.appendChild(item7);
    }
}

boton.addEventListener("click", generar);
generar();