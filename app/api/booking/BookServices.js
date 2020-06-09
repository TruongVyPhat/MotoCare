const Booking = require('./Booking');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_bookings = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * from public.booking ORDER BY id LIMIT ? OFFSET ?'
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_all_my_bookings = (user_id, page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * from public.booking where user_id =? ORDER BY id LIMIT ? OFFSET ?'
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.filter_by_status = (status, user_id) => {
    let sql = 'SELECT * from public.booking where status=? ';
    let replacements = [status];
    if (user_id){
        sql = sql + ' and user_id=?';
        replacements.push(user_id);
    }
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.SELECT
    });
}

exports.get_calendar = (start_time, end_time) => {
    const sql = 'SELECT * from public.booking where '
}