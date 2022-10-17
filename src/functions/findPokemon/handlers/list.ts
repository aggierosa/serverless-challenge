import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ReadPokemon from "../../../model/pokemons/readPoke";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import { dbConnection } from "../../../model/connection";

export const getting = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const readPoke = new ReadPokemon(await dbConnection());

      const foundPokemons = await readPoke.readAll();

      return formatJSONResponse({
        statusCode: 200,
        message: foundPokemons,
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e,
      });
    }
  }
);
