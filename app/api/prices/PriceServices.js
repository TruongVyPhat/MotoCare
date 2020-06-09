const Price = require('./Price');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_prices = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT pr.*, p.name, b.name as brand_name, p.brand_id, c.title, p.category_id from public.price pr '
            + ' JOIN public.product p on p.id = pr.product_id '
            + ' JOIN public.categories c on p.category_id = c.id '
            + ' JOIN public.brand b on b.id = p.brand_id'
            + ' ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_price_by_productId = (product_id) => {
    const sql = 'SELECT * from public.price where product_id = ?';
    return sequelize.query(sql, {
        replacements: [product_id],
        type: QueryTypes.SELECT
    });
}

exports.update_price = (sell_price, input_price, product_id, id) => {
    let sql = 'UPDATE public.price SET input_price=?, sell_price=? WHERE id=?';
    let replacements = [sell_price, input_price, id];
    if (product_id){
        sql = 'UPDATE public.price SET input_price=?, sell_price=? WHERE product_id=?';
        replacements = [sell_price, input_price, product_id];
    }
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.UPDATE
    });
}

exports.create_price = (product_id, input_price, sell_price) => {
    const sql = 'INSERT INTO public.price(product_id, input_price, sell_price) VALUES (?, ?, ?)';
    return sequelize.query(sql, {
        replacements: [product_id, input_price, sell_price],
        type: QueryTypes.INSERT
    });
}

exports.delete_price = (id) => {
    const sql = 'DELETE FROM public.price WHERE id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.DELETE
    });
}

exports.delete_price_by_productId = (id) => {
    const sql = 'DELETE FROM public.price WHERE product_id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.DELETE
    });
}

exports.delete_sale_by_productId = (id) => {
    const sql = 'DELETE FROM public."onSale" WHERE product_id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.DELETE
    });
}