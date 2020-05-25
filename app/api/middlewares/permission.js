const httpStatus = require('http-status-codes');
const responseJS = require('../helpers/json-generator'); 
//const report_service = require('../reports/ReportServices');

// CHECK user permission
exports.user_permission = (allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    return (request, response, next) => {
        if (request.user && isAllowed(request.user.role_id)){
            next();
        }else {
            status = httpStatus.FORBIDDEN;
            response.status(status).json(responseJS.mess_Json(status));
        }   
    }
};

/**
 *  CHECK user permission for report and rpDetail
 * rp_detail_id != null => delete, update reportDetail 
 * rp_detail_id == null => use for REPORT and create reportDETAIL
 */

// exports.report_permission = (report_id, user_id, rp_detail_id) => {
    
//     return (request, response, next) => {
//         report_service.get_created_by(report_id, rp_detail_id)
//         .then(report => {
//             if (report[0]){
//                 if (report[0].created_by === user_id){
//                     next();
//                 } else {
//                     const status = httpStatus.FORBIDDEN;
//                     res.status(status).json(responseJS.mess_Json(status));
//                 }
                
//             } else {
//                 const status = httpStatus.NOT_FOUND;
//                 res.status(status).json(responseJS.mess_Json(status));
//             }
//         }).catch(function(error) {
//             res.status(status).json(error);
//             return;
//         });
//     };        
// };
