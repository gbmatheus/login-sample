// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '172.18.0.2',
      port: '5432',
      user: 'postgres',
      password: 'senha123',
      database: 'login_sample',
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
