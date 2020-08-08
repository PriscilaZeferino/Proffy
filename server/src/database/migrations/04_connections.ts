import Knex from 'knex';

//Criar ao tabela, alterar alguma coisa...
export async function up (knex: Knex)
{
    return knex.schema.createTable('connection', table => {
        table.increments('id').primary();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

            table.timestamp("created_at")
                .defaultTo("now")
                .notNullable();
});

}

//Se algo der errado, fazer o contrario do up
export async function down (knex: Knex)
{
    return knex.schema.dropTable('class_schedule');
}