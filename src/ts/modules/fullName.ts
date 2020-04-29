export const FullName = (firstName: String, lastName: String, middleName?: String): String => {
  if (middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
};
