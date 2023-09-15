import { Model, raw } from 'objection'
import { db } from '../config/database'
import { toJalaliStr } from '../config/date_utils';

class Motor_Type extends Model {
    static get tableName() {
        return 'motor_type'
    }

    static get idColumn() {
        return 'type_id'
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        return json;
    }

    
}
Motor_Type.knex(db())
module.exports = Motor_Type
