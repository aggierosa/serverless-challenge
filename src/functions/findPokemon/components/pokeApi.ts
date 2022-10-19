import axios from "axios";
import { formatJSONResponse } from "../../../libs/api-gateway";

export const getPoke = async (betterPokename: string) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${betterPokename}`
    );

    return data;
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
