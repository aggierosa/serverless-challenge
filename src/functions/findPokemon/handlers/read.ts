import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ReadPokemon from "../../../model/pokemons/readPoke";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import { dbConnection } from "../../../model/connection";

export const getting = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;

      const readPoke = new ReadPokemon(await dbConnection());

      const foundPokemon = await readPoke.readByName(betterPokename);

      return formatJSONResponse({
        statusCode: 200,
        message: foundPokemon,
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e,
      });
    }
  }
);
