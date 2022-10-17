require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },

  testing: {
    client: "pg",
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },
};
