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
    const $EdadIntegrante = document.createElement("label");
    $EdadIntegrante.textContent = `Edad del integrante #${i + 1}: `;
    const $edad = document.createElement("input");

    $edad.type = "number";
    $edad.id = "edad-integrante";
    $edad.className = "edades-integrantes";

    $listaIntegrantes.appendChild($EdadIntegrante);
    $listaIntegrantes.appendChild($edad);
  }
}

function borrarIntegrantes() {
  while ($listaIntegrantes.firstChild) {
    $listaIntegrantes.removeChild($listaIntegrantes.firstChild);
  }
  $form.querySelector("#cantidad-integrantes-familia").value = "";
  borrarError();
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
  $form.querySelector(`#${mayorIntegrante}`).textContent += `${calculo} años.`;
}

function ocultarResultados() {
  $resultados.className = "oculto";
}

$botonSiguiente.onclick = function () {
  $botonSiguiente.disabled = true;
  const cantidadIntegrantes = Number(
    $form.querySelector("#cantidad-integrantes-familia").value
  );

  const errores = {
    errorCantidadIntegrantes: validarCantidadIntegrantes(cantidadIntegrantes),
  };

  validarCantidadIntegrantes(cantidadIntegrantes);

  if (errores.errorCantidadIntegrantes) {
    const $errores = $form.querySelector("#errores");
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
  borrarIntegrantes();
  habilitarBotonSiguiente();
  ocultarResultados();
  return false;
};

$botonCalcular.onclick = function () {
  const edadesIntegrantes = $form.querySelectorAll(".edades-integrantes");
  validarEdadesIntegrantes(edadesIntegrantes);  
  calcular(edadesIntegrantes);
  mostrarResultados(edadesIntegrantes);
};

function validarCantidadIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes < 1) {
    return "Ingrese un número mayor a cero";
  }

  return "";
}

function validarEdadesIntegrantes(edadesIntegrantes) {
  const edadesIntegrantesValidas = [];
  console.log(edadesIntegrantes)
  edadesIntegrantes.forEach(function(edad) {
    if (Number(edad.value) <= 0) {
      return "Edad inválida. Ingrese un número correcto";
    } else {
      edadesIntegrantesValidas.push(Number(edad.value));
    }
  });

  return edadesIntegrantesValidas;
}

function borrarError() {
  errores.textContent = "";
  $cantidadIntegrantes.className = "";
}

