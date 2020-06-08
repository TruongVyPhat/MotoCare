const ProductOrder = require('./ProductOrder');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_orders_by_bill = (bill_id, user_id) => {
    let sql = 'SELECT * from public.product_order where bill_id=?';
    let replacements = [bill_id];
    if (user_id){
        sql = 'SELECT po.* from public.product_order po JOIN public.bill b on b.id = po.bill_id where b.user_id=?';
        replacements.push(user_id);
    }
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.SELECT
    });
}

exports.create_orders = (orders, bill_id) => { 
    let sql = '';
    for(let i = 0; i < orders.length; i++){
        const product_id = orders[i].id;
        const amount = orders[i].quantity;
        sql = sql + `INSERT INTO public.product_order(bill_id, product_id, amount) VALUES (${bill_id}, ${product_id}, ${amount});`;
    }
    return sequelize.query(sql);
}