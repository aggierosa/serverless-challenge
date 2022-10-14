import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import CreatePokemon from "../../../model/pokemons/insertPoke";
import { getPoke } from "./pokeApi";
import { dbConnection } from "../../../model/database";

export const creating = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;
      console.log(betterPokename);
      const foundPokemon: any = await getPoke(betterPokename);

      if (!foundPokemon) {
        throw new Error("Ooops! I couldn't find what you're looking for :(");
      }

      const creation = new CreatePokemon(await dbConnection());

      console.log(creation);

      await creation.create(foundPokemon);

      return formatJSONResponse({
        status: 200,
        message: "Created",
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
