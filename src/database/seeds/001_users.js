exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@mail.com',
          password:
            '$2y$16$6a.oMSzpiU4Fmb535n.bteLU4RDGLdK4FQ5lyvVYgj3uVfXG1/.fu',
        },
        {
          email: 'client@mail.com',
          password:
            '$2y$16$.LP05fPVxOm8w1Jrv38bEu84J/CQYKLYlH2cdFio0dqKv8AGHKx3K',
        },
      ]);
    });
};
