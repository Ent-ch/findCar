
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bodies', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.string('BODY_NAME').unique().collate('utf8_unicode_ci').unsigned().notNullable();
    });
};

exports.down = function(knex, Promise) {
  
};
