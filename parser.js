const iconv = require('iconv-lite');
const configDb = require('./knexfile.js') ;
const knex = require('knex')(configDb.production);

const findCreate = (table, field, fieldValue, addData = {}) => {
    return knex(table).select('id').where(field, fieldValue).then(data => {
        if (!data.length) {
            return knex(table).insert({ [field]: fieldValue, ...addData }).then(id => id[0]);
        }
        return data[0]['id'];
    }).catch(err => console.log(`data in ${table} exist!`));
}

const createOp = (modelId, colorId, fuelId, bodyId, data) => {
    const { N_REG, D_REG, MAKE_YEAR, PERSON, CAPACITY, OWN_WEIGHT, REG_ADDR_KOATUU } = data;

    knex('odata').insert({ MODEL_ID: modelId, COLOR_ID: colorId, FUEL_ID: fuelId, BODY_ID: bodyId,
        MAKE_YEAR, N_REG, D_REG, PERSON, CAPACITY, OWN_WEIGHT, REG_ADDR_KOATUU }).then(opId => {
        
            console.log(`added operation ${opId}`)
    }).catch(err => console.log(`operation exist!`));
}

const createEl = (data, withOps = false) => {
    const { BRAND, COLOR, MODEL, BODY, FUEL } = data;

    // findCreate('fuels', 'FUEL_NAME', FUEL).then(brandId => null);
    // findCreate('bodies', 'BODY_NAME', BODY).then(brandId => null);

    return findCreate('brands', 'BRAND_NAME', BRAND).then(brandId => {
        return findCreate('models', 'MODEL_NAME', MODEL, { BRAND_ID: brandId }).then(modelId => {
            return modelId;
            // return findCreate('colors', 'COLOR_NAME', COLOR).then(colorId => ({ modelId, colorId }));
        });
    });

}

const readFile = (columns) => {
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./db/data.csv', {encoding: 'binary'})
    });
    
    let i = 1;
    let keys = [];
    lineReader.on('line', (line) => {
        const result = iconv.decode(line, "cp1251").split(';');
        let obj = {};
        if (i === 1) {
            keys = result;
        } else {

            result.forEach((element, i) => {
                // if (columns[keys[i]]) {
                    obj[keys[i]] = element;
                // }
            });
            createEl(obj, false).then(baseData => {
                console.log(baseData);
            });

        }
        
        i++;
        // if (i > 50000) {
        //     lineReader.close();
        // }
    });
}

knex('odata').columnInfo().then((columns) => {

    readFile(columns);
});


