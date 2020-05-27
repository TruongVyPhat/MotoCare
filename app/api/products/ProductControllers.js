const service = require('./ProductServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const ROLE = CONSTANTS.ROLE;
const formatter_time = require('../functions/format_time');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_products = (req, res) => {
    const page = req.query.page;
    service.get_all_products(page)
    .then(products => {
        if (products){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, products));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_product = (req, res) => {
    const product_id = req.params.id;
    service.get_product(product_id)
    .then(user => {
        if (user){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, user[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.search_products = (req, res) => {
    let keyword = formatter.format_string(req.query.keyword, formatter).toLowerCase();
    keyword = '%'+keyword+'%';
    service.get_user_by_keyword(keyword)
    .then(products => {
        if (products.length > 0){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, products));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.create_product = (req, res) => {
    const name = req.body.data.name.trim();
    const category_id = req.body.data.category_id;
    const created_by = req.user.id;
    const current_time = new Date().getTime();
    const created_at = formatter_time.gettime_to_format(current_time);
    const brand_id = req.body.data.brand_id;
    const amount = req.body.data.amount.trim();
    const image = req.body.data.image ? req.body.data.image.trim() : null;
    
    service.create_product(category_id, created_by, created_at, brand_id, amount, image, name)
    .then(created => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.update_product = (req, res) => {
    const id = req.query.id
    const name = req.body.data.name.trim();
    const category_id = req.body.data.category_id;
    const updated_by = req.user.id;
    const current_time = new Date().getTime();
    const updated_at = formatter_time.gettime_to_format(current_time);
    const brand_id = req.body.data.brand_id;
    const amount = req.body.data.amount;
    const image = req.body.data.image ? req.body.data.image.trim() : null;
    
    service.update_product(category_id, updated_by, updated_at, brand_id, amount, image, name, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.update_product_amount = (req, res) => {
    const id = req.params.id;
    const updated_by = req.user.id;
    const current_time = new Date().getTime();
    const updated_at = formatter_time.gettime_to_format(current_time);
    const amount = req.body.data.amount;

    service.update_amount(amount, updated_by, updated_at, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.delete_product = (req, res) => {
    const id = req.params.id;
    
    service.delete_product(id)
    .then(deleted => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}