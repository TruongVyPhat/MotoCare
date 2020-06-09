import React, { useState, useEffect } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footer/Footer.js";
import { Container } from 'reactstrap';
import { Image, Button } from 'semantic-ui-react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import format_time from 'components/functions/format_time'

const Orders = () => {
    const [bills, setBills] = useState([{}])
    const [isEmpty, setIsEmpty] = useState(false)

    const handleBack = () => {
        window.location.href = '/'
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/api/bill/`, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (res.data.data.length === 0) setIsEmpty(true)
                setBills(res.data.data)
            }).catch(error => {
                console.log(error);
            });
    }, [])

    let temp = ""
    const List = bills.map((data, index) => {
        let flag = 0
        if (temp !== data.created_at) {
            flag = 1
            temp = data.created_at
        }

        return (
            <tr key={index}>
                {flag === 1 ? <td>{format_time(data.created_at)}&nbsp;:</td> : <td></td>}
                <td >{data.name}</td>
                <td>{data.amount}</td>
                <td>{data.discount} %</td>
                {flag === 1 ? <td>==>&nbsp;&nbsp;&nbsp;&nbsp;{data.total_price} $</td> : <td></td>}
            </tr>
        )
    })

    return (
        <>
            <IndexNavbar />
            <Container style={{ marginTop: '100px' }}>
                {isEmpty ? <>
                    <Image src={require("assets/img/order.png")} size='medium' centered />
                    <p style={{ textAlign: 'center', fontSize: 'x-large' }}>You haven't orders</p>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <Button onClick={handleBack} color="youtube" size="big">Back to Shop</Button>
                    </div>

                </> : <>
                        <Table width="100%">
                            <thead>
                                <tr>
                                    <th width="30%">Time</th>
                                    <th width="30%">Name</th>
                                    <th width="10%">Quantity</th>
                                    <th width="15%">Discount</th>
                                    <th width="15%">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {List}
                            </tbody>
                        </Table><div style={{ textAlign: 'right', marginBottom: '100px' }}>
                        </div>
                    </>}
            </Container>
            <Footer />
        </>
    )
}

export default Orders