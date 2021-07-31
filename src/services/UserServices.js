const knex = require('../database/knex');

exports.findAll = async function () {
  const users = await knex('users');
  return users;
};

exports.findOne = async function (code) {
  const verifyCode =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i;

  if (!verifyCode.test(code)) {
    throw new Error('Code invalid');
  }

  const [user] = await knex('users').where({
    code: code,
  });

  if (!user.code) throw new Error('User not found');
  return user;
};

exports.findByEmail = async function (email) {
  const user = await knex('users').where({
    email: email,
  });
  return user;
};

exports.save = async function (user) {
  const [savedUser] = await knex('users')
    .insert(user)
    .returning(['email', 'code']);
  return savedUser;
};

exports.update = async function (user) {
  const { code, password } = user;
  const [updatedUser] = await knex('users')
    .where({ code: code })
    .update({ password })
    .returning(['code', 'email']);
  return updatedUser;
};

exports.remove = async function (code) {
  await knex('users').where({ code: code }).del();
};
