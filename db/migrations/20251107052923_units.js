
exports.up = (knex)=>{
    return knex.schema.createTable('units', (table)=>{
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('abbreviation').notNullable().unique();
        table.timestamps('created_at').defaultTo(knex.fn.now());
    });
}

exports.down = (knex)=>{
    return knex.schema.dropTableIfExists('units');
}