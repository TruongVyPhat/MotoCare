const service = require('./SlotServices');
const httpStatus = require('http-status-codes');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_slots = (req, res) => {

    service.get_all_slots()
    .then(slots => {
        if (slots){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, slots));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.create_slot = (req, res) => {
    const number = req.body.data.number; 
    service.create_slot(number)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.delete_slot = (req, res) => {
    const number = req.body.data.number; 
    service.delete_slot(number)
    .then(deleted => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}