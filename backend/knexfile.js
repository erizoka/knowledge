const { db } = require('./.env')

module.exports = {
    client: 'postgres',
    connection: db,
    pool: {
        min: 50,
        max: 100,
        propagateCreateError: false
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}