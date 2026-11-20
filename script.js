// Pega aquí el enlace de Google Forms para responder.
const enlaceFormulario = "";

const totalRondas = 6;
const categorias = ["acida", "neutra", "basica"];

const textos = {
  es: {
    titulo: "Detectives del pH",
    instrucciones:
      "Analiza seis soluciones acuosas a 25 °C. Usa las lecturas de pH y las pistas del papel tornasol para clasificar cada muestra.",
    empezar: "Empezar",
    pregunta: "¿Cómo clasificarías esta muestra?",
    opciones: { acida: "Ácida", neutra: "Neutra", basica: "Básica" },
    colores: { azul: "azul", rojo: "rojo" },
    antes: "Antes",
    despues: "Después",
    muestra: (numero, total) => `Muestra ${numero} de ${total}`,
    puntos: (puntos) => `Puntos: ${puntos}`,
    acierto: "¡Correcto!",
    error: (respuesta) => `Incorrecto. La respuesta es «${respuesta}».`,
    siguiente: "Siguiente muestra",
    verResultado: "Ver resultado",
    resultado: (puntos, total) => `Puntaje final: ${puntos}/${total}`,
    reiniciar: "Volver a jugar",
    cambiar: "Cambiar idioma",
    encuesta: "Evalúa el juego"
  },
  en: {
    titulo: "pH Detectives",
    instrucciones:
      "Analyze six water-based solutions at 25 °C. Use pH readings and litmus paper clues to classify each sample.",
    empezar: "Start",
    pregunta: "How would you classify this sample?",
    opciones: { acida: "Acidic", neutra: "Neutral", basica: "Basic" },
    colores: { azul: "blue", rojo: "red" },
    antes: "Before",
    despues: "After",
    muestra: (numero, total) => `Sample ${numero} of ${total}`,
    puntos: (puntos) => `Score: ${puntos}`,
    acierto: "Correct!",
    error: (respuesta) => `Incorrect. The answer is ${respuesta.toLowerCase()}.`,
    siguiente: "Next sample",
    verResultado: "See result",
    resultado: (puntos, total) => `Final score: ${puntos}/${total}`,
    reiniciar: "Play again",
    cambiar: "Change language",
    encuesta: "Rate the game"
  }
};

const reglas = {
  acida: {
    es: "A 25 °C, un pH menor que 7 indica una solución ácida.",
    en: "At 25 °C, a pH below 7 indicates an acidic solution."
  },
  neutra: {
    es: "A 25 °C, un pH de 7 indica una solución neutra.",
    en: "At 25 °C, a pH of 7 indicates a neutral solution."
  },
  basica: {
    es: "A 25 °C, un pH mayor que 7 indica una solución básica.",
    en: "At 25 °C, a pH above 7 indicates a basic solution."
  },
  tornasolAcido: {
    es: "Una solución ácida cambia el tornasol azul a rojo.",
    en: "An acidic solution turns blue litmus paper red."
  },
  tornasolBasico: {
    es: "Una solución básica cambia el tornasol rojo a azul.",
    en: "A basic solution turns red litmus paper blue."
  }
};

// Cada pregunta tiene una respuesta, una pista por idioma y su explicación.
const banco = [
  {
    respuesta: "acida",
    pista: { es: "El medidor indica pH 3.", en: "The meter reads pH 3." },
    explicacion: reglas.acida
  },
  {
    respuesta: "acida",
    pista: { es: "El medidor indica pH 1,8.", en: "The meter reads pH 1.8." },
    explicacion: reglas.acida
  },
  {
    respuesta: "acida",
    pista: {
      es: "La muestra tiene un pH de 6,8.",
      en: "The sample has a pH of 6.8."
    },
    explicacion: reglas.acida
  },
  {
    respuesta: "acida",
    pista: {
      es: "El papel tornasol azul cambia a rojo.",
      en: "Blue litmus paper turns red."
    },
    explicacion: reglas.tornasolAcido,
    tiras: [["azul", "rojo"]]
  },
  {
    respuesta: "acida",
    pista: {
      es: "El medidor marca pH 4 y el tornasol azul cambia a rojo.",
      en: "The meter reads pH 4, and blue litmus paper turns red."
    },
    explicacion: {
      es: "El pH está por debajo de 7 y el tornasol azul cambia a rojo. Ambas pistas indican acidez.",
      en: "The pH is below 7, and blue litmus turns red. Both clues indicate an acidic sample."
    },
    tiras: [["azul", "rojo"]]
  },
  {
    respuesta: "acida",
    pista: {
      es: "Comparas tu muestra con agua neutra. El pH de tu muestra es dos unidades menor.",
      en: "You compare your sample with neutral water. Your sample's pH is two units lower."
    },
    explicacion: {
      es: "El agua neutra tiene pH 7 a 25 °C. Dos unidades menos dan pH 5.",
      en: "Neutral water has a pH of 7 at 25 °C. Two units lower gives a pH of 5."
    }
  },
  {
    respuesta: "neutra",
    pista: { es: "El medidor indica pH 7.", en: "The meter reads pH 7." },
    explicacion: reglas.neutra
  },
  {
    respuesta: "neutra",
    pista: {
      es: "Ninguna tira cambia de color y el medidor indica pH 7.",
      en: "Neither strip changes color, and the meter reads pH 7."
    },
    explicacion: reglas.neutra,
    tiras: [["azul", "azul"], ["rojo", "rojo"]]
  },
  {
    respuesta: "neutra",
    pista: {
      es: "Una muestra pasa de pH 4 a pH 7. ¿Cómo queda al final?",
      en: "A sample changes from pH 4 to pH 7. How is it classified at the end?"
    },
    explicacion: {
      es: "Clasificas la muestra usando el valor final. A 25 °C, ese pH de 7 es neutro.",
      en: "Use the final reading to classify the sample. At 25 °C, that reading of 7 is neutral."
    }
  },
  {
    respuesta: "neutra",
    pista: {
      es: "Una muestra pasa de pH 9 a pH 7, y al final el tornasol rojo sigue rojo.",
      en: "A sample changes from pH 9 to pH 7, and red litmus stays red at the end."
    },
    explicacion: {
      es: "El pH final de 7 confirma la neutralidad. El tornasol rojo por sí solo también podría quedarse rojo en un ácido.",
      en: "The final pH of 7 confirms neutrality. Red litmus could also stay red in an acid."
    },
    tiras: [["rojo", "rojo"]]
  },
  {
    respuesta: "neutra",
    pista: {
      es: "La muestra tiene el mismo pH que el agua pura a 25 °C.",
      en: "The sample has the same pH as pure water at 25 °C."
    },
    explicacion: {
      es: "El agua pura a 25 °C tiene pH 7, así que la muestra también es neutra.",
      en: "Pure water at 25 °C has a pH of 7, so the sample is neutral too."
    }
  },
  {
    respuesta: "neutra",
    pista: {
      es: "El tornasol azul sigue azul. La lectura de la muestra está justo a mitad de camino entre pH 6 y pH 8.",
      en: "Blue litmus stays blue. The sample's reading is exactly halfway between pH 6 and pH 8."
    },
    explicacion: {
      es: "La lectura intermedia es pH 7. Ese valor confirma la neutralidad a 25 °C.",
      en: "The midpoint is pH 7. That reading confirms neutrality at 25 °C."
    },
    tiras: [["azul", "azul"]]
  },
  {
    respuesta: "basica",
    pista: { es: "El medidor indica pH 10.", en: "The meter reads pH 10." },
    explicacion: reglas.basica
  },
  {
    respuesta: "basica",
    pista: {
      es: "El medidor indica pH 7,4.",
      en: "The meter reads pH 7.4."
    },
    explicacion: reglas.basica
  },
  {
    respuesta: "basica",
    pista: {
      es: "La muestra tiene un pH de 12.",
      en: "The sample has a pH of 12."
    },
    explicacion: reglas.basica
  },
  {
    respuesta: "basica",
    pista: {
      es: "El papel tornasol rojo cambia a azul.",
      en: "Red litmus paper turns blue."
    },
    explicacion: reglas.tornasolBasico,
    tiras: [["rojo", "azul"]]
  },
  {
    respuesta: "basica",
    pista: {
      es: "El medidor marca pH 11 y el tornasol rojo cambia a azul.",
      en: "The meter reads pH 11, and red litmus paper turns blue."
    },
    explicacion: {
      es: "El pH supera 7 y el tornasol rojo cambia a azul. Ambas pistas indican una base.",
      en: "The pH is above 7, and red litmus turns blue. Both clues indicate a basic sample."
    },
    tiras: [["rojo", "azul"]]
  },
  {
    respuesta: "basica",
    pista: {
      es: "Una muestra pasa de pH 6 a pH 8. ¿Cómo queda al final?",
      en: "A sample changes from pH 6 to pH 8. How is it classified at the end?"
    },
    explicacion: {
      es: "El valor final es 8. Como está por encima de 7 a 25 °C, la muestra queda básica.",
      en: "The final reading is 8. Since it is above 7 at 25 °C, the sample ends up basic."
    }
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
const empezar = document.querySelector("#empezar");
const reiniciar = document.querySelector("#reiniciar");
const cambiarIdioma = document.querySelector("#cambiar-idioma");
const opciones = document.querySelectorAll("[data-respuesta]");
const botonesIdioma = document.querySelectorAll("[data-idioma]");

let idioma = "es";
let seleccion = [];
let ronda = 0;
let puntos = 0;
let respondida = false;

progreso.max = totalRondas;

if (enlaceFormulario.trim()) {
  encuesta.href = enlaceFormulario.trim();
  encuesta.hidden = false;
}

function aplicarIdioma(nuevoIdioma) {
  idioma = nuevoIdioma;
  const texto = textos[idioma];

  document.documentElement.lang = idioma;
  document.title = texto.titulo;
  document.querySelector("#titulo").textContent = texto.titulo;
  document.querySelector("#instrucciones").textContent = texto.instrucciones;
  document.querySelector("#pregunta").textContent = texto.pregunta;
  empezar.textContent = texto.empezar;
  reiniciar.textContent = texto.reiniciar;
  cambiarIdioma.textContent = texto.cambiar;
  encuesta.textContent = texto.encuesta;

  for (const boton of botonesIdioma) {
    boton.setAttribute("aria-pressed", String(boton.dataset.idioma === idioma));
  }

  for (const boton of opciones) {
    boton.textContent = texto.opciones[boton.dataset.respuesta];
  }
}

function mezclar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function elegirPreguntas(anterior) {
  const nueva = [];

  for (const categoria of categorias) {
    const grupo = banco.filter((muestra) => muestra.respuesta === categoria);
    nueva.push(...mezclar(grupo).slice(0, 2));
  }

  // Si salió el mismo grupo, cambia una pregunta por otra de su categoría.
  if (nueva.every((muestra) => anterior.includes(muestra))) {
    const indice = Math.floor(Math.random() * nueva.length);
    const alternativas = banco.filter((muestra) =>
      muestra.respuesta === nueva[indice].respuesta && !anterior.includes(muestra)
    );
    nueva[indice] = mezclar(alternativas)[0];
  }

  return mezclar(nueva);
}

function actualizarEstado() {
  const texto = textos[idioma];
  contador.textContent = texto.muestra(ronda + 1, totalRondas);
  progreso.value = ronda + Number(respondida);
  puntaje.textContent = texto.puntos(puntos);
}

function crearLectura(momento, color) {
  const lectura = document.createElement("span");
  lectura.className = "lectura";
  lectura.textContent = `${momento}: ${textos[idioma].colores[color]}`;

  const tira = document.createElement("span");
  tira.className = `tira ${color}`;
  tira.setAttribute("aria-hidden", "true");
  lectura.append(tira);

  return lectura;
}

function mostrarTiras(tiras) {
  tornasol.replaceChildren();
  tornasol.hidden = tiras.length === 0;
  const texto = textos[idioma];

  for (const [antes, despues] of tiras) {
    const comparacion = document.createElement("div");
    comparacion.className = "comparacion";

    const flecha = document.createElement("span");
    flecha.textContent = "→";
    flecha.setAttribute("aria-hidden", "true");

    comparacion.append(
      crearLectura(texto.antes, antes),
      flecha,
      crearLectura(texto.despues, despues)
    );
    tornasol.append(comparacion);
  }
}

function mostrarMuestra() {
  respondida = false;
  const muestra = seleccion[ronda];

  pista.textContent = muestra.pista[idioma];
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
  seleccion = elegirPreguntas(seleccion);
  ronda = 0;
  puntos = 0;
  inicio.hidden = true;
  final.hidden = true;
  juego.hidden = false;
  mostrarMuestra();
}

function responder(botonElegido) {
  if (respondida || juego.hidden) return;
  respondida = true;

  const muestra = seleccion[ronda];
  const texto = textos[idioma];
  const acierto = botonElegido.dataset.respuesta === muestra.respuesta;

  if (acierto) {
    puntos++;
  } else {
    botonElegido.classList.add("incorrecta");
  }

  const mensaje = acierto
    ? texto.acierto
    : texto.error(texto.opciones[muestra.respuesta]);

  feedback.dataset.resultado = acierto ? "correcto" : "error";
  feedback.textContent = `${mensaje} ${muestra.explicacion[idioma]}`;

  for (const boton of opciones) {
    boton.disabled = true;
    if (boton.dataset.respuesta === muestra.respuesta) {
      boton.classList.add("correcta");
    }
  }

  actualizarEstado();
  siguiente.textContent = ronda === totalRondas - 1
    ? texto.verResultado
    : texto.siguiente;
  siguiente.hidden = false;
  siguiente.focus();
}

function avanzar() {
  if (!respondida || juego.hidden) return;

  ronda++;
  if (ronda < totalRondas) {
    mostrarMuestra();
    return;
  }

  juego.hidden = true;
  final.hidden = false;
  resultado.textContent = textos[idioma].resultado(puntos, totalRondas);
  resultado.focus();
}

for (const boton of botonesIdioma) {
  boton.addEventListener("click", () => aplicarIdioma(boton.dataset.idioma));
}

for (const boton of opciones) {
  boton.addEventListener("click", () => responder(boton));
}

empezar.addEventListener("click", empezarPartida);
reiniciar.addEventListener("click", empezarPartida);
siguiente.addEventListener("click", avanzar);

cambiarIdioma.addEventListener("click", () => {
  final.hidden = true;
  inicio.hidden = false;
  document.querySelector("#selector").focus();
});

aplicarIdioma(idioma);