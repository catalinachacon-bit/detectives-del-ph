// Pega aquí el enlace de Google Forms para responder.
const enlaceFormulario = "";

const muestras = [
  {
    pista: "El medidor indica pH 3.",
    respuesta: "Ácida",
    explicacion: "A 25 °C, un pH menor que 7 indica una solución ácida."
  },
  {
    pista: "El medidor indica pH 7.",
    respuesta: "Neutra",
    explicacion: "A 25 °C, un pH de 7 indica una solución neutra."
  },
  {
    pista: "El medidor indica pH 10.",
    respuesta: "Básica",
    explicacion: "A 25 °C, un pH mayor que 7 indica una solución básica."
  },
  {
    pista: "El papel tornasol azul cambia a rojo.",
    respuesta: "Ácida",
    explicacion: "Una solución ácida cambia el tornasol azul a rojo.",
    tiras: [["azul", "rojo"]]
  },
  {
    pista: "El papel tornasol rojo cambia a azul.",
    respuesta: "Básica",
    explicacion: "Una solución básica cambia el tornasol rojo a azul.",
    tiras: [["rojo", "azul"]]
  },
  {
    pista: "Ninguna tira cambia de color. El medidor indica pH 7.",
    respuesta: "Neutra",
    explicacion: "La lectura de pH 7 confirma que la muestra es neutra a 25 °C.",
    tiras: [["azul", "azul"], ["rojo", "rojo"]]
  }
];

const inicio = document.querySelector("#inicio");
const juego = document.querySelector("#juego");
const final = document.querySelector("#final");
const ficha = document.querySelector("#ficha");
const pista = document.querySelector("#pista");
const tornasol = document.querySelector("#tornasol");
const contador = document.querySelector("#contador");
const progreso = document.querySelector("#progreso");
const puntaje = document.querySelector("#puntaje");
const feedback = document.querySelector("#feedback");
const siguiente = document.querySelector("#siguiente");
const resultado = document.querySelector("#resultado");
const encuesta = document.querySelector("#encuesta");
const opciones = document.querySelectorAll("#opciones button");

let ronda = 0;
let puntos = 0;
let respondida = false;

progreso.max = muestras.length;

if (enlaceFormulario.trim()) {
  encuesta.href = enlaceFormulario.trim();
  encuesta.hidden = false;
}

function actualizarEstado() {
  contador.textContent = `Muestra ${ronda + 1} de ${muestras.length}`;
  progreso.value = ronda + Number(respondida);
  puntaje.textContent = `Puntos: ${puntos}`;
}

function crearLectura(momento, color) {
  const lectura = document.createElement("span");
  lectura.className = "lectura";
  lectura.textContent = `${momento}: ${color}`;

  const tira = document.createElement("span");
  tira.className = `tira ${color}`;
  tira.setAttribute("aria-hidden", "true");
  lectura.append(tira);

  return lectura;
}

function mostrarTiras(tiras) {
  tornasol.replaceChildren();
  tornasol.hidden = tiras.length === 0;

  for (const [antes, despues] of tiras) {
    const comparacion = document.createElement("div");
    comparacion.className = "comparacion";

    const flecha = document.createElement("span");
    flecha.textContent = "→";
    flecha.setAttribute("aria-hidden", "true");

    comparacion.append(
      crearLectura("Antes", antes),
      flecha,
      crearLectura("Después", despues)
    );
    tornasol.append(comparacion);
  }
}

function mostrarMuestra() {
  respondida = false;
  const muestra = muestras[ronda];

  pista.textContent = muestra.pista;
  mostrarTiras(muestra.tiras ?? []);
  actualizarEstado();

  feedback.textContent = "";
  delete feedback.dataset.resultado;
  siguiente.hidden = true;

  for (const boton of opciones) {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  }

  ficha.classList.remove("entrada");
  requestAnimationFrame(() => ficha.classList.add("entrada"));
  pista.focus();
}

function empezarPartida() {
  ronda = 0;
  puntos = 0;
  inicio.hidden = true;
  final.hidden = true;
  juego.hidden = false;
  mostrarMuestra();
}

function responder(botonElegido) {
  if (respondida) return;
  respondida = true;

  const muestra = muestras[ronda];
  const acierto = botonElegido.dataset.respuesta === muestra.respuesta;

  if (acierto) {
    puntos++;
    feedback.dataset.resultado = "correcto";
    feedback.textContent = `¡Correcto! ${muestra.explicacion}`;
  } else {
    botonElegido.classList.add("incorrecta");
    feedback.dataset.resultado = "error";
    feedback.textContent =
      `Respuesta incorrecta. La muestra es ${muestra.respuesta.toLowerCase()}. ` +
      muestra.explicacion;
  }

  for (const boton of opciones) {
    boton.disabled = true;
    if (boton.dataset.respuesta === muestra.respuesta) {
      boton.classList.add("correcta");
    }
  }

  actualizarEstado();
  siguiente.textContent = ronda === muestras.length - 1
    ? "Ver resultado"
    : "Siguiente muestra";
  siguiente.hidden = false;
  siguiente.focus();
}

function avanzar() {
  if (!respondida || juego.hidden) return;

  ronda++;
  if (ronda < muestras.length) {
    mostrarMuestra();
    return;
  }

  juego.hidden = true;
  final.hidden = false;
  resultado.textContent = `Puntaje final: ${puntos}/${muestras.length}`;
  resultado.focus();
}

for (const boton of opciones) {
  boton.addEventListener("click", () => responder(boton));
}

siguiente.addEventListener("click", avanzar);
document.querySelector("#empezar").addEventListener("click", empezarPartida);
document.querySelector("#reiniciar").addEventListener("click", empezarPartida);