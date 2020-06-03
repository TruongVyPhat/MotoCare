const service = require('./BookServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const ROLE = CONSTANTS.ROLE;
const formatter_time = require('../functions/format_time');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_bookings = (req, res) => {
    const page = req.query.page;
    service.get_all_bookings(page)
    .then(bookings => {
        if (bookings){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, bookings));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_all_my_bookings = (req, res) => {
    const page = req.query.page;
    service.get_all_my_bookings(user_id, page)
    .then(bookings => {
        if (bookings){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, bookings));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}
