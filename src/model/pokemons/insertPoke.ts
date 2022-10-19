import { pokemonTyped } from "../interfaces/poketype";

export default class CreatePokemon {
  db: any;
  table: string;

  constructor(db: any) {
    this.db = db;
    this.table = "pokemons";
  }

  async create(body: pokemonTyped) {
    return this.db
      .insert({
        name: body.name,
        id: body.id,
        image: body.image,
        description: body.description,
      })
      .into(this.table);
  }
}
