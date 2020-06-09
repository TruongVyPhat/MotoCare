import React, { useEffect } from 'react';

const SuccessPayment = () => {

    useEffect(() => {
        window.localStorage.removeItem("myCart")
        window.location.href = '/'
    })

    return(
        <h1>Success Payment</h1>
    )
}

export default SuccessPayment