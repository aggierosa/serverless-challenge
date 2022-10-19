import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import { dbConnection } from "../../../model/connection";
import ReadPokemon from "../../../model/pokemons/readPoke";
import DeletePokemon from "../../../model/pokemons/deletePoke";

export const deleting = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;

      const deletion = new DeletePokemon(await dbConnection());

      const deleted = await deletion.delete(betterPokename);

      if (deleted == 0) {
        return formatJSONResponse({
          statusCode: 500,
          message: "Pokemon not found!",
        });
      }

      return formatJSONResponse({
        statusCode: 200,
        message: "Deleted",
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e,
      });
    }
  }
);
