import { formatJSONResponse } from "../libs/api-gateway";
import * as dotenv from "dotenv";

export async function dbConnection() {
  try {
    dotenv.config();

    const connectionDB = require("knex")({
      client: "postgresql",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
      },
    });

    return connectionDB;
  } catch (err) {
    console.log("Não foi possível se conectar com o banco de dados:", err);
    return formatJSONResponse({
      statusCode: 500,
      message: "bosta",
    });
  }
}
