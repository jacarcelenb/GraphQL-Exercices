const isAvailable = (estado) => {
  let opcion = "Inactivo";
  if (estado) {
    opcion = "Activo";
  }
  return opcion;
};


export { isAvailable };
