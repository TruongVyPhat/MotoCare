import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios'
import UserTable from "components/UserManager/UserTable"
import AddUser from "components/UserManager/AddUser"
import EditUser from "components/UserManager/EditUser"
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";


const UserManager = () => {

    const [show, setShow] = useState(false);
    const usersData = [
        { id: 1, username: 'Tania', email: 'floppydiskette', address: '', password:''},
        { id: 2, username: 'Craig', email: 'siliconeidolon', address: '', password:''  },
        { id: 3, username: 'Ben', email: 'benisphere', address: '', password:''  },
    ]
    const initialFormState = { id: null, username: '', email: '', address:'', password:''}
    const [users, setUsers] = useState(usersData)
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const addButton = () => {
        setEditing(false)
        setShow(true)
    }

    const deleteUser = id => {
        setEditing(false)
        setUsers(users.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)
        setShow(true)
        setCurrentUser({ id: user.id, email: user.email, username: user.username, address: user.address, password: user.password })
    }


    return (
        <>
            <div className="content">
                <Card className="demo-icons">
                    <CardHeader>
                        <CardTitle tag="h5">User Manager</CardTitle>

                        <Button color="primary" onClick={addButton} > Add User </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="flex-row">

                            <div className="flex-large">
                                <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Modal show={show} onHide={closeModal}>
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditUser
                                    editing={editing}
                                    closeModal={closeModal}
                                    currentUser={currentUser}
                                    updateUser={updateUser}
                                />
                            </Modal.Body>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddUser addUser={addUser} />
                                </Modal.Body>
                            </Fragment>
                        )}
                </div>
            </Modal>
        </>
    )
}

export default UserManager;
