import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {
    Button
} from "reactstrap";

const AddUser = props => {
    const initialFormState = { id: null, name: '', email: '', password: '', role_id: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Form
            onSubmit={event => {
                event.preventDefault()
                if (!user.email || !user.name) return
                props.addUser(user)
                setUser(initialFormState)
            }}
        >
            <Form.Group controlId="AddNameUser">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" name="name" value={user.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="AddEmailUser">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="AddRoleIDUser">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" required custom name="role_id" value={user.role_id} onChange={handleInputChange}>
                    <option></option>
                    <option>ADMIN</option>
                    <option>STAFF</option>
                    <option>CUSTOMER</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="AddPasswordUser">
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