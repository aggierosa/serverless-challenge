import { otrsConnectionDB } from "../shared/secrets";

export async function dbConnection() {
  try {
    const parseAuth = await otrsConnectionDB();

    return require("knex")({
      client: "mysql",
      connection: {
        host: parseAuth.host,
        user: parseAuth.username,
        password: parseAuth.password,
        database: parseAuth.dbname,
        port: parseAuth.port,
      },
    });
  } catch (err) {
    console.log("Não foi possível se conectar com o banco de dados:", err);
    return;
  }
}
