export const generateUniqueID = () => {
  const unique = Date.now().toString(32);
  const random = Math.random().toString(32).slice(2);
  return unique + random;
};
