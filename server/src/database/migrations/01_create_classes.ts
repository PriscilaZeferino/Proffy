import Knex from 'knex';

//Criar ao tabela, alterar alguma coisa...
export async function up (knex: Knex)
{
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
});

}

//Se algo der errado, fazer o contrario do up
export async function down (knex: Knex)
{
    return knex.schema.dropTable('classes');
}