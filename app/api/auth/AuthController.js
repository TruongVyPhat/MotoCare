const jwt = require('jsonwebtoken');
const CONSTANT = require('../helpers/constants');
const TOKEN_KEY = require('../helpers/token-key');
const formatter_time = require('../functions/format_time');
const HttpStatus = require('http-status-codes');
const service = require('../users/UserServices');
let responseJS = require('../helpers/json-generator').Json; 
let status = HttpStatus.INTERNAL_SERVER_ERROR;
responseJS.message = HttpStatus.getStatusText(status);

exports.login = (req, res) => {
    const email = req.body.data.email.trim();
    const password = req.body.data.password.trim();
    service.get_user_by_email(email)
    .then(user => {
        if(user[0] && service.compare_password(password, user[0].password)){
            // kiểm tra password
            const current_time = new Date().getTime();
            const payload_access = { name: user[0].name, id: user[0].id, role_id: user[0].role_id, createdTime: current_time};
            const payload_refresh = { name: user[0].name, id: user[0].id, createdTime: current_time};

            const jwt_access_token = jwt.sign(payload_access, TOKEN_KEY.jwt_Secret);
            const jwt_refresh_token = jwt.sign(payload_refresh, TOKEN_KEY.jwt_Secret);

            // set to user in db
            const save_time_token = formatter_time.gettime_to_format(current_time);
            service.update_token(jwt_refresh_token, save_time_token, user[0].id)
            .then(updating => {

                // set responseJS
                const token_data = {
                    access_token: jwt_access_token,
                    refresh_token: jwt_refresh_token,
                    token_type: "Bearer"
                };
                    
                status = HttpStatus.OK;
                responseJS.message = HttpStatus.getStatusText(status);
                responseJS.data = token_data;
                res.status(status).json(responseJS);

            }).catch(function(error) {
                res.status(status).json(responseJS);
            });
        }else{
            status = HttpStatus.NOT_FOUND;
            responseJS.message = HttpStatus.getStatusText(status);
            res.status(status).json(responseJS);
        }
        
    }).catch(function(error) {
        res.status(status).json(error);
    }); 
}

exports.logout = function(req, res){   
    if (req.user){
        req.user.refresh_token =  undefined;
        req.user.created_time_token =  undefined;

        status = HttpStatus.OK;
        responseJS.message = HttpStatus.getStatusText(status);
        res.status(status).json(responseJS);
    }else{
        status = HttpStatus.METHOD_FAILURE
        responseJS.message = HttpStatus.getStatusText(status);
        res.status(status).json(responseJS);
    }
}; 

exports.isAuthenticated = function(req, res, next){
    status = HttpStatus.UNAUTHORIZED
    responseJS.message = HttpStatus.getStatusText(status);
    if (req.headers && req.headers.authorization) {
        const jwt_token =  req.headers.authorization;
        jwt.verify(jwt_token, TOKEN_KEY.jwt_Secret, function(err, payload){
            if (err){
                res.status(status).json(responseJS);
                return;
            }else{
                // check time expried
                let now = new Date();
                let currentTime = now.getTime();
                const createdTime = payload.createdTime;
                let differTime = (currentTime - createdTime) / 1000;

                if (differTime > CONSTANT.ACCESS_TIMEOUT ) {
                    status = HttpStatus.UNAUTHORIZED
                    responseJS.message = HttpStatus.getStatusText(status);
                    res.status(status).json(responseJS);
                    return;
                }

                // set req.user
                req.user = {
                    id: payload.id,
                    name: payload.name,
                    role_id: payload.role_id
                };
                next();
            }
        })
    }else{
        res.status(status).json(responseJS);
        return;
    }
};
