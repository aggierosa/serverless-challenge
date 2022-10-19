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
  "read.getting",
  "get",
  "get/pokemon/{name}"
);

export const getAllPokemon = formatRoute(
  handlerPath(__dirname),
  "list.getting",
  "get",
  "get/pokemon"
);

export const deletePokemon = formatRoute(
  handlerPath(__dirname),
  "delete.deleting",
  "delete",
  "delete/pokemon/{name}"
);

export const updatePokemon = formatRoute(
  handlerPath(__dirname),
  "update.updating",
  "patch",
  "update/pokemon/{name}"
);
