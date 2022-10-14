import axios from "axios";
import { formatJSONResponse } from "../../../libs/api-gateway";

type Pokemon = {
  name: string;
  order: number;
};

export const getPoke = async (betterPokename: string) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${betterPokename}`
    );

    const fixedData: Pokemon = {
      name: data.name,
      order: data.order,
    };

    return fixedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return formatJSONResponse({
        status: 500,
        message: error.message,
      });
    } else {
      return formatJSONResponse({
        status: 500,
        message: error.message,
      });
    }
  }
};
