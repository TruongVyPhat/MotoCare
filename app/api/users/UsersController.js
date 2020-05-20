const service = require('./UserServices');
const HttpStatus = require('http-status-codes');
const ROLE = require('../helpers/constants').ROLE;
let responseJS = require('..//helpers/json-generator').Json; 
let status = HttpStatus.INTERNAL_SERVER_ERROR;
responseJS.message = HttpStatus.getStatusText(status);

exports.get_user = (req, res) => {
    const user_id = req.params.id;
    service.get_user(user_id)
    .then(user => {
        if (user[0]){
            status = HttpStatus.NOT_FOUND;
            responseJS.message = HttpStatus.getStatusText(status);
            responseJS.data = user[0];
        }
        res.status(status).json(responseJS)
    }).catch(error => {
        res.status(status).json(error);
    });
}

exports.get_me = (req, res) => {
    const user_id = req.user.id;  
    service.get_me(user_id)
    .then(user => {
        if(user[0]){
            status = HttpStatus.OK;
            responseJS.message = HttpStatus.getStatusText(status);
            responseJS.data = user[0];
        }
        res.status(status).json(responseJS);
    }).catch(function(error) {
        res.status(status).json(error);
    });
}

exports.create_user = (req, res) => {
    let name = req.body.data.name;   
    let email = req.body.data.email;
    let password = service.hash_password(req.body.data.password);
    let role_id = req.body.data.role_id ? req.body.data.role_id : ROLE.CUSTOMER;
    let date_of_birth = req.body.data.date_of_birth ? req.body.data.date_of_birth : null;
    let address = req.body.data.address ? req.body.data.address : null;
    let phone = req.body.data.phone ? req.body.data.phone : null;
    
    service.get_user_by_email(email)
    .then(users => {
        // kiểm tra người dùng đã tồn tại
        if (users.length > 0){
            status = HttpStatus.NOT_ACCEPTABLE;
            responseJS.message = 'Duplicate email';
            res.status(status).json(responseJS);
        }else{
            // insert user
            service.create_user(name, role_id, email, phone, address, date_of_birth, password)
            .then(function(created){
            
                status = HttpStatus.CREATED;
                responseJS.message = HttpStatus.getStatusText(status);
                res.status(status).json(responseJS);

            }).catch(function(error) {
                res.status(status).json(error);
            });
        }
        
    }).catch(function(error) {
        res.status(status).json(error);
    });
}



