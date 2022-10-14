import * as knx from "knex";

export async function up(knex): Promise<any> {
  return knex.schema.createTable("pokemons", (table: knx.Knex.TableBuilder) => {
    table.increments("id");
    table.string("name");
    table.integer("order");
  });
}

export async function down(knex): Promise<any> {
  return knex.schema.dropTable("pokemons");
}
