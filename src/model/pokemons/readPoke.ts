export default class ReadPokemon {
  db: any;
  table: string;
  orderParam: string;

  constructor(db: any) {
    this.db = db;
    this.table = "pokemons";
    this.orderParam = "create_time";
  }

  async readAll() {
    return this.db.select().from(this.table).orderBy(this.orderParam, "desc");
  }

  async readByName(name: string) {
    return this.db
      .select()
      .from(this.table)
      .where(this.db.raw(`name like "%${name}%"`))
      .orderBy(this.orderParam, "desc");
  }
}
