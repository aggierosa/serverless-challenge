import { pokemonTyped } from "../interfaces/poketype";

export default class UpdatePokemon {
  db: any;
  table: string;
  orderParam: string;

  constructor(db: any) {
    this.db = db;
    this.table = "pokemons";
    this.orderParam = "create_time";
  }

  async update(name: string, body: pokemonTyped) {
    return this.db
      .update({ description: body.description })
      .where("name", name);
  }
}
