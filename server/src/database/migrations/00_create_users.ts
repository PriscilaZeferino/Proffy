import Knex from 'knex';

//Criar ao tabela, alterar alguma coisa...
export async function up (knex: Knex)
{
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();

    });
}

//Se algo der errado, fazer o contrario do up
export async function down (knex: Knex)
{
    return knex.schema.dropTable('users');
}