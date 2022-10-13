export default class ReadQueriesHoursContracts {
  db: any;
  columns: Array<string>;

  constructor(db: any) {
    this.db = db;
    this.columns = [
      "ct.id as contract_id",
      "ct.name as contract_name",
      "ct.total_hours as contract_total_hours",
      "ct.type_hours as contract_type_hours",
      "ct.valid_id as contract_active",
      "tk.id as ticket_id",
      "tk.tn as ticket_number",
      "tk.title as ticket_title",
      "tk.customer_user_id as ticket_user",
      "us.login as ticket_create_by",
      "tks.name as ticket_state_name",
      "qu.name as ticket_queue",
      "sr.name as ticket_service",
      "tk.create_time as ticket_create_time",
      "tk.change_time as ticket_change_time",
      this.db.raw(
        "round(sum(ta.time_unit * 0.0166667), 2) as ticket_total_time_hours"
      ),
      this.db.raw("count(ta.id) as ticket_articles_count"),
    ];
  }

  async formatMonths(months: Array<string>) {
    let monthsString = "";
    for (let month of months) {
      monthsString += `'${month}'`;
      if (month != months[months.length - 1]) {
        monthsString += ", ";
      }
    }

    return monthsString;
  }

  async readByContractId(
    id: string,
    months: Array<string>,
    year: string | undefined
  ) {
    let monthsString = this.formatMonths(months);
    return this.db
      .select(this.columns)
      .from("ticket as tk")
      .innerJoin("ticket_state as tks", "tk.ticket_state_id", "tks.id")
      .innerJoin("time_accounting as ta", "ta.ticket_id", "tk.id")
      .innerJoin("users as us", "us.id", "tk.create_by")
      .innerJoin("service as sr", "sr.id", "tk.service_id")
      .innerJoin("queue as qu", "qu.id", "tk.queue_id")
      .innerJoin("dynamic_field_value as dfv", "dfv.object_id", "ta.article_id")
      .innerJoin("customer_contract as ct", "ct.id", "dfv.value_text")
      .where("ct.id", id)
      .andWhere(this.db.raw(`month(ta.create_time) in (${monthsString})`))
      .andWhere(this.db.raw(`year(ta.create_time) = '${year}'`))
      .groupBy("ct.id")
      .orderBy("tk.create_time", "desc");
  }

  async readContractsByType(
    type: string,
    months: Array<string>,
    year: string | undefined
  ) {
    let monthsString = this.formatMonths(months);
    return this.db
      .select(this.columns)
      .from("ticket as tk")
      .innerJoin("ticket_state as tks", "tk.ticket_state_id", "tks.id")
      .innerJoin("time_accounting as ta", "ta.ticket_id", "tk.id")
      .innerJoin("users as us", "us.id", "tk.create_by")
      .innerJoin("service as sr", "sr.id", "tk.service_id")
      .innerJoin("queue as qu", "qu.id", "tk.queue_id")
      .innerJoin("dynamic_field_value as dfv", "dfv.object_id", "ta.article_id")
      .innerJoin("customer_contract as ct", "ct.id", "dfv.value_text")
      .where("ct.type_hours", type)
      .andWhere(this.db.raw(`month(ta.create_time) in (${monthsString})`))
      .andWhere(this.db.raw(`year(ta.create_time) = '${year}'`))
      .groupBy("ct.id")
      .orderBy("tk.create_time", "desc");
  }

  async readContractsByCustomerId(
    customerId: number,
    months: Array<string>,
    year: string | undefined
  ) {
    let monthsString = this.formatMonths(months);
    return this.db
      .select(this.columns)
      .from("ticket as tk")
      .innerJoin("ticket_state as tks", "tk.ticket_state_id", "tks.id")
      .innerJoin("time_accounting as ta", "ta.ticket_id", "tk.id")
      .innerJoin("users as us", "us.id", "tk.create_by")
      .innerJoin("service as sr", "sr.id", "tk.service_id")
      .innerJoin("queue as qu", "qu.id", "tk.queue_id")
      .innerJoin("dynamic_field_value as dfv", "dfv.object_id", "ta.article_id")
      .innerJoin("customer_contract as ct", "ct.id", "dfv.value_text")
      .where("ct.customer_id", customerId)
      .andWhere(this.db.raw(`month(ta.create_time) in (${monthsString})`))
      .andWhere(this.db.raw(`year(ta.create_time) = '${year}'`))
      .groupBy("ct.id")
      .orderBy("tk.create_time", "desc");
  }

  async readContractsByOvertimeOrDowntime(
    customerId: number,
    months: Array<string>,
    year: string | undefined
  ) {
    let monthsString = this.formatMonths(months);
    return this.db
      .select(this.columns)
      .from("ticket as tk")
      .innerJoin("ticket_state as tks", "tk.ticket_state_id", "tks.id")
      .innerJoin("time_accounting as ta", "ta.ticket_id", "tk.id")
      .innerJoin("users as us", "us.id", "tk.create_by")
      .innerJoin("service as sr", "sr.id", "tk.service_id")
      .innerJoin("queue as qu", "qu.id", "tk.queue_id")
      .innerJoin("dynamic_field_value as dfv", "dfv.object_id", "ta.article_id")
      .innerJoin("customer_contract as ct", "ct.id", "dfv.value_text")
      .where("ct.customer_id", customerId)
      .andWhere(this.db.raw(`month(ta.create_time) in (${monthsString})`))
      .andWhere(this.db.raw(`year(ta.create_time) = '${year}'`))
      .groupBy("ct.id")
      .orderBy("tk.create_time", "desc");
  }
}
