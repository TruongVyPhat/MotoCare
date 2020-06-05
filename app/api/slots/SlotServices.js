const Slot = require('./Slot');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_brands = () => {
    const sql = 'SELECT * from public.slot ';
    return sequelize.query(sql, {
        replacements: [],
        type: QueryTypes.SELECT
    });
}

exports.create_slot = (number) => {
    let sql = 'INSERT INTO public.slot(id) VALUES ((select MAX(id) from public.slot) + 1); ';
    for (let i = 0; i < number - 1; i++){
        sql = sql + sql;
    }
    return sequelize.query(sql, {
        replacements: [],
        type: QueryTypes.INSERT
    });
}

exports.delete_slot = (number) => {
    let sql = 'DELETE FROM public.slot WHERE id=(select MAX(id) from public.slot) ';
    for (let i = 0; i < number - 1; i++){
        sql = sql + sql;
    }
    return sequelize.query(sql, {
        replacements: [],
        type: QueryTypes.UPDATE
    });
}
