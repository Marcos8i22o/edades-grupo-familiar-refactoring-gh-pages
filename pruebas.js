function probarValidarCantidadIntegrantes() {
  console.assert(
    validarCantidadIntegrantes(2) === "",
    "ValidarCantidadIntegrantes no validó un ingreso correcto"
  );

  console.assert(
    validarCantidadIntegrantes(0) === "Ingrese un número mayor a cero",
    "ValidarCantidadIntegrantes no validó que el campo sea mayor a cero"
  );
}

function probarValidarEdadesIntegrantes() {
  // console.assert(
  //   validarEdadesIntegrantes([{value:1},{value:2}]) === "",
  //   "ValidarEdadesIntegrantes no validó una edad correcta"
  // );

  console.assert(
    validarEdadesIntegrantes([{value:1},{value:-2}]) === "Edad inválida. Ingrese un número correcto",
    "ValidarEdadesIntegrantes no validó que la edad ingresada sea mayor a cero"
  );
}

probarValidarCantidadIntegrantes();
probarValidarEdadesIntegrantes();
