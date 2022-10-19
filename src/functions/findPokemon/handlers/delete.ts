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

      // const readPoke = new ReadPokemon(await dbConnection());

      // const foundPokemon = await readPoke.readByName(betterPokename);

      // if (foundPokemon.length < 0) {
      //   return formatJSONResponse({
      //     statusCode: 400,
      //     message: "Pokemon does not exist",
      //   });
      // }

      const deletion = new DeletePokemon(await dbConnection());

      // console.log({ deletion });

      const deleted = await deletion.delete(betterPokename);

      console.log({ deleted });

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
