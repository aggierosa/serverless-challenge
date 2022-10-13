export default class ReadQueriesContracts {
  db: any;
  table: string;
  orderParam: string;

  constructor(db: any) {
    this.db = db;
    this.table = "customer_contract";
    this.orderParam = "create_time";
  }

  async readAll() {
    return this.db.select().from(this.table).orderBy(this.orderParam, "desc");
  }

  async readById(id: number) {
    return this.db.select().from(this.table).where("id", id);
  }

  async readByName(name: string) {
    return this.db
      .select()
      .from(this.table)
      .where(this.db.raw(`name like "%${name}%"`))
      .orderBy(this.orderParam, "desc");
  }

  async readByType(type: string) {
    return this.db
      .select()
      .from(this.table)
      .where("type_hours", type)
      .orderBy(this.orderParam, "desc");
  }

  async readByQueue(queue: string) {
    return this.db
      .select()
      .from(this.table)
      .where("document_id", queue)
      .orderBy(this.orderParam, "desc");
  }

  async readByCustomer(customerId: number) {
    return this.db
      .select()
      .from(this.table)
      .where("customer_id", customerId)
      .orderBy(this.orderParam, "desc");
  }

  async readByOtherParameter(parameter: string, field: string) {
    return this.db
      .select()
      .from(this.table)
      .where(this.db.raw(`${field} = "${parameter}"`))
      .orderBy(this.orderParam, "desc");
  }

  async readByDates(
    dateStart: string,
    dateEnd: string,
    field: "start_date" | "end_date"
  ) {
    return this.db
      .select()
      .from(this.table)
      .where(
        this.db.raw(`date(${field}) between "${dateStart}" and "${dateEnd}"`)
      )
      .orderBy("create_time", "desc");
  }
}
