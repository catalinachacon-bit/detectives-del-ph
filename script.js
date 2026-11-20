// Pega entre las comillas el enlace de Google Forms para responder.
const enlaceFormulario = "";

const totalRondas = 6;
const categorias = ["acida", "neutra", "basica"];

const textos = {
  es: {
    titulo: "Detectives del pH",
    idioma: "Elige tu idioma",
    intro: "Clasifica seis soluciones acuosas a 25 °C usando el medidor de pH y el papel tornasol. Elige un modo para empezar.",
    practica: "Práctica",
    detallePractica: "Pide pistas y recibe explicaciones después de responder.",
    reto: "Reto",
    detalleReto: "Resuelve las muestras sin pistas y revisa tus errores al final.",
    guia: "Guía rápida",
    guiaPh: "A 25 °C, compara la lectura de pH con 7.",
    escalaAcida: "Menor que 7 · Ácida",
    escalaNeutra: "Igual a 7 · Neutra",
    escalaBasica: "Mayor que 7 · Básica",
    guiaTornasol: "El tornasol azul cambia a rojo en una solución ácida. El tornasol rojo cambia a azul en una solución básica. Si una tira conserva su color, usa otra pista para confirmar.",
    cerrar: "Cerrar guía",
    pregunta: "¿Cómo clasificarías esta muestra?",
    verPista: "Ver pista",
    ocultarPista: "Ocultar pista",
    antes: "Antes",
    despues: "Después",
    colores: { azul: "azul", rojo: "rojo" },
    opciones: { acida: "Ácida", neutra: "Neutra", basica: "Básica" },
    muestra: (numero) => `Muestra ${numero} de ${totalRondas}`,
    correcto: "¡Correcto!",
    incorrecto: (respuesta) => `Incorrecto. Respuesta correcta: ${respuesta}.`,
    registrada: (respuesta) => `Respuesta registrada: ${respuesta}.`,
    siguiente: "Siguiente muestra",
    verFinal: "Ver resultados",
    fin: "Resultados del laboratorio",
    resumen: (puntos) => `Puntaje: ${puntos}/${totalRondas} · ${puntos} de ${totalRondas} muestras correctas`,
    revisar: "Revisar errores",
    ocultarRevision: "Ocultar revisión",
    sinErrores: "¡Clasificaste correctamente las seis muestras!",
    tuRespuesta: "Tu respuesta",
    respuestaCorrecta: "Respuesta correcta",
    reiniciar: "Volver a jugar",
    cambiar: "Cambiar idioma",
    encuesta: "Evalúa el juego"
  },
  en: {
    titulo: "pH Detectives",
    idioma: "Choose your language",
    intro: "Classify six aqueous solutions at 25 °C using the pH meter and litmus paper. Choose a mode to get started.",
    practica: "Practice",
    detallePractica: "Ask for hints and get explanations after you answer.",
    reto: "Challenge",
    detalleReto: "Solve the samples without hints and review your mistakes at the end.",
    guia: "Quick guide",
    guiaPh: "At 25 °C, compare the pH reading with 7.",
    escalaAcida: "Below 7 · Acidic",
    escalaNeutra: "At 7 · Neutral",
    escalaBasica: "Above 7 · Basic",
    guiaTornasol: "Blue litmus turns red in an acidic solution. Red litmus turns blue in a basic solution. If a strip keeps its color, use another clue to confirm.",
    cerrar: "Close guide",
    pregunta: "How would you classify this sample?",
    verPista: "Show hint",
    ocultarPista: "Hide hint",
    antes: "Before",
    despues: "After",
    colores: { azul: "blue", rojo: "red" },
    opciones: { acida: "Acidic", neutra: "Neutral", basica: "Basic" },
    muestra: (numero) => `Sample ${numero} of ${totalRondas}`,
    correcto: "Correct!",
    incorrecto: (respuesta) => `Incorrect. Correct answer: ${respuesta}.`,
    registrada: (respuesta) => `Answer recorded: ${respuesta}.`,
    siguiente: "Next sample",
    verFinal: "See results",
    fin: "Lab results",
    resumen: (puntos) => `Score: ${puntos}/${totalRondas} · ${puntos} of ${totalRondas} samples correct`,
    revisar: "Review mistakes",
    ocultarRevision: "Hide review",
    sinErrores: "You classified all six samples correctly!",
    tuRespuesta: "Your answer",
    respuestaCorrecta: "Correct answer",
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
    es: "A 25 °C, un pH de 7 confirma que la solución es neutra.",
    en: "At 25 °C, a pH of 7 confirms that the solution is neutral."
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

const pistasDeAyuda = {
  ph: {
    es: "Ubica la lectura respecto al 7 en la escala de pH.",
    en: "Find where the reading falls in relation to 7 on the pH scale."
  },
  tornasol: {
    es: "Fíjate en qué color tenía la tira antes de tocar la muestra y recuerda qué significa ese cambio.",
    en: "Look at the strip's starting color and recall what that change means."
  },
  ambas: {
    es: "Compara el pH con 7 y fíjate si el papel aporta suficiente información por sí solo.",
    en: "Compare the pH with 7 and check whether the paper gives enough information on its own."
  },
  calculo: {
    es: "Encuentra primero el valor de pH que describe la pista. Luego compáralo con 7.",
    en: "First work out the pH described in the clue. Then compare it with 7."
  }
};

function preguntaDeMedidor(valor, respuesta) {
  return {
    respuesta,
    lectura: valor,
    pista: {
      es: `El medidor indica pH ${valor.toLocaleString("es")}.`,
      en: `The meter reads pH ${valor.toLocaleString("en")}.`
    },
    explicacion: reglas[respuesta],
    ayuda: "ph"
  };
}

const banco = [
  preguntaDeMedidor(3, "acida"),
  preguntaDeMedidor(1.8, "acida"),
  preguntaDeMedidor(6.8, "acida"),
  {
    respuesta: "acida",
    pista: {
      es: "El papel tornasol azul cambia a rojo.",
      en: "Blue litmus paper turns red."
    },
    tiras: [["azul", "rojo"]],
    explicacion: reglas.tornasolAcido,
    ayuda: "tornasol"
  },
  {
    respuesta: "acida",
    lectura: 4,
    pista: {
      es: "El medidor marca pH 4 y el tornasol azul cambia a rojo.",
      en: "The meter reads pH 4, and blue litmus paper turns red."
    },
    tiras: [["azul", "rojo"]],
    explicacion: {
      es: "El pH está por debajo de 7 y la tira azul se vuelve roja. Ambas pistas indican acidez.",
      en: "The pH is below 7, and the blue strip turns red. Both clues indicate acidity."
    },
    ayuda: "ambas"
  },
  {
    respuesta: "acida",
    pista: {
      es: "Tu muestra tiene un pH dos unidades menor que el del agua neutra.",
      en: "Your sample's pH is two units lower than that of neutral water."
    },
    explicacion: {
      es: "El agua neutra tiene pH 7 a 25 °C. Dos unidades menos dan pH 5, que es ácido.",
      en: "Neutral water has a pH of 7 at 25 °C. Two units lower gives a pH of 5, which is acidic."
    },
    ayuda: "calculo"
  },
  preguntaDeMedidor(7, "neutra"),
  {
    respuesta: "neutra",
    lectura: 7,
    pista: {
      es: "Ninguna tira cambia de color y el medidor indica pH 7.",
      en: "Neither strip changes color, and the meter reads pH 7."
    },
    tiras: [["azul", "azul"], ["rojo", "rojo"]],
    explicacion: reglas.neutra,
    ayuda: "ambas"
  },
  {
    respuesta: "neutra",
    lectura: 7,
    pista: {
      es: "Una muestra pasa de pH 4 a pH 7. Clasifica la muestra en su estado final.",
      en: "A sample changes from pH 4 to pH 7. Classify the sample at the end."
    },
    explicacion: reglas.neutra,
    ayuda: "ph"
  },
  {
    respuesta: "neutra",
    lectura: 7,
    pista: {
      es: "Una muestra pasa de pH 9 a pH 7. Al final, el tornasol rojo sigue rojo.",
      en: "A sample changes from pH 9 to pH 7. At the end, red litmus stays red."
    },
    tiras: [["rojo", "rojo"]],
    explicacion: {
      es: "El pH final de 7 confirma la neutralidad. El tornasol rojo también puede quedarse rojo en una solución ácida.",
      en: "The final pH of 7 confirms neutrality. Red litmus can also stay red in an acidic solution."
    },
    ayuda: "ambas"
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
    },
    ayuda: "calculo"
  },
  {
    respuesta: "neutra",
    pista: {
      es: "El tornasol azul sigue azul. El pH está justo a mitad de camino entre 6 y 8.",
      en: "Blue litmus stays blue. The pH is exactly halfway between 6 and 8."
    },
    tiras: [["azul", "azul"]],
    explicacion: {
      es: "El valor intermedio es 7. A 25 °C, ese pH confirma la neutralidad.",
      en: "The midpoint is 7. At 25 °C, that pH confirms neutrality."
    },
    ayuda: "calculo"
  },
  preguntaDeMedidor(10, "basica"),
  preguntaDeMedidor(7.4, "basica"),
  preguntaDeMedidor(12, "basica"),
  {
    respuesta: "basica",
    pista: {
      es: "El papel tornasol rojo cambia a azul.",
      en: "Red litmus paper turns blue."
    },
    tiras: [["rojo", "azul"]],
    explicacion: reglas.tornasolBasico,
    ayuda: "tornasol"
  },
  {
    respuesta: "basica",
    lectura: 11,
    pista: {
      es: "El medidor marca pH 11 y el tornasol rojo cambia a azul.",
      en: "The meter reads pH 11, and red litmus paper turns blue."
    },
    tiras: [["rojo", "azul"]],
    explicacion: {
      es: "El pH supera 7 y la tira roja se vuelve azul. Ambas pistas indican una solución básica.",
      en: "The pH is above 7, and the red strip turns blue. Both clues indicate a basic solution."
    },
    ayuda: "ambas"
  },
  {
    respuesta: "basica",
    lectura: 8,
    pista: {
      es: "Una muestra pasa de pH 6 a pH 8. Clasifica la muestra en su estado final.",
      en: "A sample changes from pH 6 to pH 8. Classify the sample at the end."
    },
    explicacion: {
      es: "El valor final es 8. Como supera 7 a 25 °C, la muestra queda básica.",
      en: "The final reading is 8. Since it is above 7 at 25 °C, the sample is now basic."
    },
    ayuda: "ph"
  }
];

const buscar = (id) => document.getElementById(id);
const inicio = buscar("inicio");
const juego = buscar("juego");
const final = buscar("final");
const ficha = buscar("ficha");
const pista = buscar("pista");
const medidor = buscar("medidor");
const lectura = buscar("lectura");
const tornasol = buscar("tornasol");
const ayudas = buscar("ayudas");
const pedirPista = buscar("pedir-pista");
const textoPista = buscar("texto-pista");
const progreso = buscar("progreso");
const feedback = buscar("feedback");
const siguiente = buscar("siguiente");
const revisar = buscar("revisar");
const revision = buscar("revision");
const listaErrores = buscar("errores");
const encuesta = buscar("encuesta");
const guia = buscar("guia");
const opciones = document.querySelectorAll("[data-respuesta]");
const botonesIdioma = document.querySelectorAll("[data-idioma]");

let idioma = "es";
let modo = "practica";
let seleccion = [];
let ronda = 0;
let puntos = 0;
let respondida = false;
let errores = [];

if (enlaceFormulario.trim()) {
  encuesta.href = enlaceFormulario.trim();
  encuesta.hidden = false;
}

function aplicarIdioma(nuevoIdioma) {
  idioma = nuevoIdioma;
  const texto = textos[idioma];

  document.documentElement.lang = idioma;
  document.title = texto.titulo;

  for (const elemento of document.querySelectorAll("[data-texto]")) {
    elemento.textContent = texto[elemento.dataset.texto];
  }

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

  if (nueva.every((muestra) => anterior.includes(muestra))) {
    const indice = Math.floor(Math.random() * nueva.length);
    const categoria = nueva[indice].respuesta;
    const alternativas = banco.filter(
      (muestra) => muestra.respuesta === categoria && !anterior.includes(muestra)
    );

    nueva[indice] = mezclar(alternativas)[0];
  }

  return mezclar(nueva);
}

function crearTira(etiqueta, color) {
  const lecturaTira = document.createElement("span");
  lecturaTira.className = "lectura";
  lecturaTira.textContent = `${etiqueta}: ${textos[idioma].colores[color]}`;

  const tira = document.createElement("span");
  tira.className = `tira ${color}`;
  tira.setAttribute("aria-hidden", "true");
  lecturaTira.append(tira);

  return lecturaTira;
}

function mostrarTiras(tiras) {
  const texto = textos[idioma];
  tornasol.replaceChildren();
  tornasol.hidden = tiras.length === 0;

  for (const [antes, despues] of tiras) {
    const comparacion = document.createElement("div");
    comparacion.className = "comparacion";

    const flecha = document.createElement("span");
    flecha.textContent = "→";
    flecha.setAttribute("aria-hidden", "true");

    comparacion.append(
      crearTira(texto.antes, antes),
      flecha,
      crearTira(texto.despues, despues)
    );
    tornasol.append(comparacion);
  }
}

function mostrarMuestra() {
  const muestra = seleccion[ronda];
  const texto = textos[idioma];
  respondida = false;

  buscar("contador").textContent = texto.muestra(ronda + 1);
  progreso.value = ronda;
  pista.textContent = muestra.pista[idioma];

  medidor.hidden = muestra.lectura === undefined;
  lectura.textContent = muestra.lectura?.toLocaleString(idioma) ?? "";
  mostrarTiras(muestra.tiras ?? []);

  ayudas.hidden = modo !== "practica";
  pedirPista.disabled = false;
  pedirPista.textContent = texto.verPista;
  pedirPista.setAttribute("aria-expanded", "false");
  textoPista.textContent = pistasDeAyuda[muestra.ayuda][idioma];
  textoPista.hidden = true;

  feedback.textContent = "";
  delete feedback.dataset.resultado;
  siguiente.hidden = true;

  for (const boton of opciones) {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta", "registrada");
  }

  ficha.classList.remove("entrada");
  requestAnimationFrame(() => ficha.classList.add("entrada"));
  pista.focus();
}

function empezarPartida(nuevoModo) {
  modo = nuevoModo;
  seleccion = elegirPreguntas(seleccion);
  ronda = 0;
  puntos = 0;
  errores = [];

  buscar("modo-actual").textContent = textos[idioma][modo];
  inicio.hidden = true;
  final.hidden = true;
  juego.hidden = false;
  mostrarMuestra();
}

function responder(boton) {
  if (juego.hidden || respondida) return;
  respondida = true;

  const muestra = seleccion[ronda];
  const texto = textos[idioma];
  const elegida = boton.dataset.respuesta;
  const acierto = elegida === muestra.respuesta;

  if (acierto) {
    puntos++;
  } else {
    errores.push({ muestra, elegida });
  }

  if (modo === "practica") {
    const mensaje = acierto
      ? texto.correcto
      : texto.incorrecto(texto.opciones[muestra.respuesta]);

    feedback.textContent = `${mensaje} ${muestra.explicacion[idioma]}`;
    feedback.dataset.resultado = acierto ? "correcto" : "error";

    for (const opcion of opciones) {
      if (opcion.dataset.respuesta === muestra.respuesta) {
        opcion.classList.add("correcta");
      }
    }
    if (!acierto) boton.classList.add("incorrecta");
  } else {
    feedback.textContent = texto.registrada(texto.opciones[elegida]);
    boton.classList.add("registrada");
  }

  for (const opcion of opciones) opcion.disabled = true;

  pedirPista.disabled = true;
  progreso.value = ronda + 1;
  siguiente.textContent = ronda + 1 === totalRondas ? texto.verFinal : texto.siguiente;
  siguiente.hidden = false;
  siguiente.focus();
}

function mostrarFinal() {
  const texto = textos[idioma];
  buscar("resumen").textContent = errores.length
    ? texto.resumen(puntos)
    : `${texto.resumen(puntos)}. ${texto.sinErrores}`;

  listaErrores.replaceChildren();

  for (const { muestra, elegida } of errores) {
    const item = document.createElement("li");
    const titulo = document.createElement("strong");
    const respuestas = document.createElement("p");
    const explicacion = document.createElement("p");

    titulo.textContent = muestra.pista[idioma];
    respuestas.textContent =
      `${texto.tuRespuesta}: ${texto.opciones[elegida]}. ` +
      `${texto.respuestaCorrecta}: ${texto.opciones[muestra.respuesta]}.`;
    explicacion.textContent = muestra.explicacion[idioma];

    item.append(titulo, respuestas, explicacion);
    listaErrores.append(item);
  }

  revisar.hidden = errores.length === 0;
  revisar.setAttribute("aria-expanded", "false");
  revisar.textContent = texto.revisar;
  revision.hidden = true;
  juego.hidden = true;
  final.hidden = false;
  buscar("fin-titulo").focus();
}

for (const boton of botonesIdioma) {
  boton.addEventListener("click", () => aplicarIdioma(boton.dataset.idioma));
}

for (const boton of document.querySelectorAll("[data-modo]")) {
  boton.addEventListener("click", () => empezarPartida(boton.dataset.modo));
}

for (const boton of document.querySelectorAll("[data-guia]")) {
  boton.addEventListener("click", () => guia.showModal());
}

for (const boton of opciones) {
  boton.addEventListener("click", () => responder(boton));
}

pedirPista.addEventListener("click", () => {
  const mostrar = textoPista.hidden;
  textoPista.hidden = !mostrar;
  pedirPista.setAttribute("aria-expanded", String(mostrar));
  pedirPista.textContent = mostrar
    ? textos[idioma].ocultarPista
    : textos[idioma].verPista;
});

siguiente.addEventListener("click", () => {
  if (juego.hidden || !respondida) return;

  ronda++;
  if (ronda === totalRondas) {
    mostrarFinal();
  } else {
    mostrarMuestra();
  }
});

revisar.addEventListener("click", () => {
  const mostrar = revision.hidden;
  revision.hidden = !mostrar;
  revisar.setAttribute("aria-expanded", String(mostrar));
  revisar.textContent = mostrar
    ? textos[idioma].ocultarRevision
    : textos[idioma].revisar;
});

buscar("reiniciar").addEventListener("click", () => empezarPartida(modo));

buscar("cambiar-idioma").addEventListener("click", () => {
  final.hidden = true;
  inicio.hidden = false;
  buscar("selector").focus();
});

aplicarIdioma(idioma);