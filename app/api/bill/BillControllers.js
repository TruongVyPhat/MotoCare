const service = require('./BillServices');
const pOrder_service = require('../product_order/ProductOrderServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const ROLE = CONSTANTS.ROLE;
const formatter_time = require('../functions/format_time');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_bills = (req, res) => {
    const page = req.query.page;
    const user_id = req.user.id;
    const role_id = req.user.role_id;

    if (role_id === ROLE.ADMIN && role_id === ROLE.STAFF) user_id = null;

    service.get_all_bills(page, user_id)
    .then(bills => {
        if (bills){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, bills));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_bill = (req, res) => {
    const bill_id = req.params.id;
    const user_id = req.user.id;
    const role_id = req.user.role_id;
    if (role_id === ROLE.ADMIN || role_id === ROLE.CUSTOMER) user_id = null;
    service.get_bill(bill_id, user_id)
    .then(bills => {
        if (bills){
            
            pOrder_service.get_orders_by_bill(bill_id, user_id)
            .then(orders => {
                if (orders){
                    const response = {
                        bill: bills[0],
                        orders: orders
                    }
                    status = httpStatus.OK;
                    res.status(status).json(responseJS.Json(status, response));
                } else {
                    status = httpStatus.NOT_FOUND;
                    res.status(status).json(responseJS.mess_Json(status));
                }
            }).catch(error => {
                res.status(status).json(error);
            });
            
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.create_bill = (req, res) => {
    const user_id = req.body.data.user_id;
    const discount = req.body.data.discount ? req.body.data.discount : CONSTANTS.DEFAULT_DISCOUNT;
    const orders = req.body.data.orders;
    
    sequelize.transaction(async transaction => {
        try {
            service.create_bill(user_id, created_at, discount)
            .then(created => {
            
                pOrder_service.create_orders(orders, bill_id)
                .then(result => {
                    service.check_update_bill(bill_id)
                    .then(results => {
                        const total_price = 0;
                    
                        for(let i = 0; i < results.length; i++){
                            if (results[i].total_price){
                                total_price = total_price + results[i].total_price;
                            } else total_price = total_price + results[i].sell_price;
                        }
                        service.trigger_update_price(total_price, bill_id)
                        .then(orders => {
                            status = httpStatus.OK;
                            res.status(status).json(responseJS.mess_Json(status));
                        }).catch(error => {
                            res.status(status).json(error);
                        });
                
                    })
                    .catch(function(error) {
                        res.status(status).json(error);
                    });
                });
                
            }).catch(function(error) {
                res.status(status).json(error);
            });
        }catch (error) {
            console.log(error);
            transaction.rollback();
        }
    })
};
    

