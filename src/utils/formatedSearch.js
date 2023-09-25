export const formaterUserName = (texto = "") => {
  // Divide el texto en dos partes: el número de RUC y el texto restante
  const partes = texto.split(" ");

  // Verifica si la primera parte es un número de RUC válido
  const ruc = partes[0];
  const esRucValido = /^\d{11}$/.test(ruc);

  // Si es un RUC válido, entonces el texto restante es el nombre
  if (esRucValido) {
    return partes.slice(1).join(" ");
  }

  // Si no es un RUC válido, entonces el texto completo es el nombre
  return texto;
};
