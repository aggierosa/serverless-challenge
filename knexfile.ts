require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "serverless",
      user: "Win10",
      password: "agnes1ana2",
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },

  testing: {
    client: "pg",
    connection: {
      database: "serverless",
      user: "Win10",
      password: "agnes1ana2",
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      database: "serverless",
      user: "Win10",
      password: "agnes1ana2",
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: { directory: "./src/seeds" },
  },
};
