
exports.up = function(knex, Promise) {
    return knex.schema.createTable('brands', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.string('BRAND_NAME').unique().collate('utf8_unicode_ci').unsigned().notNullable();
    });
};

exports.down = function(knex, Promise) {
  
};
