import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const EditUser = props => {
    const [user, setUser] = useState(props.currentUser)

    useEffect(
        () => {
            setUser(props.currentUser)
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                props.updateUser(user.id, user)
                props.closeModal(false)
            }}
        >
            <Form.Group controlId="EditRoleIDUser">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" required custom name="role_id" value={user.role_id} onChange={handleInputChange}>
                    <option></option>
                    <option>STAFF</option>
                    <option>CUSTOMER</option>
                </Form.Control>
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

export default EditUser