const Bill = require('./Bill');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_bills = (page, user_id) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    let sql = 'SELECT * from public.bill where ';
    let replacements = [];
    if (user_id) {
        sql = sql + ' user_id=?';
        replacements.push(user_id);
    }
    sql = sql + ' ORDER BY id LIMIT ? OFFSET ?';
    replacements.push(CONSTANTS.PAGE_SIZE);
    replacements.push(offset);
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.SELECT
    });
}

exports.get_bill = (bill_id, user_id) => {
    let sql = 'SELECT * from public.bill where id=?';
    let replacements = [bill_id];
    if (user_id){
        sql = sql + ' and user_id=?';
        replacements.push(user_id);
    }
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.SELECT
    });
}

exports.create_bill = (user_id, created_at, discount) => {
    const total_price = 0;
    const sql = 'INSERT INTO public.bill(user_id, created_at, discount, total_price)VALUES (?, ?, ?, ?)';
    return sequelize.query(sql, {
        replacements: [user_id, created_at, discount, total_price],
        type: QueryTypes.INSERT
    });
}

exports.check_update_bill = (bill_id) => {
    const sql = 'select pro.product_id, pro.amount, p.sell_price, s.discount_percent, s.start_date, s.end_date, '
            + ' (select (p.sell_price *(100-s.discount_percent))/100 * pro.amount where s.start_date <= (select now()) and (select now()) <= s.end_date) as total_price '
            + ' from public.product_order pro JOIN public.price p on p.product_id = pro.product_id '
            + ' LEFT JOIN public."onSale" s on pro.product_id = s.product_id'
            + ' where bill_id = ? ORDER BY pro.product_id';
    return sequelize.query(sql, {            
        replacements: [bill_id],
        type: QueryTypes.SELECT
    });
} 

exports.trigger_update_price = (total_price, bill_id) => {
    const sql = 'UPDATE public.bill total_price=? WHERE id=?';
    return sequelize.query(sql, {            
        replacements: [total_price, bill_id],
        type: QueryTypes.UPDATE
    });
}