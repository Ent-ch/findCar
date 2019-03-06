
exports.up = function(knex, Promise) {
    return knex.schema.createTable('colors', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.string('COLOR_NAME').unique().collate('utf8_unicode_ci').unsigned().notNullable();
    });
};

exports.down = function(knex, Promise) {
  
};
