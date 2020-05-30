const service = require('./CategoryServices');
const httpStatus = require('http-status-codes');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

exports.get_all_categories = (req, res) => {
    const page = req.query.page;
    service.get_all_categories(page)
    .then(categories => {
        if (categories){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, categories));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
}

exports.get_category = (req, res) => {
    const category_id = req.params.id;
    service.get_category(category_id)
    .then(categories => {
        if (categories){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, categories[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.create_category = (req, res) => {
    const title = req.body.data.title.trim();
    
    service.create_category(title)
    .then(created => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.update_category = (req, res) => {
    const id = req.params.id;
    const title = req.body.data.title.trim();
    
    service.update_category(title, id)
    .then(updated => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

exports.delete_category = (req, res) => {
    const id = req.params.id;

    service.delete_category(id)
    .then(deleted => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}