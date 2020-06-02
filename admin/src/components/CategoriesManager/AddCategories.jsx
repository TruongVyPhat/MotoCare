import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {
    Button
} from "reactstrap";

const AddCategories = props => {
    const initialFormState = { id: null, image: '', title: ''}
    const [category, setCategory] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value })
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!category.title) return
                props.addCategory(category)
                setCategory(initialFormState)
            }}
        >
            <Form.Group controlId="AddformGroupNameCategory">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter title" name="title" value={category.title} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
                <Button type="submit" color="primary">Add new Category</Button>
            </Modal.Footer>

        </Form>
    )
}

export default AddCategories