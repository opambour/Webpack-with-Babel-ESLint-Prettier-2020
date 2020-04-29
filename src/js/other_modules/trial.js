export const Addition = (a, b) => {
  const validateAandB =
    typeof a === 'number' && typeof b === 'number'; // true or fale

  if (validateAandB) {
    // if true
    return a + b;
  }
  return new Error('a or b must be of number data types');
};
