import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
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
            <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" name="username" value={user.username} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={user.address} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupAddress">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" value={user.password} onChange={handleInputChange}/>
                </Form.Group>
            <Modal.Footer>
                <Button>Update user</Button>
                <Button onClick={() => props.closeModal(false)} className="button muted-button">
                    Cancel
                </Button>
            </Modal.Footer>
        </Form>
    )
}

export default EditUser