import React, { useState, useEffect } from 'react';
import IndexNavbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footer/Footer.js";
import { Container } from 'reactstrap';
import { Image, Button, Icon, Label } from 'semantic-ui-react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

function MyCart() {
    const [listItem, setListItem] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const [isChangeArray, setIsChangeArray] = useState(false) 
    let totalPrice = 0;

    const handleBack = () => {
        console.log('clicked')
        window.location.href('/')
    }

    useEffect(() => {
        if (window.localStorage.getItem('myCart')) {
            setListItem(JSON.parse(window.localStorage.getItem('myCart')).data.orders)
            setIsEmpty(false)
        }
    }, [isChangeArray])

    const handleCheckOut = () => {
        let url = 'http://localhost:9000/api/bill/payment'
        let data = JSON.parse(window.localStorage.getItem("myCart"))
        console.log(data)
        axios.post(url, data, { headers: { authorization: localStorage.getItem('access_token') } })
        .then(res => {
            console.log(res.data.data)
            window.location.href(res.data.data)
        }).catch(error => {
            console.log(error);
        });
    }

    const handleDelete = (id) => {
        setListItem(listItem.filter(list => list.id !== id))
        if(listItem.length !== 1) {
            window.localStorage.setItem("myCart",JSON.stringify({
                "data": {
                    "discount":0,
                    "orders": listItem.filter(list => list.id !== id)
                }
            }))
        } else if(listItem.length === 1){
            window.localStorage.removeItem("myCart") 
            setIsEmpty(true)
        }
        setIsChangeArray(!isChangeArray)
    }

    const handleIncrease = (id) => {
        let temp = listItem
        for (let i = 0; i < temp.length ; i++)
        {
            if(temp[i].id === id) {
                temp[i].quantity++
            } 
        }
        setListItem(temp)
        window.localStorage.setItem("myCart",JSON.stringify({
            "data": {
                "discount":0,
                "orders": listItem
            }
        }))
        setIsChangeArray(!isChangeArray)
    }

    

    const handleDecrease = (id) => {
        let temp = listItem
        for (let i = 0; i < temp.length ; i++)
        {
            if (temp[i].quantity > 1 && temp[i].id === id) {
                temp[i].quantity = temp[i].quantity - 1
            }
        }
        setListItem(temp)
        window.localStorage.setItem("myCart",JSON.stringify({
            "data": {
                "discount":0,
                "orders": listItem
            }
        }))
        setIsChangeArray(!isChangeArray)
    }

    const List = listItem.map((data) => {
        totalPrice = totalPrice + (data.sell_price * data.quantity)
        return (
            <tr key={data.id}>
                <td>{data.name}</td>
                <td>
                    <Button.Group color='grey' size='tiny'>
                        <Button onClick={() => handleIncrease(data.id)}>+</Button>
                        <Button.Or text={data.quantity} />
                        {data.quantity > 1 ? <Button onClick={() => handleDecrease(data.id)}>-</Button> : ''}
                    </Button.Group>
                    
                    </td>
                <td>{data.sell_price} $</td>
                <td>{data.sell_price * data.quantity} $</td>
                <td><Button onClick={() => handleDelete(data.id)} color='red' icon>
                        <Icon name='trash alternate outline' />
                    </Button></td>
            </tr>
        )
    })

    return (
        <>
            <IndexNavbar />
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
                                        <th width="25%">Name</th>
                                        <th width="30%">Quantity</th>
                                        <th width="15%">Price</th>
                                        <th width="25%">Total</th>
                                        <th width="5%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {List}
                                </tbody>
                            </Table><div style={{textAlign:'right', marginBottom: '100px' }}>
                    <Button onClick={handleCheckOut} as='div' labelPosition='right'>
                        <Button color='teal'>
                            <Icon name='cart' />
                            Check out
                        </Button>
                        <Label as='a' basic color='teal' pointing='left'>
                            {totalPrice} $
                        </Label>
                    </Button>
                </div>
                        </>}
                </div>
                
            </Container>

            <Footer />
        </>

    )
}

export default MyCart;

