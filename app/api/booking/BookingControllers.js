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

exports.filter_by_status = (req, res) => {
    const status = req.query.status;
    const role_id = req.user.role_id;
    const user_id = req.user.user_id;

    if (role_id === ROLE.ADMIN || role_id === ROLE.STAFF){
        user_id = null;
    }
    service.filter_by_status(status, user_id)
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

exports.get_booked_time = (req, res) => {
    const current_time = new Date().getTime()
    const start_time = current_time + CONSTANTS.milisec_per_hour * CONSTANTS.min_hour;
    const end_time = current_time + CONSTANTS.milisec_per_day * CONSTANTS.max_day;

    service
}

exports.create_booking = (req, res) => {
    const user_id = req.user.user_id;
    const status = CONSTANTS.BOOKING_STATUS.booked;
    const service_id = req.body.data.service_id;
    const time = req.body.data.time;
    const slot_id = req.body.data.slot_id;
}
