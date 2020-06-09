const Bill = require('./Bill');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_bills = (user_id) => {
    let sql = 'SELECT b.id, b.created_at, b.discount, b.total_price, p.name, po.amount from public.bill b '
            + ' left join public.product_order po on po.bill_id = b.id '
            + ' join public.product p on p.id = po.product_id join public.price pr on pr.product_id = p.id ';
    let replacements = [];
    if (user_id) {
        sql = sql + ' where user_id=? and b.total_price > 0';
        replacements.push(user_id);
    }
    sql = sql + ' order by b.id ';
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

exports.get_created_bill = (user_id, created_at) => {
    const sql = 'SELECT id from public.bill where user_id=? and created_at=?'
    return sequelize.query(sql, {
        replacements: [user_id, created_at],
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
    const sql = "select pr.name, pro.amount as quantity, (select 'USD') as currency, "
            + " (SELECT COALESCE((select (p.sell_price *(100- s.discount_percent))/100 * pro.amount), p.sell_price)) as price "
            + " from public.product_order pro JOIN public.product pr on pr.id = pro.product_id "
            + " JOIN public.price p on p.product_id = pro.product_id "
            + ' LEFT JOIN public."onSale" s on pro.product_id = s.product_id '
            + " where bill_id = ? and (s.start_date is null or (s.start_date <= (select now()) and (select now()) <= s.end_date)) "
            + " ORDER BY pro.product_id";
    return sequelize.query(sql, {            
        replacements: [bill_id],
        type: QueryTypes.SELECT
    });
} 

exports.trigger_update_price = (total_price, bill_id) => {
    const sql = 'UPDATE public.bill SET total_price=? WHERE id=?';
    return sequelize.query(sql, {            
        replacements: [total_price, bill_id],
        type: QueryTypes.UPDATE
    });
}