const service = require('./UserServices');
const httpStatus = require('http-status-codes');
const CONSTANTS = require('../helpers/constants');
const ROLE = CONSTANTS.ROLE;
const bill_service = require('../bill/BillServices');
const responseJS = require('../helpers/json-generator');
let status = httpStatus.INTERNAL_SERVER_ERROR;

// get all user
exports.get_all_users = (req, res) => {
    const page = req.query.page;
    service.get_all_user(page)
    .then(users => {
        if (users){
            status = httpStatus.OK; 
            res.status(status).json(responseJS.Json(status, users));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    })
    .catch(function(error) {
        res.status(status).json(error);
    });
};

// get user by id or name
exports.get_user = (req, res) => {
    const user_id = req.params.id;
    service.get_user(user_id)
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

// GET my profile
exports.get_me = (req, res) => {
    const user_id = req.user.id;  
    service.get_me(user_id)
    .then(user => {
        if (user){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, user[0]));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

// create user
exports.create_user = (req, res) => {
    const name = req.body.data.name;
    const email = req.body.data.email;
    const password = service.hash_password(req.body.data.password);
    const role_id = req.body.data.role_id ? req.body.data.role_id : ROLE.CUSTOMER;
    const date_of_birth = req.body.data.date_of_birth ? req.body.data.date_of_birth : null;
    const address = req.body.data.address ? req.body.data.address : null;
    const phone = req.body.data.phone ? req.body.data.phone : null;
    
    service.get_user_by_email(email)
    .then(users => {
        // kiểm tra người dùng đã tồn tại
        if (users.length > 0){
            status = httpStatus.NOT_ACCEPTABLE;
            res.status(status).json(responseJS.mess_Json(status));
        }else{
            // insert user
            service.create_user(name, role_id, email, phone, address, date_of_birth, password)
            .then(function(created){
                status = httpStatus.CREATED;
                res.status(status).json(responseJS.mess_Json(status));

            }).catch(function(error) {
                res.status(status).json(error);
            });
        }
        
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

// find user
exports.search_users = (req, res) => {
    let keyword = formatter.format_string(req.query.keyword, formatter).toLowerCase();
    keyword = '%'+keyword+'%';
    service.get_user_by_keyword(keyword)
    .then(users => {
        if (users.length > 0){
            status = httpStatus.OK;
            res.status(status).json(responseJS.Json(status, users));
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

// update user
exports.update_user_info = (req, res) => {
    const user_id = req.user.id;
    const user_role = req.user.role_id;
    const id = parseInt(req.params.id);
    const name = req.body.data.name.trim();
    const address = req.body.data.address.trim();
    const role_id = req.body.data.role_id;
    const date_of_birth = req.body.data.date_of_birth.trim();
    const phone = req.body.data.phone.trim();
    
    if (user_id !== id && user_role !== ROLE.ADMIN){
        status = httpStatus.FORBIDDEN;
        res.status(status).json(responseJS.mess_Json(status));
        return;
    }

    service.update_user_info(name, role_id, phone, address, date_of_birth, id, user_id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

// change password
exports.update_password = (req, res) => {
    const new_password = service.hash_password(req.body.data.new_password);
    const old_password = req.body.data.old_password;
    const user_id = req.user.id;

    service.get_me(user_id)
    .then(users => {
        if (users[0] && service.compare_password(old_password, users[0].password)){
            service.change_password(new_password, user_id)
            .then(updated => {
                status = httpStatus.OK;
                res.status(status).json(responseJS.mess_Json(status));
            }).catch(function(error) {
                res.status(status).json(error);
            });
        } else {
            status = httpStatus.UNAUTHORIZED;
            res.status(status).json(responseJS.mess_Json(status));
        }
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

/**
 * FUNCTIONS for ADMIN only
 */

// UPDATE user's role
exports.update_user_role = (req, res) => {
    const id = req.params.id;
    const role_id = req.body.data.role_id;
    
    service.update_user_role(role_id, id)
    .then(updating => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
};

// reset password
exports.reset_password = (req, res) => {
    const user_id = req.query.id;
    service.change_password(CONSTANTS.DEFAULT_PASSWORD, user_id)
    .then(updated => {
        status = httpStatus.OK;
        res.status(status).json(responseJS.mess_Json(status));
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

// delete user
exports.delete_user = (req, res) => {
    const id = req.params.id;
    
    service.get_user(id)
    .then(users => {
        if (users.length > 0){
            if (users[0].role_id === ROLE.ADMIN){
                status = httpStatus.FORBIDDEN;
                res.status(status).json(responseJS.mess_Json(status));
            }
            bill_service.get_all_bills(id)
            .then(bills => {
                if (bills.length > 0){
                    status = httpStatus.CONFLICT;
                    res.status(status).json(responseJS.mess_Json(status));
                } else {
                    service.delete_user(id)
                    .then(function(deleting){
                        status = httpStatus.OK;
                        res.status(status).json(responseJS.mess_Json(status));
                    }).catch(function(error) {
                        res.status(status).json(error);
                    });
                }   
            })
            
        } else {
            status = httpStatus.NOT_FOUND;
            res.status(status).json(responseJS.mess_Json(status));
        }
        
    }).catch(function(error) {
        res.status(status).json(error);
    });
};



