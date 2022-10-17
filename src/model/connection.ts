import { formatJSONResponse } from "../libs/api-gateway";
import * as dotenv from "dotenv";

export async function dbConnection() {
  try {
    dotenv.config();
    console.log("daishdiughdua12131341444");
    const connectionDB = require("knex")({
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
      },
    });

    console.log("daishdiughdua");

    return connectionDB;
  } catch (err) {
    console.log("Não foi possível se conectar com o banco de dados:", err);
    return formatJSONResponse({
      statusCode: 500,
      message: "bosta",
    });
  }
}
