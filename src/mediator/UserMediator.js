const { getUserByEmail, saveUser } = require('../services/UserServices');

// TODO: Criptografar a senha com bcrypt

exports.CreateUser = async function ({ email, password }) {
  const userExist = await getUserByEmail(email);

  if (userExist) {
    throw new Error('Email is already in use');
  }

  const user = await saveUser({ email, password });

  return user;
};
