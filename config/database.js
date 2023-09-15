'user strict';
import knex from 'knex'
import path from 'path'
var dbpool
export function db() {
    if (dbpool == undefined) {
        dbpool = knex({
            client: 'sqlite3',
            connection: {
                filename:path.join(process.env.ROOT_DIR || process.cwd(),'/db/database.db')
            },
            debug:process.env.NODE_ENV !== "production",
            useNullAsDefault:true
        })
    }
    return dbpool;
}

export default db