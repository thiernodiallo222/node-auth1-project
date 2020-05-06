
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'username-one', password: 'password-One'},
        { username: 'username-two', password: 'password-Two'},
        { username: 'username-tree', password: 'password-Three'}
      ]);
    });
};
