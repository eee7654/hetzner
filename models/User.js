import { Model } from 'objection'
import { db } from '../config/database'

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get idColumn() {
        return 'id'
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        return json;
    }
}
User.knex(db())
module.exports = User
