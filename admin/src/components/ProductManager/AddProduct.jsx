import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import {
    Button
} from "reactstrap";

const AddProduct = props => {
    const initialFormState = { id: null, image: '', name: '', category_id:'', brand_id:'', amount: ''}
    const [product, setProduct] = useState(initialFormState)
    const [categories, setCategories] = useState([{}])

    const handleInputChange = event => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })
    }

    useEffect(() => {
        let url = 'http://localhost:9000/api/categories?page=1';
        axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                console.log(res.data.data)
                const result = res.data.data;
                setCategories(result)
            }).catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!product.name || !product.category_id || !product.brand_id) return
                props.addProduct(product)
                setProduct(initialFormState)
            }}
        >
            <Form.Group controlId="AddformGroupImage">
                <Form.Label>Input Image</Form.Label>
                <Form.File name="image" value={product.image} onChange={handleInputChange} id="custom-file" label={product.image} custom />
            </Form.Group>
            <Form.Group controlId="AddformGroupNameProduct">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter name" name="name" value={product.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="AddformGroupCategoryID">
                <Form.Label>CATEGORY ID</Form.Label>
                <Form.Control as="select" custom name="category_id" value={product.category_id} onChange={handleInputChange}>
                    <option></option>
                    {categories.map((category , index) => (<option key={index}>{category.title}</option>))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="AddformGroupBrandID">
                <Form.Label>BRAND ID</Form.Label>
                <Form.Control as="select" custom name="brand_id" value={product.brand_id} onChange={handleInputChange}>
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="AddformGroupAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" placeholder="Enter amount" name="amount" value={product.amount} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <Button type="submit" color="primary">Add new Product</Button>
            </Modal.Footer>

        </Form>
    )
}

export default AddProduct