function probarValidarCantidadIntegrantes () {
    console.assert(
        validarCantidadIntegrantes(0) === "Ingrese un número mayor a cero",
        "ValidarCantidadIntegrantes no validó que el campo sea mayor a cero",
    );   
}

probarValidarCantidadIntegrantes();
