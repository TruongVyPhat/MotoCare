import React, { useState, useEffect } from 'react';
import axios from 'axios'

const SuccessPayment = () => {

    useEffect(() => {
        window.localStorage.removeItem("MyCart")
        window.location.href('/')
    })

    return(
        <h1>Success Payment</h1>
    )
}

export default SuccessPayment