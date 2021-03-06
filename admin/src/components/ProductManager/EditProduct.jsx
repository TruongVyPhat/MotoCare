import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import axios from 'axios'
import {
    Button
} from "reactstrap";

const EditProduct = props => {
    const [product, setProduct] = useState(props.currentProduct)
    const [categories, setCategories] = useState([{}])
    const [brands, setBrands] = useState([{}])

    useEffect(
        () => {
            //clean up useEffect
            let didCancel = false;

            setProduct(props.currentProduct)
            
            //Call Category and brand for form Edit
            let urlCategories = 'http://localhost:9000/api/categories?page=1';
            axios.get(urlCategories, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (!didCancel) {
                    const result = res.data.data;
                    setCategories(result)
                }
            }).catch(error => {
                console.log(error);
            });
            let urlBrands = 'http://localhost:9000/api/brands?page=1';
            axios.get(urlBrands, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (!didCancel) {
                    const result = res.data.data;
                    setBrands(result)
                }
            }).catch(error => {
                console.log(error);
            });

            //clean up useEffect
            return () => {
                didCancel = true;
            };
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: name === "brand_id" || name === "category_id" || name === "amount"? parseInt(value) : value})
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                props.updateProduct(product.id, product)
                props.closeModal(false)
            }}
        >
            <Form.Group controlId="EditformGroupImage">
                <Form.Label>Input Image</Form.Label>
                <Form.File name="image"  onChange={handleInputChange} id="custom-file"  custom />
            </Form.Group>
            <Form.Group controlId="EditformGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter name" name="name" value={product.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="EditformGroupCategoryID">
                <Form.Label>CATEGORY NAME</Form.Label>
                <Form.Control as="select" required custom name="category_id" value={product.category_id} onChange={handleInputChange}>
                    <option></option>
                    {categories.map((category, index) => (<option value={category.id} key={index}>{category.title}</option>))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="EditformGroupBrandID">
                <Form.Label>BRAND NAME</Form.Label>
                <Form.Control as="select" required custom name="brand_id" value={product.brand_id} onChange={handleInputChange}>
                    <option></option>
                    {brands.map((brand, index) => (<option value={brand.id} key={index}>{brand.name}</option>))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="EditformGroupAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" placeholder="Enter amount" name="amount" value={product.amount} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <ButtonGroup aria-label="Basic example">
                    <Button color="info">Update user</Button>
                    <Button onClick={() => props.closeModal(false)} className="button muted-button">
                        Cancel
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Form>
    )
}

export default EditProduct