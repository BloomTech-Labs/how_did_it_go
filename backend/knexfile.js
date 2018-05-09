// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './database/howdItGodb.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'howdItGomigrations',
    },
    seeds: { directory: './database/seeds' },
    debug: true,
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'howdItGomigrations',
    },
    seeds: { directory: './database/seeds' },
  }
};
