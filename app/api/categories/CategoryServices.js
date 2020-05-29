const Category = require('./Category');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_categories = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * FROM public.categories ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_category = (id) => {
    const sql = 'SELECT * from public.categories where id = ?::integer';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.SELECT
    });
}

exports.create_category = (title) => {
    const sql = 'INSERT INTO public.categories(title) VALUES (?)';
    return sequelize.query(sql, {
        replacements: [title],
        type: QueryTypes.INSERT
    });
}

exports.update_category = (title, id) => {
    const sql = 'UPDATE public.categories set title=? where id=?';
    return sequelize.query(sql, {
        replacements: [title, id],
        type: QueryTypes.UPDATE
    });
}

exports.delete_category = (id) => {
    const sql = 'DELETE FROM public.categories where id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.DELETE
    });
}