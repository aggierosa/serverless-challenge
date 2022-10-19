import { pokemonTyped } from "../interfaces/poketype";

export default class DeletePokemon {
  db: any;
  table: string;

  constructor(db: any) {
    this.db = db;
    this.table = "pokemons";
  }

  async delete(name: string) {
    return this.db.from(this.table).where("name", name).del();
  }
}
