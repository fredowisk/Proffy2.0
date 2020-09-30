import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();
    //campo que vai de 0 a 6 - domingo a sabado
    table.integer('week_day').notNullable();
    //que hora eu começo a atender
    table.integer('from').notNullable();
    //até que horario eu atendo
    table.integer('to').notNullable();
    //chave estrangeira
    table.integer('class_id')
    .notNullable()
    .references('id')
    .inTable('classes')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}