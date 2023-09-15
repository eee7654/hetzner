import { Model, raw } from 'objection'
import { db } from '../config/database'
import { toJalaliStr, toMiladiStr } from '../config/date_utils';

class Brand extends Model {
    static get tableName() {
        return 'brands'
    }

    static get idColumn() {
        return 'brand_id'
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);
        json.created_at = toMiladiStr(json.created_at)
        json.j_created_at = toJalaliStr(json.created_at)
        return json;
    }
}
Brand.knex(db())
module.exports = Brand
