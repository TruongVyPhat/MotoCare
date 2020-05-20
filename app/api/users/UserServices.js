const Users = require('./User');
const db = require('../../models/index');
const bcrypt = require('bcrypt');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_user = (id) => {
    const sql = 'SELECT id, name, role_id, email, phone, address, date_of_birth, password from public.User where id = ?::integer or name = ?';
    return sequelize.query(sql, {
            replacements: [id, id],
            type: QueryTypes.SELECT
        });
}

exports.get_me = (user_id) => {
    const sql = 'SELECT id, name, role_id, email, phone, address, date_of_birth from public.User where id = ?';
    return sequelize.query(sql, {
        replacements: [user_id],
        type: QueryTypes.SELECT
    });
}

exports.get_user_by_email = (email) => {
    const sql = 'SELECT id, password, name from public.User where email like ?';   
    return sequelize.query(sql, {
        replacements: [email],
        type: QueryTypes.SELECT
    });
}

exports.compare_password = (input, password) => {
    return bcrypt.compareSync(input, password);
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

exports.hash_password = (input_password) => {
    return bcrypt.hashSync(input_password, 10);
}