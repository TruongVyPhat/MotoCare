module.exports = {
    PAGE_SIZE: 15,
    ACCESS_TIMEOUT: 2 * 60 * 60,
    REPORT_STATUS: {
        Processing: 'processing',
        Approved: 'approved',
        Unapproved: 'unapproved'
    },
    ROLE: {
        ADMIN: 1,
        APPROVER: 2,
        STAFF: 3
    }
};