import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {
    Button
} from "reactstrap";

const AddBrand = props => {
    const initialFormState = { id: null, name: ''}
    const [brand, setBrand] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setBrand({ ...brand, [name]: value })
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!brand.name) return
                props.addBrand(brand)
                setBrand(initialFormState)
            }}
        >
            <Form.Group controlId="AddformGroupNameBrand">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter name" name="name" value={brand.name} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <Button type="submit" color="primary">Add new Brand</Button>
            </Modal.Footer>

        </Form>
    )
}

export default AddBrand