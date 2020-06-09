import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const EditBrand = props => {
    const [brand, setBrand] = useState(props.currentBrand)

    useEffect(
        () => {
            setBrand(props.currentBrand)
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setBrand({ ...brand, [name]: value})
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                props.updateBrand(brand.id, brand)
                props.closeModal(false)
            }}
        >
            <Form.Group controlId="EditformGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter name" name="name" value={brand.name} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <ButtonGroup aria-label="Basic example">
                    <Button color="info">Update Brand</Button>
                    <Button onClick={() => props.closeModal(false)} className="button muted-button">
                        Cancel
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Form>
    )
}

export default EditBrand