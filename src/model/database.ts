export async function dbConnection() {
  try {
    // const parseAuth = await otrsConnectionDB();

    return require("knex")({
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      },
    });
  } catch (err) {
    console.log("Não foi possível se conectar com o banco de dados:", err);
    return;
  }
}
