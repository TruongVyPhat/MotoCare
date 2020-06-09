const service = require('./BillServices');
const pOrder_service = require('../product_order/ProductOrderServices');
const product_service = require('../products/ProductServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const path = require('path');
const ROLE = CONSTANTS.ROLE;
const formatter_time = require('../functions/format_time');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;
const paypal = require('paypal-rest-sdk');
paypal.configure({
	mode: 'sandbox', //sandbox or live
	client_id: 'AXDAV98ZNIEvDHKGNpENqMhu9TENENbKKU9rnZHhpoUEuQZ_9jA5oAQHeCCfg6BGiFy9zKpJMJbgjwiM',
	client_secret: 'ECXQyWFi_XgcUtFFpLgPiBug3pa7Y84WMw36y7RyAL5ZRqP__ISgOUd5gdkjRGIBG0KftGGCUKuNlLW4'
});

exports.get_all_bills = (req, res) => {
	const user_id = req.user.id;
	const role_id = req.user.role_id;

	if (role_id === ROLE.ADMIN && role_id === ROLE.STAFF) user_id = null;

	service
		.get_all_bills(user_id)
		.then((bills) => {
			if (bills) {
				// let results = [];
				// let curBill_json = {
				// 	id: null,
				// 	created_at: null,
				// 	discount: 0,
				// 	total_price: 0,
				// 	orders: [],
				// }
				// for (let i = 0; i < bills.length; i++){
					
				// 	if (!curBill_json.id || curBill_json.id !== bills[i].id){
				// 		results.push(curBill_json);
				// 		curBill_json.id = bills[i].id;
				// 		curBill_json.created_at = bills[i].created_at;
				// 		curBill_json.total_price = bills[i].total_price;
				// 		curBill_json.orders = [];
				// 	} 
				// 	const order = {
				// 		name: bills[i].name,
				// 		amount: bills[i].amount
				// 	}
				// 	curBill_json.orders.push(order);
				// }
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
};

exports.get_bill = (req, res) => {
	const bill_id = req.params.id;
	const user_id = req.user.id;
	const role_id = req.user.role_id;
	if (role_id === ROLE.ADMIN || role_id === ROLE.CUSTOMER) user_id = null;

	service
		.get_bill(bill_id, user_id)
		.then((bills) => {
			if (bills) {
				pOrder_service
					.get_orders_by_bill(bill_id, user_id)
					.then((orders) => {
						if (orders) {
							const response = {
								bill: bills[0],
								orders: orders
							};
							status = httpStatus.OK;
							res.status(status).json(responseJS.Json(status, response));
						} else {
							status = httpStatus.NOT_FOUND;
							res.status(status).json(responseJS.mess_Json(status));
						}
					})
					.catch((error) => {
						res.status(status).json(error);
					});
			} else {
				status = httpStatus.NOT_FOUND;
				res.status(status).json(responseJS.mess_Json(status));
			}
		})
		.catch((error) => {
			res.status(status).json(error);
		});
};

exports.create_bill = (req, res) => {
	const user_id = req.user.id;
	const discount = req.body.data.discount ? req.body.data.discount : CONSTANTS.DEFAULT_DISCOUNT;
	const orders = req.body.data.orders;
	const current_time = new Date().getTime();
	const created_at = formatter_time.gettime_to_format(current_time);

	service.create_bill(user_id, created_at, discount)
		.then((created) => {
			service.get_created_bill(user_id, created_at).then((bills) => {
				const bill_id = bills[0].id;
                pOrder_service.create_orders(orders, bill_id)
                .then((results) => {
                    service.check_update_bill(bill_id).then((items) => {
                        let total = 0;

                        for (let i = 0; i < items.length; i++) {
                            total += items[i].price * items[i].quantity;
                        }
                        service.trigger_update_price(total, bill_id)
                        .then((updated) => {
							product_service.update_amount_of_products(orders)
							.then(amount_updated => {
								const create_payment_json = {
									intent: 'sale',
									payer: {
										payment_method: 'paypal'
									},
									redirect_urls: {
										return_url: `http://localhost:9000/success?total=${total}`,
										cancel_url: 'http://localhost:3000/cancel'
									},
									transactions: [
										{
											item_list: {
												items: items
											},
											amount: {
												currency: 'USD',
												total: total.toString()
											},
											description: 'Hat for the best team ever'
										}
									]
								};

								paypal.payment.create(create_payment_json, function(error, payment) {
									if (error) {
										res.status(status).json(error);
									} else {
										for (let i = 0; i < payment.links.length; i++) {
											if (payment.links[i].rel === 'approval_url') {
												status = httpStatus.OK;
												res.status(status).json(responseJS.Json(status, payment.links[i].href));
											}
										}
										
									}
								});
							}).catch((error) => {
								res.status(status).json(error);
							});
                        })
                        .catch((error) => {
                            res.status(status).json(error);
                        });
                    })
                    .catch(function(error) {
                        res.status(status).json(error);
                    });
                })
                .catch((error) => {
                    res.status(status).json(error);
                });
			});
		})
		.catch(function(error) {
			res.status(status).json(error);
		});
};

exports.payment = (req, res) => {
	const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const total = req.query.total;

	const execute_payment_json = {
		payer_id: payerId,
		transactions: [
			{
				amount: {
					currency: 'USD',
					total: total.toString()
				}
			}
		]
	};

	paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
		if (error) {
			status = httpStatus.METHOD_FAILURE;
			res.status(status).json(responseJS.mess_Json(status));
		} else {
			res.redirect('https://motocare-customer.web.app/success', httpStatus.OK);
		}
	});
};
