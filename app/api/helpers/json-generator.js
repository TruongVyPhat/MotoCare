const httpStatus = require('http-status-codes');

exports.mess_Json = (status) => {
    return {
        message : httpStatus.getStatusText(status),
        data: []
    }    
};

exports.Json = (status, data) => {
    return {
        message: httpStatus.getStatusText(status),
        data: data
    }
}