exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.uuid('code').defaultTo(knex.raw('uuid_generate_v4()')).unique();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
