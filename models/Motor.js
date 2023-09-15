import { Model, raw } from 'objection'
import { db } from '../config/database'
import { toJalaliStr } from '../config/date_utils';

class Motor extends Model {
    static get tableName() {
        return 'motors'
    }

    static get idColumn() {
        return 'id'
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        json.created_at = toJalaliStr(json.created_at)
        return json;
    }
    static get relationMappings() {
        const Brand = require('./Brand');
        const Type = require('./Motor_Type');
        return {
            brands: {
                relation: Model.BelongsToOneRelation,
                modelClass: Brand,
                join: {
                    from: 'motors.brand',
                    to: 'brands.brand_id',
                },
            },
            types: {
                relation: Model.BelongsToOneRelation,
                modelClass: Type,
                join: {
                    from: 'motors.type',
                    to: 'motor_type.type_id',
                },
            },
        };
    }
}
Motor.knex(db())
module.exports = Motor
