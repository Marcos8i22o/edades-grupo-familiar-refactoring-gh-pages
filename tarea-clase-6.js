/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $form = document.querySelector("#edades-grupo-familiar");
const $botonSiguiente = $form.querySelector("#siguiente");
const $botonEmpezarDeNuevo = $form.querySelector("#resetear");
const $botonCalcular = $form.querySelector("#calcular");
const $listaIntegrantes = $form.querySelector("#lista-integrantes");
const $resultados = $form.querySelector("#resultados");
const $cantidadIntegrantes = $form.querySelector(
  "#cantidad-integrantes-familia"
);

function mostrarCantidadIntegrantes() {
  $listaIntegrantes.className = "";
}

function crearIntegrantes(cantidadIntegrantes) {
  for (let i = 0; i < cantidadIntegrantes; i++) {
    const integrante = {
      edad: {
        tag: document.createElement("input"),
      },
    };
    integrante.edad.tag.setAttribute("type", "number");
    integrante.edad.tag.setAttribute("id", "edad-integrante");
    integrante.edad.tag.setAttribute("class", "edades-integrantes");

    const $EdadIntegrante = document.createElement("label");
    const textoLabel = document.createTextNode(
      `Edad del integrante #${i + 1}: `
    );

    $EdadIntegrante.appendChild(textoLabel);
    $listaIntegrantes.appendChild($EdadIntegrante);
    $listaIntegrantes.appendChild(integrante.edad.tag);
  }
}

function borrarIntegrantes() {
  while ($listaIntegrantes.firstChild) {
    $listaIntegrantes.removeChild($listaIntegrantes.firstChild);
  }
  $cantidadIntegrantes.value = "";
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
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);

  const errores = {
    errorCantidadIntegrantes: validarCantidadIntegrantes(cantidadIntegrantes),
  };

  if (errores.errorCantidadIntegrantes) {
    const $errores = document.querySelector("#errores");
    const $error = document.createElement("li");
    $error.innerText = errores.errorCantidadIntegrantes;

    $cantidadIntegrantes.className = "error";
    $errores.appendChild($error);
  } else {
    $cantidadIntegrantes.className = "";
  }

  crearIntegrantes(cantidadIntegrantes);
  mostrarCantidadIntegrantes();
  return false;
};

$botonEmpezarDeNuevo.onclick = function () {
  $cantidadIntegrantes.className = "";
  errores.innerText = "";
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

function validarEdadIntegrante() {}
