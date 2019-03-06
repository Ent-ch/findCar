
exports.up = function(knex, Promise) {
    return knex.schema.createTable('odata', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.integer('MODEL_ID').references('id').inTable('models').notNullable();
        table.integer('COLOR_ID').references('id').inTable('colors').notNullable();
        table.integer('FUEL_ID').references('id').inTable('fuels');
        table.integer('BODY_ID').references('id').inTable('fuels');
        table.integer('MAKE_YEAR');
        table.integer('CAPACITY');
        table.integer('OWN_WEIGHT');
        table.date('D_REG').notNullable();
        table.string('N_REG', 10).notNullable();
        table.string('PERSON', 10).notNullable();
        table.string('REG_ADDR_KOATUU', 20).notNullable();
        table.unique(['D_REG','N_REG'], 'regOp');
    });  
};

exports.down = function(knex, Promise) {
  
};
