const service = require('./ServiceServices');
const httpStatus = require('http-status-codes');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_services = (req, res) => {
    const page = req.query.page;
    service.get_all_services(page)
    .then(services => {
        if (services){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, services));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_service = (req, res) => {
    const service_id = req.params.id;
    service.get_service(service_id)
    .then(services => {
        if (services){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, services[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.create_service = (req, res) => {
    const name = req.body.data.name.trim();
    const duration = req.body.data.duration;
    const price = req.body.data.price;
    const image = req.body.data.image;
    
    service.create_service(name, duration, price, image)
    .then(created => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.update_service = (req, res) => {
    const id = req.params.id
    const name = req.body.data.name.trim();
    const duration = req.body.data.duration;
    const price = req.body.data.price;
    const image = req.body.data.image;
    
    service.update_service(name, duration, price, image, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.delete_service = (req, res) => {
    const id = req.params.id;
    
    service.delete_service(id)
    .then(deleted => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}
