// todo: Criar teste para rotas
// todo:    Post, Get, Put, Delete
// * Estrutura do teste
// * given - dado que
// * when - quando acontecer
// * then - então

// * tratar o status code

const axios = require('axios');
const crypto = require('crypto');

const { findAll, save, remove } = require('../../src/services/UserServices');

const generate = function () {
  return crypto.randomBytes(20).toString('hex');
};

test('Should returns all users', async function () {
  const response = await axios({
    url: 'http://localhost:3000/users',
    method: 'get',
  });
  const { users } = response.data;

  expect(response.status).toBe(200);

  const [admin, client] = users;
  expect(admin.id).toBe(1);
  expect(admin.email).toBe('admin@mail.com');

  expect(client.id).toBe(2);
  expect(client.email).toBe('client@mail.com');
});

test('Should return a user by code', async function () {
  const [admin, client] = await findAll();

  const response = await axios({
    url: `http://localhost:3000/users/${admin.code}`,
    method: 'get',
  });

  const { user } = response.data;

  expect(admin.code).toBe(user.code);
});

test('Should create a users', async function () {
  const data = { email: generate(), password: generate() };

  const response = await axios({
    url: 'http://localhost:3000/users',
    method: 'post',
    data: data,
  });

  const { user } = response.data;

  expect(user.email).toBe(data.email);

  await remove(user.code);
});

test('Should update a user', async function () {
  const userData = await save({ email: generate(), password: generate() });
  const data = { password: generate() };

  const response = await axios({
    url: `http://localhost:3000/users/${userData.code}`,
    method: 'put',
    data: data,
  });

  const { user } = response.data;

  expect(user.email).toBe(userData.email);

  await remove(user.code);
});

test('Should delete a user', async function () {
  const userData = await save({ email: generate(), password: generate() });
  const data = { password: generate() };

  const response = await axios({
    url: `http://localhost:3000/users/${userData.code}`,
    method: 'delete',
    data: data,
  });

  expect(response.status).toEqual(204);
});
