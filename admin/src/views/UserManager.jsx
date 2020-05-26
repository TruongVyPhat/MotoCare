import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios'
import UserTable from "components/UserManager/UserTable"
import AddUser from "components/UserManager/AddUser"
import EditUser from "components/UserManager/EditUser"
import Modal from 'react-bootstrap/Modal'
import * as Constant from '../helpers/constants'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";

const UserManager = () => {

    const [show, setShow] = useState(false);

    const initialFormState = { id: null, name: '', email: '', password: '', role_id: '' }
    const [users, setUsers] = useState({})
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addUser = data => {
        if(data.role_id === Constant.ROLENAME.ADMIN) data.role_id = Constant.ROLE.ADMIN
        else if (data.role_id === Constant.ROLENAME.STAFF) data.role_id= Constant.ROLE.STAFF
        else if (data.role_id === Constant.ROLENAME.CUSTOMER) data.role_id= Constant.ROLE.CUSTOMER
        console.log(data)
        axios.post('http://localhost:9000/api/users/create',{data})
            .then (res => {
                if (res.status === 201) {
                    console.log(res.data);
                }
            })
            .catch (error => {
                console.log(error)
            })
        data.id = users.length + 1
        setUsers([...users, data])

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
        setCurrentUser({ id: user.id, email: user.email, name: user.name, password: user.password, role_id: user.role_id })
    }

    useEffect(() => {
        let url = 'http://localhost:9000/api/users';
        axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                const result = res.data.data;
                for (let i=0;i<result.length;i++){
                    if(result[i].role_id === Constant.ROLE.ADMIN) result[i].role_id = Constant.ROLENAME.ADMIN
                    else if (result[i].role_id === Constant.ROLE.STAFF) result[i].role_id= Constant.ROLENAME.STAFF
                    else if (result[i].role_id === Constant.ROLE.CUSTOMER) result[i].role_id= Constant.ROLENAME.CUSTOMER
                }
                setUsers(result)
            }).catch(error => {
                console.log(error);
            });
    }, []);

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
