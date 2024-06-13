/**
 * Calcula el precio total de nuestras ordenesm
 * @param {array} products cartProduct: Array de objetos
 * @returns {number} suma de los precios totales del cart
 */
export const totalPrice = (products) => {
  let sum = 0;
  products.forEach((product) => (sum += product.price * product.quantity));
  return sum;
};
