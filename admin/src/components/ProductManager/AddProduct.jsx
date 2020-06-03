import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import {
    Button
} from "reactstrap";

const AddProduct = props => {
    const initialFormState = { id: null, image: '', name: '', title: '', brand_name: '', amount: '', description: '', sell_price: '' }
    const [product, setProduct] = useState(initialFormState)
    const [categories, setCategories] = useState([{}])
    const [brands, setBrands] = useState([{}])

    const handleInputChange = event => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })
    }

    useEffect(() => {
        //clean up useEffect
        let didCancel = false;

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
    }, []);

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!product.name || !product.category_id || !product.brand_id) return
                props.addProduct(product)
                console.log("final: ", product)
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
                <Form.Label>CATEGORY NAME</Form.Label>
                <Form.Control as="select" required custom name="category_id" value={product.category_id} onChange={handleInputChange}>
                    <option></option>
                    {categories.map((category, index) => (<option value={category.id} key={index}>{category.title}</option>))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="AddformGroupBrandID">
                <Form.Label>BRAND NAME</Form.Label>
                <Form.Control as="select" required custom name="brand_id" value={product.brand_id} onChange={handleInputChange}>
                    <option></option>
                    {brands.map((brand, index) => (<option value={brand.id} key={index}>{brand.name}</option>))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="AddformGroupAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" placeholder="Enter amount" name="amount" value={product.amount} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="AddformGroupSellPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control required type="number" placeholder="Enter price" name="sell_price" value={product.sell_price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="AddformGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description" name="description" value={product.description} onChange={handleInputChange}/>
            </Form.Group>
            <Modal.Footer>
                <Button type="submit" color="primary">Add new Product</Button>
            </Modal.Footer>
            
        </Form>
    )
}

export default AddProduct