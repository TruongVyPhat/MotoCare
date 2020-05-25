const HttpStatus = require('http-status-codes');
let responseJS = require('../helpers/json-generator').Json; 
const db = require('../../models/index');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

// CHECK user permission
exports.user_permission = (allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    return (request, response, next) => {
        if (request.user && isAllowed(request.user.role_id)){
            next();
        }else {
            status = HttpStatus.FORBIDDEN;
            responseJS.message = HttpStatus.getStatusText(status);
            response.status(status).json(responseJS);
        }   
    }
};

//  CHECK user permission for report and rpDetail
//  rp_detail_id != null => delete, update reportDetail 
//  rp_detail_id == null => use for REPORT and create reportDETAIL
exports.report_permission = (report_id, user_id, rp_detail_id) => {
    let permission = true;
    let query = 'SELECT created_by from Report where id = ?';
    if (rp_detail_id){
        query = 'SELECT rp.created_by from Report rp JOIN ReportDetail rd on rp.id = rd.report_id where rd.id = ?';
    }
    sequelize.query(query, {
        replacements: rp_detail_id? [rp_detail_id]: [report_id],
        type: QueryTypes.SELECT
    }).then(function(report){
        if (!report[0] || report[0].created_by !== user_id){
            permission = false;
            status = HttpStatus.FORBIDDEN;
            responseJS.message = HttpStatus.getStatusText(status);
            res.status(status).json(responseJS);
        }
    }).catch(function(error) {
        permission = false;
        res.status(status).json(error);
    });        
    return permission;
};
