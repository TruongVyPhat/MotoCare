import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const EditProduct = props => {
    const [product, setProduct] = useState(props.currentProduct)

    useEffect(
        () => {
            setProduct(props.currentProduct)
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: name === "category_id" || name === "brand_id" ? parseInt(value) : value})
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
                <Form.Label>CATEGORY ID</Form.Label>
                <Form.Control as="select" required custom name="category_id" defaultValue={product.category_id} value={product.category_id} onChange={handleInputChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="EditformGroupBrandID">
                <Form.Label>BRAND ID</Form.Label>
                <Form.Control as="select" required custom name="brand_id" value={product.brand_id} onChange={handleInputChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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