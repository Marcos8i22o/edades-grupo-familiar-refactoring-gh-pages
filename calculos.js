function calcular(edadesIntegrantes) {
  calcularMenorEdad(edadesIntegrantes);
  calcularMayorEdad(edadesIntegrantes);
  calcularPromedioEdades(edadesIntegrantes);
}

function calcularMenorEdad(edadesIntegrantes) {
  let min;
  for (let i = 0; i < edadesIntegrantes.length; i++) {
    if (!min || Number(edadesIntegrantes[i].value) < min) {
      min = Number(edadesIntegrantes[i].value);
    }
  }
  return min;
}

function calcularMayorEdad(edadesIntegrantes) {
  let max = Number(edadesIntegrantes[0].value);
  for (let i = 1; i < edadesIntegrantes.length; i++) {
    if (Number(edadesIntegrantes[i].value) > max) {
      max = Number(edadesIntegrantes[i].value);
    }
  }
  return max;
}

function calcularPromedioEdades(edadesIntegrantes) {
    let suma = 0;
    for (let i = 0; i < edadesIntegrantes.length; i++) {
        suma += Number(edadesIntegrantes[i].value);
    }
    return suma / edadesIntegrantes.length;
}
