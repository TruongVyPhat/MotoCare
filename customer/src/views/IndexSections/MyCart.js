import React, { useState, useEffect } from 'react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Container } from 'reactstrap';
import { Image, Button, Icon, Label } from 'semantic-ui-react'
import Table from 'react-bootstrap/Table'

function MyCart() {
    const [myCartFinal, setMyCartFinal] = useState({})
    const [listItem, setListItem] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    let totalPrice = 0;

    const handleBack = () => {
        console.log('clicked')
        window.location.href('/')
    }

    useEffect(() => {
        if (window.localStorage.getItem('myCart')) {
            setMyCartFinal(JSON.parse(window.localStorage.getItem('myCart')))
            setListItem(JSON.parse(window.localStorage.getItem('myCart')).data.orders)
            setIsEmpty(false)
        }
    }, [])

    const handleCheckOut = () => {
        console.log('clicked')
    }

    return (
        <>
            <ExamplesNavbar />
            <Container style={{ marginTop: '100px' }}>
                <div >
                    {isEmpty ? <>
                        <Image src={require("assets/img/emptycart.png")} size='medium' centered />
                        <p style={{ textAlign: 'center', fontSize: 'x-large' }}>Your cart is empty</p>
                        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                            <Button onClick={handleBack} color="youtube" size="big">Back to Shop</Button>
                        </div>

                    </> : <>
                            <Table width="100%">
                                <thead>
                                    <tr>
                                        <th width="40%">Name</th>
                                        <th width="30%">Amount</th>
                                        <th width="10%">Price</th>
                                        <th width="20%">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listItem.map((data) => {
                                        totalPrice = totalPrice + (data.sell_price * data.amount)
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.name}</td>
                                                <td>{data.amount}</td>
                                                <td>{data.sell_price}</td>
                                                <td>{data.sell_price * data.amount}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </>}
                </div>
                <div style={{textAlign:'right', marginBottom: '100px' }}>
                    <Button onClick={handleCheckOut} as='div' labelPosition='right'>
                        <Button color='teal'>
                            <Icon name='cart' />
                            Check out
                        </Button>
                        <Label as='a' basic color='teal' pointing='left'>
                            {totalPrice}
                        </Label>
                    </Button>
                </div>
            </Container>

            <Footer />
        </>

    )
}

export default MyCart;

