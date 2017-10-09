exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('user_type').del()
    .then(() => {
      // Inserts seed entries
      return knex('user_type').insert([
        {
          id: 1,
          title: 'admin',
          description: 'admin restaurant',
          icon: 'A',
          read: true,
          write: true
        },
        {
          id: 2,
          title: 'cajero',
          description: 'cajero restaurant',
          icon: 'Ca',
          read: true,
          write: true
        },
        {
          id: 3,
          title: 'chef',
          description: 'chef restaurant',
          icon: 'Ch',
          read: true,
          write: true
        }
      ])
    })
}
