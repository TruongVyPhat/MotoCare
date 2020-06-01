const Product = require('./product');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_products = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT p.*, b.name, pr.sell_price, s.start_date, s.end_date, s.discount_percent FROM public.product p ' 
            + 'JOIN public.brand b on p.brand_id = b.id JOIN public.price pr on p.id = pr.product_id '
            + ' LEFT JOIN public."onSale" s on p.id = s.product_id and s.end_date = (select MAX(end_date) from public."onSale" where product_id = p.id)'
            + ' ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.get_product = (id) => {
    const sql = 'SELECT p.*, b.name, pr.sell_price, s.start_date, s.end_date, s.discount_percent FROM public.product p ' 
            + ' JOIN public.brand b on p.brand_id = b.id JOIN public.price pr on p.id = pr.product_id '
            + ' LEFT JOIN public."onSale" s on p.id = s.product_id where p.id = ? and s.end_date = (select MAX(end_date) from public."onSale" where product_id = p.id)';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.SELECT
    });
}

exports.get_user_by_keyword = (keyword) => {
    const sql = "SELECT id, name from public.Product where id::text = ?"
            + " or LOWER(replace((select convertTVkdau(name)),' ','')) like ?";
    return sequelize.query(sql, {
        replacements: [keyword, keyword],
        type: QueryTypes.SELECT
    });
}

exports.filter_products = (category_id, brand_id, page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    let replacements = [];
    let sql = 'SELECT * FROM public.product ';
    if (category_id){
        sql = sql + ' where category_id=? ';
        replacements.push(category_id);
        if (brand_id){
            sql = sql + ' and brand_id=? ';
            replacements.push(brand_id);
        }
    }
    else {
        if (brand_id){
            sql = sql + ' where brand_id=? ';
            replacements.push(brand_id);
        }
    }
    sql = sql + 'ORDER BY id LIMIT ? OFFSET ?';
    replacements.push(CONSTANTS.PAGE_SIZE);
    replacements.push(offset);
    return sequelize.query(sql, {
        replacements: replacements,
        type: QueryTypes.SELECT
    });
}

exports.create_product = (category_id, created_by, created_at, brand_id, amount, image, name) => {
    const sql = 'INSERT INTO public.product(category_id, created_by, updated_by, created_at, updated_at, brand_id, amount, image, name)'
                + ' VALUES (?, ?, null, ?, null, ?, ?, ?, ?)';
    return sequelize.query(sql, {
        replacements: [category_id, created_by, created_at, brand_id, amount, image, name],
        type: QueryTypes.INSERT
    });
}

exports.update_product = (category_id, updated_by, updated_at, brand_id, amount, image, name, id) => {
    const sql = 'UPDATE public.product SET category_id=?, updated_by=?, updated_at=?,' 
            +' brand_id=?, amount=?, image=?, name=? WHERE id=?';
    return sequelize.query(sql, {
        replacements: [category_id, updated_by, updated_at, brand_id, amount, image, name, id],
        type: QueryTypes.UPDATE
    });
}

exports.update_amount = (amount, updated_by, updated_at, id) => {
    const sql = 'UPDATE public.product SET amount=?::integer, updated_by=?, updated_at=? where id=?';
    return sequelize.query(sql, {
        replacements: [amount, updated_by, updated_at, id],
        type: QueryTypes.UPDATE
    });
}

exports.delete_product = (id) => {
    const sql = 'DELETE FROM public.product WHERE id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.UPDATE
    });
}