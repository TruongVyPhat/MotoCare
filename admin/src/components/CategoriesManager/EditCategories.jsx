import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const EditCategories = props => {
    const [category, setCategory] = useState(props.currentCategory)

    useEffect(
        () => {
            setCategory(props.currentCategory)
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value})
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                props.updateCategory(category.id, category)
                props.closeModal(false)
            }}
        >
            <Form.Group controlId="EditformTitleCategory">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" placeholder="Enter title" name="title" value={category.title} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <ButtonGroup aria-label="Basic example">
                    <Button color="info">Update category</Button>
                    <Button onClick={() => props.closeModal(false)} className="button muted-button">
                        Cancel
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Form>
    )
}

export default EditCategories