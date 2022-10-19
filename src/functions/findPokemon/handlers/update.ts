import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import { dbConnection } from "../../../model/connection";
import UpdatePokemon from "../../../model/pokemons/updtadePoke";

export const updating = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;

      const body: any = event.body;

      const updatePoke = new UpdatePokemon(await dbConnection());

      const updatedPokemon = await updatePoke.update(betterPokename, body);

      return formatJSONResponse({
        statusCode: 200,
        message: updatedPokemon,
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e,
      });
    }
  }
);
