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
  const edadesInvalidas = validarEdadesIntegrantes([
    { value: 1 },
    { value: -2 },
  ]);
  console.assert(
    edadesInvalidas.length === 1,
    "validarEdadesIntegrantes debería haber detectado una única edad inválida"
  );
  const edadInvalida = edadesInvalidas[0];
  console.assert(
    edadInvalida.error === "Edad inválida. Ingrese un número correcto",
    "validarEdadesIntegrantes no dio el error esperado"
  );
  console.assert(
    edadInvalida.integrante === 1,
    "validarEdadesIntegrantes no dio error en el integrante esperado"
  );
}

probarValidarCantidadIntegrantes();
probarValidarEdadesIntegrantes();
