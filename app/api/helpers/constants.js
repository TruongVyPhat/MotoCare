module.exports = {
    PAGE_SIZE: 5,
    ACCESS_TIMEOUT: 2 * 60 * 60,
    ROLE: {
        ADMIN: 1,
        STAFF: 2,
        CUSTOMER: 3
    },
    BOOKING_STATUS: {
        booked: 'booked',
        processing: 'processing',
        done: 'done',
        cancle: 'cancle',
        not_come: 'not-come',
    },
    milisec_per_day: 86400000,
    milisec_per_hour: 3600000,
    max_day: 2,
    min_hour: 1,
    DEFAULT_DISCOUNT: 0
};