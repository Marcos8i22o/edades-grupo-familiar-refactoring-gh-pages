/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $botonSiguiente = document.querySelector("#siguiente");
const $botonEmpezarDeNuevo = document.querySelector("#resetear");
const $botonCalcular = document.querySelector("#calcular");
const $listaIntegrantes = document.querySelector("#lista-integrantes");
const $resultados = document.querySelector("#resultados");

function mostrarCantidadIntegrantes() {
  $listaIntegrantes.className = "";
}

function crearIntegrantes(cantidadIntegrantes) {
  for (let i = 0; i < cantidadIntegrantes; i++) {
    const $EdadIntegrante = document.createElement("label");
    const textoLabel = document.createTextNode(
      `Edad del integrante #${i + 1}: `
    );
    const $edad = document.createElement("input");

    $edad.type = "number";
    $edad.id = "edad-integrante";
    $edad.className = "edades-integrantes";

    $EdadIntegrante.appendChild(textoLabel);
    $listaIntegrantes.appendChild($EdadIntegrante);
    $listaIntegrantes.appendChild($edad);
  }
}

function borrarIntegrantes() {
  while ($listaIntegrantes.firstChild) {
    $listaIntegrantes.removeChild($listaIntegrantes.firstChild);
  }
  document.querySelector("#cantidad-integrantes-familia").value = "";
}

function habilitarBotonSiguiente() {
  $botonSiguiente.disabled = false;
}

function mostrarResultados(edadesIntegrantes) {
  $resultados.className = "";

  mostrarEdades("mayor-integrante", calcularMayorEdad(edadesIntegrantes));
  mostrarEdades("menor-integrante", calcularMenorEdad(edadesIntegrantes));
  mostrarEdades(
    "promedio-edades-familia",
    calcularPromedioEdades(edadesIntegrantes)
  );
}

function mostrarEdades(mayorIntegrante, calculo) {
  document.querySelector(
    `#${mayorIntegrante}`
  ).textContent += `${calculo} años.`;
}

function ocultarResultados() {
  $resultados.className = "oculto";
}

$botonSiguiente.onclick = function () {
  $botonSiguiente.disabled = true;
  const cantidadIntegrantes = Number(
    document.querySelector("#cantidad-integrantes-familia").value
  );

  validarCantidadIntegrantes(cantidadIntegrantes);

  crearIntegrantes(cantidadIntegrantes);
  mostrarCantidadIntegrantes();
  return false;
};

$botonEmpezarDeNuevo.onclick = function () {
  borrarIntegrantes();
  habilitarBotonSiguiente();
  ocultarResultados();
  return false;
};

$botonCalcular.onclick = function () {
  const edadesIntegrantes = document.querySelectorAll(".edades-integrantes");

  calcular(edadesIntegrantes);
  mostrarResultados(edadesIntegrantes);
};

function validarCantidadIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes < 1) {
    return "Ingrese un número mayor a cero";
  }

  return "";
}
