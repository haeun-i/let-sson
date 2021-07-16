export const AuthEmail = email => {
  const emailValidator = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailValidator.test(email);
};

export const AuthPhone = num => {
  const phoneValidator = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;

  return phoneValidator.test(num);
};
