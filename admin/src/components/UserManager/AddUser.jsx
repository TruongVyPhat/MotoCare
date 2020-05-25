import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {
    Button
} from "reactstrap";

const AddUser = props => {
    const initialFormState = { id: null, email: '', username: '', address: '', password: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!user.email || !user.username) return
                props.addUser(user)
                setUser(initialFormState)
            }}
        >
            <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" name="username" value={user.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formGroupAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" name="address" value={user.address} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formGroupAddress">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" value={user.password} onChange={handleInputChange}/>
                </Form.Group>
            <Modal.Footer>
                <Button type="submit" color="primary">Add new user</Button>
            </Modal.Footer>

        </Form>
    )
}

export default AddUser