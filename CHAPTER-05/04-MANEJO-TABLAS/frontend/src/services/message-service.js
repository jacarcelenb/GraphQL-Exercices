import Swal from "sweetalert2";

const showMessage = (mensaje, tipo) => {
  Swal.fire({
    text: mensaje,
    icon: tipo,
  });
};

const showConfirmMessage = (mensaje) => {
  return Swal.fire({
    title: mensaje,
    text: "No podrá revertir esta acción !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si ",
    cancelButtonText: "No ",
    confirmButtonColor:"green",
    cancelButtonColor:"red"
  });
};

export { showMessage, showConfirmMessage };
