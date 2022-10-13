import { formatRoute } from "@functions/components/routesFormat";
import { handlerPath } from "@libs/handler-resolver";

export const read = formatRoute(
  handlerPath(__dirname),
  "read.get",
  "get",
  "read/{form}/{parameter}"
);

export const create = formatRoute(
  handlerPath(__dirname),
  "create.post",
  "post",
  "create"
);

export const update = formatRoute(
  handlerPath(__dirname),
  "update.put",
  "put",
  "update/{id}"
);
