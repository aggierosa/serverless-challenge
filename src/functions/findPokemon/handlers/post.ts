import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import CreatePokemon from "../../../model/pokemons/insertPoke";
import { getPoke } from "../components/pokeApi";
import { dbConnection } from "../../../model/database";

export const creating = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;

      const foundPokemon: any = await getPoke(betterPokename);

      const creation = new CreatePokemon(await dbConnection());

      await creation.create(foundPokemon);

      return formatJSONResponse({
        statusCode: 200,
        message: "Created",
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e,
      });
    }
  }
);
