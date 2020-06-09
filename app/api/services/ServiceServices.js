const Service = require('./Service');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_services = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * from public.service ORDER BY id LIMIT ? OFFSET ?'
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_service = (id) => {
    const sql = 'SELECT * from public.service where id =?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.SELECT
    });
}

exports.create_service = (name, duration, price, image) => {
    const sql = 'INSERT INTO public.service(name, duration, price, image) VALUES (?, ?, ?, ?)';
    return sequelize.query(sql, {
        replacements: [name, duration, price, image],
        type: QueryTypes.INSERT
    });
}

exports.update_service = (name, duration, price, image, id) => {
    const sql = 'UPDATE public.service SET name=?, duration=?, price=?, image=? WHERE id=?';
    return sequelize.query(sql, {
        replacements: [name, duration, price, image, id],
        type: QueryTypes.UPDATE
    });
}

exports.delete_service = (id) => {
    const sql = 'DELETE FROM public.service WHERE id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.UPDATE
    });
}

