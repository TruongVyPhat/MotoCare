const service = require('./PriceServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const ROLE = CONSTANTS.ROLE;
const formatter_time = require('../functions/format_time');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_prices = (req, res) => {
    const page = req.query.page;
    service.get_all_prices(page)
    .then(prices => {
        if (prices){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, prices));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_price_by_productId = (req, res) => {
    const product_id = req.query.productId;
    service.get_price_by_productId(product_id)
    .then(prices => {
        if (prices){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, prices[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.update_price = (req, res) => {
    const id = req.param.id;
    // const product_id = req.body.data.product_id;
    const sell_price = req.body.data.sell_price;
    const input_price = req.body.data.input_price;
    
    service.update_price(sell_price, input_price, null, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.create_price = (req, res) => {
    const product_id = req.body.data.product_id;
    const sell_price = req.body.data.sell_price;
    const input_price = req.body.data.input_price;

    //TODO: check if any price with this product_id is exist?
    
    service.create_price(product_id, input_price, sell_price)
    .then(created => {
        
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.delete_price = (req, res) => {
    const id = req.params.id;
    
    service.delete_price(id)
    .then(deleted => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}