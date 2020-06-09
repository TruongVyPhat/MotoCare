const Brand = require('./Brand');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_brands = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * from public.brand ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_brand = (id) => {
    const sql = 'SELECT * from public.brand where id =?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.SELECT
    });
}

exports.create_brand = (name) => {
    const sql = 'INSERT INTO public.brand(name) VALUES (?)';
    return sequelize.query(sql, {
        replacements: [name],
        type: QueryTypes.INSERT
    });
}

exports.update_brand = (name, id) => {
    const sql = 'UPDATE public.brand SET name=? WHERE id=?';
    return sequelize.query(sql, {
        replacements: [name, id],
        type: QueryTypes.UPDATE
    });
}

exports.delete_brand = (id) => {
    const sql = 'DELETE FROM public.brand WHERE id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.UPDATE
    });
}