import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../../libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import CreatePokemon from "../../../model/pokemons/insertPoke";
import { getPoke } from "../components/pokeApi";
import { dbConnection } from "../../../model/connection";
import ReadPokemon from "../../../model/pokemons/readPoke";

export const creating = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const pokename: any = event.pathParameters;

      const betterPokename = pokename.name;

      const pokemonData: any = await getPoke(betterPokename);

      // ERRO aqui ----

      // const parseBody = JSON.parse(foundPokemon.body).status;

      // if (parseBody == 500) {
      //   return formatJSONResponse({
      //     statusCode: 500,
      //     message: "Pokemon does not exist!",
      //   });
      // }

      // ----------

      const readPoke = new ReadPokemon(await dbConnection());

      const existentPokemon = await readPoke.readByName(betterPokename);

      if (existentPokemon.length > 0) {
        return formatJSONResponse({
          statusCode: 400,
          message: "Pokemon already exists on Database",
        });
      }

      const creation = new CreatePokemon(await dbConnection());

      await creation.create(pokemonData);

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
