import { otrsConnectionDB } from "../shared/secrets";

export async function dbConnection() {
  try {
    // const parseAuth = await otrsConnectionDB();

    return require("knex")({
      client: "pg",
      connection: {
        host: "localhost",
        user: "Win10",
        password: "agnes1ana2",
        database: "serverless",
        port: 5432,
      },
    });
  } catch (err) {
    console.log("Não foi possível se conectar com o banco de dados:", err);
    return;
  }
}
