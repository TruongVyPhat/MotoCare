const Product = require('./product');
const db = require('../../models/index');
const CONSTANTS = require('../helpers/constants');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.get_all_products = (page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    const sql = 'SELECT p.id, p.name, p.image, p.amount, b.name as brand_name, pr.sell_price, s.start_date, s.end_date, s.discount_percent, c.title FROM public.product p ' 
            + ' JOIN public.brand b on p.brand_id = b.id JOIN public.price pr on p.id = pr.product_id '
            + ' JOIN public.categories c on c.id = p.category_id '
            + ' LEFT JOIN public."onSale" s on p.id = s.product_id and s.end_date = (select MAX(end_date) from public."onSale" where product_id = p.id)'
            + ' ORDER BY id LIMIT ? OFFSET ?';
    return sequelize.query(sql, {
        replacements: [CONSTANTS.PAGE_SIZE, offset],
        type: QueryTypes.SELECT
    });
}

exports.data_search = () => {
    const sql = "SELECT p.id, p.name as title, (select COALESCE(p.image, 'https://react.semantic-ui.com/images/avatar/large/matthew.png')) as image, "
            + " (select CONCAT('$',pr.sell_price::text)) as price from public.product p "
            + " join public.price pr on pr.product_id = p.id";
    return sequelize.query(sql, {
        replacements: [],
        type: QueryTypes.SELECT
    });
}

exports.get_product = (id) => {
    const sql = 'SELECT p.*, b.name as brand_name, pr.sell_price, s.start_date, s.end_date, s.discount_percent, c.title FROM public.product p ' 
            + ' JOIN public.brand b on p.brand_id = b.id JOIN public.price pr on p.id = pr.product_id '
            + ' JOIN public.categories c on c.id = p.category_id LEFT JOIN public."onSale" s on p.id = s.product_id '
            + ' where p.id = ? and (s.end_date = (select MAX(end_date) from public."onSale" where product_id = p.id) or s.end_date is null)';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.SELECT
    });
}

exports.get_user_by_keyword = (keyword) => {
    const sql = "SELECT p.id, p.name as title, p.image, pr.sell_price as price from public.product p join public.price pr on pr.product_id = p.id "
            + " where p.id::text = ? or LOWER(replace((select convertTVkdau(p.name)),' ','')) like ?";
    return sequelize.query(sql, {
        replacements: [keyword, keyword],
        type: QueryTypes.SELECT
    });
}

exports.filter_products = (category_id, brand_id, page) => {
    const offset = (page - 1) * CONSTANTS.PAGE_SIZE;
    let replacements = [];
    let sql = ' SELECT p.id, p.name, p.image, p.amount, b.name as brand_name, pr.sell_price, s.start_date, s.end_date, s.discount_percent, c.title FROM public.product p ' 
            + ' JOIN public.brand b on p.brand_id = b.id JOIN public.price pr on p.id = pr.product_id '
            + ' JOIN public.categories c on c.id = p.category_id '
            + ' LEFT JOIN public."onSale" s on p.id = s.product_id and s.end_date = (select MAX(end_date) from public."onSale" where product_id = p.id) ';
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

exports.count_product_by_cate_or_brand = (category_id, brand_id) =>{
    let sql = 'SELECT * from public.product where ';
    if (category_id){
        sql = sql + ' category_id=? ';
    }
    if (brand_id){
        if (category_id) sql = sql + 'and';
        sql = sql + ' brand_id=? '
    }
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

exports.update_amount_of_products = (oders) => {
    let sql = '';
    for(let i=0; i < oders.length; i++){
        const product_id = orders[i].id;
        const amount = orders[i].quantity;
        sql = sql + `UPDATE public.product SET amount=${amount}::integer where id=${product_id}; `
    }
    return sequelize.query(sql);
} 

exports.delete_product = (id) => {
    const sql = 'DELETE FROM public.product WHERE id=?';
    return sequelize.query(sql, {
        replacements: [id],
        type: QueryTypes.UPDATE
    });
}

exports.get_created_product = (created_at, created_by) => {
    const sql = 'SELECT id from public.product where created_at=? and created_by=?';
    return sequelize.query(sql, {
        replacements: [created_at, created_by],
        type: QueryTypes.SELECT
    }); 
}
