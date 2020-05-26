const Users = require('./User');
const db = require('../../models/index');
const bcrypt = require('bcrypt');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const CONSTANTS = require('../helpers/constants');

exports.get_all_user = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT * FROM public.user ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_user = (id) => {
    const sql = 'SELECT id, name, role_id, email, phone, address, date_of_birth, password from public.User where id = ?::integer or name = ?';
    return sequelize.query(sql, {
        replacements: [id, id],
        type: QueryTypes.SELECT
    });
}

exports.get_me = (user_id) => {
    const sql = 'SELECT id, name, role_id, email, phone, address, date_of_birth, password from public.User where id = ?';
    return sequelize.query(sql, {
        replacements: [user_id],
        type: QueryTypes.SELECT
    });
}

exports.get_user_by_email = (email) => {
    const sql = 'SELECT id, password, name, role_id from public.User where email like ?';   
    return sequelize.query(sql, {
        replacements: [email],
        type: QueryTypes.SELECT
    });
}

exports.update_token = (refresh_token, time, user_id) => {
    const sql = 'UPDATE public.User SET refresh_token=?, created_time_token=? WHERE id = ?'
    return sequelize.query(sql, {
        replacements: [refresh_token, time, user_id],
        type: QueryTypes.UPDATE
    });
}

exports.create_user = (name, role_id, email, phone, address, date_of_birth, password) => {
    const sql = 'INSERT INTO public.User(name, role_id, email, phone, address, date_of_birth, password, refresh_token, created_time_token)'
            + 'VALUES (?, ?, ?, ?, ?, ?, ?, null, null)';
    return sequelize.query(sql, {
        replacements: [name, role_id, email, phone, address, date_of_birth, password],
        type: QueryTypes.SELECT
    });
}

exports.get_user_by_keyword = (keyword) => {
    const sql = "SELECT id, name from public.User where id::text = ?"
            + " or LOWER(replace((select convertTVkdau(name)),' ','')) like ?";
    return sequelize.query(sql, {
        replacements: [keyword, keyword],
        type: QueryTypes.SELECT
    });
}

// TODO: remove pass out of function
exports.update_user_info = (name, email, phone, address, date_of_birth, password, user_id) => {
    const sql = 'UPDATE public.User SET name=?, email=?, phone=?, address=?, date_of_birth=?, password=? '
            + 'WHERE id = ?::integer'
    return sequelize.query(sql, {
        replacements: [name, email, phone, address, date_of_birth, password, user_id],
        type: QueryTypes.UPDATE
    });
}

exports.update_user_role = (role_id, id) => {
    const sql = 'UPDATE public.User SET role_id = ?::interger WHERE id = ?::integer';
    return sequelize.query(sql, {
        replacements: [role_id, id],
        type: QueryTypes.UPDATE
    });
}

exports.delete_user = (id) => {
    const sql = 'DELETE FROM public.User where id = ?::integer';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.DELETE
    });
}

exports.change_password = (new_password, id) => {
    const sql = 'UPDATE public.User SET password = ? where id = ?';
    return sequelize.query(sql, {
        replacements: [new_password, id],
        type: QueryTypes.UPDATE
    });
}

exports.compare_password = (input, password) => {
    return bcrypt.compareSync(input, password);
}

exports.hash_password = (input_password) => {
    return bcrypt.hashSync(input_password, 10);
}