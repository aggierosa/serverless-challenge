import { formatRoute } from "@functions/components/routesFormat";
import { handlerPath } from "@libs/handler-resolver";

export const createPoke = formatRoute(
  handlerPath(__dirname),
  "post.creating",
  "post",
  "create/pokemon/{name}"
);

export const getPokemon = formatRoute(
  handlerPath(__dirname),
  "pokeApi.getPoke",
  "get",
  "get/pokemon/{name}"
);
