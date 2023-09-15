import { Model, raw } from 'objection'
import { db } from '../config/database'
import { toJalaliStr } from '../config/date_utils';

class Admin extends Model {
    static get tableName() {
        return 'admins'
    }

    static get idColumn() {
        return 'adm_id'
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        json.last_login = toJalaliStr(json.last_login)
        return json;
    }
}
Admin.knex(db())
module.exports = Admin
