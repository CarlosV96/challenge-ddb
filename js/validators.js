/* Las validaciones desde js se generan como alternativa en caso de no realizarlas en el html */

const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

/* Validación de expresion regular */
const expressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  numberDoc: /^\d{3,14}$/,
  phone: /^\d{7,14}$/,
};

/* Validación que todos los campos estén completos y funcionales*/
const fields = {
  name: false,
  email: false,
  numberDoc: false,
  phone: false,
};

/* Validación del formulario, que se cumplan las expresiones regulares */
const validateForm = (e) => {
  switch (e.target.name) {
    case "name":
      validateField(expressions.name, e.target.value, "name");
      break;
    case "email":
      validateField(expressions.email, e.target.value, "email");
      break;
    case "numberDoc":
      validateField(expressions.numberDoc, e.target.value, "numberDoc");
      break;
    case "phone":
      validateField(expressions.phone, e.target.value, "phone");
      break;
  }
};

/* Validación de información de campos anexa y remueve cietas clases
las cuales muestran que existe un error*/
const validateField = (expression, input, field) => {
  if (expression.test(input)) {
    document.getElementById(`${field}`).classList.remove("incorrect");
    document
      .getElementById(`validator-${field}`)
      .classList.remove(`text-error-active`);
    fields[field] = true;
  } else {
    document.getElementById(`${field}`).classList.add("incorrect");
    document
      .getElementById(`validator-${field}`)
      .classList.add("text-error-active");
  }
};

/* Identifica si hay movimiento dentro o fuera de los campos del formulario */
inputs.forEach((input) => {
  input.addEventListener("keyup", validateForm);
  input.addEventListener("blur", validateForm);
});

/* Escucha el evento de envío del formulario
Ejecuta ciertas condiciones para permitir el envío y vaciado de campos */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const conditions = document.getElementById("conditions");
  if (
    fields.name &&
    fields.email &&
    fields.numberDoc &&
    fields.phone &&
    conditions.checked
  ) {
    Swal.fire({
      icon: "success",
      title: "¡Suscripción exitosa!",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Algo salió mal!",
      footer: "!Verifica todos los campos!",
    });
  }
});
