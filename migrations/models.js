
exports.up = function(knex, Promise) {
    return knex.schema.createTable('models', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.integer('BRAND_ID').references('id').inTable('brands').notNullable();
        table.string('MODEL_NAME').unique().collate('utf8_unicode_ci').unsigned().notNullable();
    });  
};

exports.down = function(knex, Promise) {
  
};
