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

function validarFormulario() {
  //Creo un objeto "errores"
  const errores = {};

  $botonSiguiente.onclick = function () {
    //Habilito el botón Siguiente y guardo en una constante la cantidad de integrantes
    //ingresada por el usuario
    $botonSiguiente.disabled = true;
    const cantidadIntegrantes = Number(
      $form.querySelector("#cantidad-integrantes-familia").value
    );

    //Guarda el valor que retorna la función que valida la cantidad
    //de integrantes ingresada 
    const errorCantidadIntegrantes = validarCantidadIntegrantes(cantidadIntegrantes);

    //Si la cantidad de integrantes ingresada es incorrecta:
    //Guardo * el elemento <ul> "errores"
    //Creo un elemento <li> "error" con el texto que hay en "errorCantidadIntegrantes"
    if (errorCantidadIntegrantes) {
      const $errores = $form.querySelector("#errores");
      const $error = document.createElement("li");
      $error.innerText = errorCantidadIntegrantes;
      //Le asigno al elemento <div> (lista de integrantes) la clase error, que
      //bordea en rojo el campo erróneo
      $cantidadIntegrantes.className = "error";
      //Le agrego el elemento <li> "error" a la lista de errores <ul>
      $errores.appendChild($error);
      //Sino
      //Al elemento <div> (lista de integrantes), le asigno la clase vacio.
    } else {
      $cantidadIntegrantes.className = "";
    }

    crearIntegrantes(cantidadIntegrantes);
    mostrarCantidadIntegrantes();
    return false;
  };

  $botonEmpezarDeNuevo.onclick = function () {
    borrarCampos();
    borrarIntegrantes();
    habilitarBotonSiguiente();
    ocultarResultados();
    return false;
  };

  $botonCalcular.onclick = function () {
    //Al hacer click en el botón CALCULAR:
    //Guardo el nodelist con todas las edades ingresadas
    const edadesIntegrantes = $form.querySelectorAll(".edades-integrantes");
    //Valido las edades ingresadas y guardo el mensaje obtenido,
    //en el objeto "errores"
    for(let i = 0; i < edadesIntegrantes.length; i++)  {
      errores.edad = validarEdadesIntegrantes(edadesIntegrantes);
      const esExito = manejarErrores(errores) === 0;
    }
    if (esExito){
      calcular(edadesIntegrantes);
      mostrarResultados(edadesIntegrantes);
    }
  };


}

function manejarErrores (errores) {
  const $errores = document.querySelector('#errores');
  let cuentaErrores = 0;

  const keys = Object.keys(errores);
  keys.forEach(function(key) {
    const error = errores[key];
    
    if (error) {
      $form[key].className = "error";
      const $error = document.createElement('li');
      $error.textContent = error;
      
      $errores.appendChild($error);
      
      cuentaErrores++;

    }else{
      $form[key].className = "";
    }
  });

  return cuentaErrores;
}

function crearIntegrantes(cantidadIntegrantes) {
  for (let i = 0; i < cantidadIntegrantes; i++) {
    const $EdadIntegrante = document.createElement("label");
    $EdadIntegrante.textContent = `Edad del integrante #${i + 1}: `;
    const $edad = document.createElement("input");
    
    $edad.type = "number";
    $edad.id = "edad-integrante";
    $edad.name = "edad";
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

function mostrarEdades(integrante, calculo) {
  $form.querySelector(`#${integrante}`).textContent += `${calculo} años.`;
}

function ocultarResultados() {
  $resultados.className = "oculto";
}

function validarCantidadIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes < 1) {
    return "Ingrese un número mayor a cero";
  }

  return "";
}

function validarEdadesIntegrantes(edadesIntegrantes) {
  
  for (let i = 0; i < edadesIntegrantes.length; i++) {

    if (Number(edadesIntegrantes[i].value) <= 0) {
      return "Edad inválida. Ingrese un número correcto";
    }
  }

  return "";
}

function borrarError() {
  errores.textContent = "";
  $cantidadIntegrantes.className = "";
}

function borrarCampos() {
  $form.querySelector("#mayor-integrante").textContent = "";
  $form.querySelector("#menor-integrante").textContent = "";
  $form.querySelector("#promedio-edades-familia").textContent = "";
}

validarFormulario();
