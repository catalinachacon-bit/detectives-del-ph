// Pega aquí tu enlace de Google Forms para responder.
const enlaceFormulario = "";

const totalRondas = 6;
const categorias = ["acida", "neutra", "basica"];

const textos = {
  es: {
    titulo: "Detectives del pH",
    idioma: "Elige tu idioma",
    intro: "Clasifica seis soluciones acuosas a 25 °C. Elige un modo para empezar.",
    practica: "Práctica",
    detallePractica: "Pide pistas y recibe explicaciones al responder.",
    reto: "Reto",
    detalleReto: "Resuelve las muestras sin pistas y revisa tus errores al final.",
    guia: "Guía rápida",
    guiaPh: "Para clasificar una solución acuosa a 25 °C, compara su pH con 7.",
    escalaAcida: "Menor que 7 · Ácida",
    escalaNeutra: "Igual a 7 · Neutra",
    escalaBasica: "Mayor que 7 · Básica",
    guiaTornasol: "El tornasol azul cambia a rojo en un ácido. El rojo cambia a azul en una base. Si una tira conserva su color, usa otra pista para confirmar.",
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
    encuesta: "Evalúa el juego",
    salir: "Salir",
    avisoSalida: "Si sales ahora, perderás este reto.",
    seguir: "Seguir jugando",
    salirReto: "Salir del reto",
    perdido: "Reto perdido",
    intentoTerminado: "Este intento terminó.",
    menu: "Volver al menú"
  },
  en: {
    titulo: "pH Detectives",
    idioma: "Choose your language",
    intro: "Classify six aqueous solutions at 25 °C. Choose a mode to get started.",
    practica: "Practice",
    detallePractica: "Ask for hints and get explanations after answering.",
    reto: "Challenge",
    detalleReto: "Solve the samples without hints and review your mistakes at the end.",
    guia: "Quick guide",
    guiaPh: "To classify an aqueous solution at 25 °C, compare its pH with 7.",
    escalaAcida: "Below 7 · Acidic",
    escalaNeutra: "Equal to 7 · Neutral",
    escalaBasica: "Above 7 · Basic",
    guiaTornasol: "Blue litmus turns red in an acid. Red litmus turns blue in a base. If a strip keeps its color, use another clue to confirm.",
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
    encuesta: "Rate the game",
    salir: "Exit",
    avisoSalida: "If you exit now, you will lose this challenge.",
    seguir: "Keep playing",
    salirReto: "Exit challenge",
    perdido: "Challenge lost",
    intentoTerminado: "This attempt has ended.",
    menu: "Back to menu"
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
    es: "Fíjate en el color inicial de la tira y recuerda qué significa el cambio.",
    en: "Look at the strip's starting color and recall what that change means."
  },
  ambas: {
    es: "Compara el pH con 7 y verifica qué información añade el tornasol.",
    en: "Compare the pH with 7 and check what information the litmus paper adds."
  },
  calculo: {
    es: "Encuentra primero el pH que describe la pista. Luego compáralo con 7.",
    en: "Work out the pH described in the clue. Then compare it with 7."
  }
};

function preguntaDeMedidor(lectura, respuesta) {
  return {
    respuesta,
    lectura,
    pista: {
      es: `El medidor indica pH ${lectura.toLocaleString("es-CO")}.`,
      en: `The meter reads pH ${lectura.toLocaleString("en-US")}.`
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
    explicacion: reglas.tornasolAcido,
    tiras: [["azul", "rojo"]],
    ayuda: "tornasol"
  },
  {
    respuesta: "acida",
    lectura: 4,
    pista: {
      es: "El medidor marca pH 4 y el tornasol azul cambia a rojo.",
      en: "The meter reads pH 4, and blue litmus paper turns red."
    },
    explicacion: {
      es: "El pH está por debajo de 7 y la tira azul se vuelve roja. Ambas pistas indican acidez.",
      en: "The pH is below 7, and the blue strip turns red. Both clues indicate acidity."
    },
    tiras: [["azul", "rojo"]],
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
    explicacion: reglas.neutra,
    tiras: [["azul", "azul"], ["rojo", "rojo"]],
    ayuda: "ambas"
  },
  {
    respuesta: "neutra",
    lectura: 7,
    pista: {
      es: "Una muestra pasa de pH 4 a pH 7. Clasifícala al final.",
      en: "A sample changes from pH 4 to pH 7. Classify it at the end."
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
    explicacion: {
      es: "El pH final de 7 confirma la neutralidad. El tornasol rojo también puede quedarse rojo en un ácido.",
      en: "The final pH of 7 confirms neutrality. Red litmus can also stay red in an acid."
    },
    tiras: [["rojo", "rojo"]],
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
      es: "El tornasol azul sigue azul. El pH está a mitad de camino entre 6 y 8.",
      en: "Blue litmus stays blue. The pH is halfway between 6 and 8."
    },
    explicacion: {
      es: "El valor intermedio es 7. A 25 °C, ese pH confirma la neutralidad.",
      en: "The midpoint is 7. At 25 °C, that pH confirms neutrality."
    },
    tiras: [["azul", "azul"]],
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
    explicacion: reglas.tornasolBasico,
    tiras: [["rojo", "azul"]],
    ayuda: "tornasol"
  },
  {
    respuesta: "basica",
    lectura: 11,
    pista: {
      es: "El medidor marca pH 11 y el tornasol rojo cambia a azul.",
      en: "The meter reads pH 11, and red litmus paper turns blue."
    },
    explicacion: {
      es: "El pH supera 7 y la tira roja se vuelve azul. Ambas pistas indican una base.",
      en: "The pH is above 7, and the red strip turns blue. Both clues indicate a base."
    },
    tiras: [["rojo", "azul"]],
    ayuda: "ambas"
  },
  {
    respuesta: "basica",
    lectura: 8,
    pista: {
      es: "Una muestra pasa de pH 6 a pH 8. Clasifícala al final.",
      en: "A sample changes from pH 6 to pH 8. Classify it at the end."
    },
    explicacion: {
      es: "El pH final es 8. Como supera 7 a 25 °C, la solución queda básica.",
      en: "The final pH is 8. Since it is above 7 at 25 °C, the solution is now basic."
    },
    ayuda: "ph"
  }
];

const buscar = (id) => document.getElementById(id);
const pantallas = ["inicio", "juego", "final", "perdido"];
const opciones = document.querySelectorAll("[data-respuesta]");
const botonesIdioma = document.querySelectorAll("[data-idioma]");
const selectorIdioma = buscar("idioma-partida");
const confirmarSalida = buscar("confirmar-salida");
const ficha = buscar("ficha");
const pista = buscar("pista");
const progreso = buscar("progreso");
const tornasol = buscar("tornasol");
const feedback = buscar("feedback");
const siguiente = buscar("siguiente");
const pedirPista = buscar("pedir-pista");
const textoPista = buscar("texto-pista");
const revisar = buscar("revisar");
const revision = buscar("revision");
const encuesta = buscar("encuesta");

let pantalla = "inicio";
let idioma = "es";
let modo = "practica";
let seleccion = [];
let ronda = 0;
let puntos = 0;
let respuestaElegida = null;
let pistaVisible = false;
let errores = [];

if (enlaceFormulario.trim()) {
  encuesta.href = enlaceFormulario.trim();
  encuesta.hidden = false;
}

function mostrarPantalla(nombre, foco) {
  pantalla = nombre;
  for (const id of pantallas) buscar(id).hidden = id !== nombre;
  buscar(foco).focus();
}

function aplicarIdioma(nuevoIdioma) {
  idioma = nuevoIdioma;
  const texto = textos[idioma];

  document.documentElement.lang = idioma;
  document.title = texto.titulo;
  selectorIdioma.value = idioma;

  for (const elemento of document.querySelectorAll("[data-texto]")) {
    elemento.textContent = texto[elemento.dataset.texto];
  }

  for (const boton of botonesIdioma) {
    boton.setAttribute("aria-pressed", String(boton.dataset.idioma === idioma));
  }

  for (const boton of opciones) {
    boton.textContent = texto.opciones[boton.dataset.respuesta];
  }

  // Actualiza la pregunta actual sin iniciar otra ronda.
  if (pantalla === "juego") renderizarMuestra();
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
  const rotulo = document.createElement("span");
  rotulo.className = "lectura";
  rotulo.textContent = `${etiqueta}: ${textos[idioma].colores[color]}`;

  const tira = document.createElement("span");
  tira.className = `tira ${color}`;
  tira.setAttribute("aria-hidden", "true");
  rotulo.append(tira);

  return rotulo;
}

function mostrarTiras(tiras) {
  const texto = textos[idioma];
  tornasol.replaceChildren();
  tornasol.hidden = tiras.length === 0;

  for (const [antes, despues] of tiras) {
    const fila = document.createElement("div");
    fila.className = "comparacion";

    const flecha = document.createElement("span");
    flecha.textContent = "→";
    flecha.setAttribute("aria-hidden", "true");

    fila.append(
      crearTira(texto.antes, antes),
      flecha,
      crearTira(texto.despues, despues)
    );
    tornasol.append(fila);
  }
}

function renderizarRespuesta(muestra, texto) {
  const respondida = respuestaElegida !== null;
  const acierto = respuestaElegida === muestra.respuesta;

  delete feedback.dataset.resultado;

  for (const boton of opciones) {
    const categoria = boton.dataset.respuesta;
    const elegido = categoria === respuestaElegida;
    boton.disabled = respondida;
    boton.classList.toggle(
      "correcta", respondida && modo === "practica" && categoria === muestra.respuesta
    );
    boton.classList.toggle("incorrecta", elegido && modo === "practica" && !acierto);
    boton.classList.toggle("registrada", elegido && modo === "reto");
  }

  if (!respondida) {
    feedback.textContent = "";
  } else if (modo === "reto") {
    feedback.textContent = texto.registrada(texto.opciones[respuestaElegida]);
  } else {
    const mensaje = acierto
      ? texto.correcto
      : texto.incorrecto(texto.opciones[muestra.respuesta]);

    feedback.dataset.resultado = acierto ? "correcto" : "error";
    feedback.textContent = `${mensaje} ${muestra.explicacion[idioma]}`;
  }

  siguiente.textContent = ronda + 1 === totalRondas ? texto.verFinal : texto.siguiente;
  siguiente.hidden = !respondida;
}

function renderizarMuestra() {
  const muestra = seleccion[ronda];
  const texto = textos[idioma];

  buscar("modo-actual").textContent = texto[modo];
  buscar("contador").textContent = texto.muestra(ronda + 1);
  progreso.value = ronda + Number(respuestaElegida !== null);
  pista.textContent = muestra.pista[idioma];

  buscar("medidor").hidden = muestra.lectura === undefined;
  buscar("lectura").textContent = muestra.lectura?.toLocaleString(
    idioma === "es" ? "es-CO" : "en-US"
  ) ?? "";
  mostrarTiras(muestra.tiras ?? []);

  buscar("ayudas").hidden = modo !== "practica";
  pedirPista.disabled = respuestaElegida !== null;
  pedirPista.textContent = pistaVisible ? texto.ocultarPista : texto.verPista;
  pedirPista.setAttribute("aria-expanded", String(pistaVisible));
  textoPista.textContent = pistasDeAyuda[muestra.ayuda][idioma];
  textoPista.hidden = !pistaVisible;

  renderizarRespuesta(muestra, texto);
}

function abrirRonda() {
  respuestaElegida = null;
  pistaVisible = false;
  renderizarMuestra();

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

  mostrarPantalla("juego", "idioma-partida");
  abrirRonda();
}

function responder(categoria) {
  if (pantalla !== "juego" || respuestaElegida !== null) return;

  respuestaElegida = categoria;
  const muestra = seleccion[ronda];

  if (categoria === muestra.respuesta) {
    puntos++;
  } else {
    errores.push({ muestra, elegida: categoria });
  }

  progreso.value = ronda + 1;
  pedirPista.disabled = true;
  renderizarRespuesta(muestra, textos[idioma]);
  siguiente.focus();
}

function mostrarFinal() {
  const texto = textos[idioma];
  const lista = buscar("errores");

  buscar("resumen").textContent = errores.length
    ? texto.resumen(puntos)
    : `${texto.resumen(puntos)}. ${texto.sinErrores}`;

  lista.replaceChildren();

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
    lista.append(item);
  }

  revisar.hidden = errores.length === 0;
  revisar.textContent = texto.revisar;
  revisar.setAttribute("aria-expanded", "false");
  revision.hidden = true;
  mostrarPantalla("final", "titulo-final");
}

function volverAlMenu() {
  mostrarPantalla("inicio", "titulo-inicio");
}

for (const boton of botonesIdioma) {
  boton.addEventListener("click", () => aplicarIdioma(boton.dataset.idioma));
}

selectorIdioma.addEventListener("change", () => aplicarIdioma(selectorIdioma.value));

for (const boton of document.querySelectorAll("[data-modo]")) {
  boton.addEventListener("click", () => empezarPartida(boton.dataset.modo));
}

for (const boton of document.querySelectorAll("[data-guia]")) {
  boton.addEventListener("click", () => buscar("guia").showModal());
}

for (const boton of opciones) {
  boton.addEventListener("click", () => responder(boton.dataset.respuesta));
}

pedirPista.addEventListener("click", () => {
  pistaVisible = !pistaVisible;
  textoPista.hidden = !pistaVisible;
  pedirPista.setAttribute("aria-expanded", String(pistaVisible));
  pedirPista.textContent = pistaVisible
    ? textos[idioma].ocultarPista
    : textos[idioma].verPista;
});

siguiente.addEventListener("click", () => {
  if (pantalla !== "juego" || respuestaElegida === null) return;

  ronda++;
  if (ronda === totalRondas) {
    mostrarFinal();
  } else {
    abrirRonda();
  }
});

revisar.addEventListener("click", () => {
  const abrir = revision.hidden;
  revision.hidden = !abrir;
  revisar.setAttribute("aria-expanded", String(abrir));
  revisar.textContent = abrir ? textos[idioma].ocultarRevision : textos[idioma].revisar;
});

buscar("salir").addEventListener("click", () => {
  if (modo === "practica") {
    volverAlMenu();
    return;
  }

  confirmarSalida.returnValue = "seguir";
  confirmarSalida.showModal();
  buscar("seguir").focus();
});

// Esc y «Seguir jugando» cierran el aviso y conservan el intento.
confirmarSalida.addEventListener("close", () => {
  if (confirmarSalida.returnValue === "salir") {
    mostrarPantalla("perdido", "titulo-perdido");
  } else {
    buscar("salir").focus();
  }
});

buscar("reiniciar").addEventListener("click", () => empezarPartida(modo));
buscar("cambiar-idioma").addEventListener("click", volverAlMenu);
buscar("volver").addEventListener("click", volverAlMenu);

aplicarIdioma(idioma);