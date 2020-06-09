const service = require('./BrandServices');
const product_service = require('../products/ProductServices');
const httpStatus = require('http-status-codes');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_brands = (req, res) => {
    const page = req.query.page;
    service.get_all_brands(page)
    .then(brands => {
        if (brands){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, brands));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_brand = (req, res) => {
    const brand_id = req.params.id;
    service.get_brand(brand_id)
    .then(brands => {
        if (brands){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, brands[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.create_brand = (req, res) => {
    const name = req.body.data.name.trim();
    
    service.create_brand(name)
    .then(created => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.update_brand = (req, res) => {
    const id = req.params.id
    const name = req.body.data.name.trim();
    
    service.update_brand(name, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.delete_brand = (req, res) => {
    const id = req.params.id;
    product_service.count_product_by_cate_or_brand(null, id)
    .then(products => {
        if (products.length > 0){
            status = httpStatus.CONFLICT;
            res.status(status).json(responseJS.mess_Json(status));
        } else {
            service.delete_brand(id)
            .then(deleted => {
                status = httpStatus.OK;
                res.status(status).json(responseJS.mess_Json(status));
            }).catch(function(error) {
                res.status(status).json(error);
            });
        }
    }).catch(function(error) {
        res.status(status).json(error);
    });
}