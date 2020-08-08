import Knex from 'knex';

//Criar ao tabela, alterar alguma coisa...
export async function up (knex: Knex)
{
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

            table.timestamp("created_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
                .notNullable();
});

}

//Se algo der errado, fazer o contrario do up
export async function down (knex: Knex)
{
    return knex.schema.dropTable('connections');
}