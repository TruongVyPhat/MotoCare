import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios'
import UserTable from "components/UserManager/UserTable"
import AddUser from "components/UserManager/AddUser"
import EditUser from "components/UserManager/EditUser"
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import * as Constant from '../helpers/constants'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";
let idMax = 0;

function UserManager() {
    const [show, setShow] = useState(false);
    const initialFormState = { id: null, name: '', email: '', password: '', role_id: '' }
    const [users, setUsers] = useState({})
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)
    const [isChanged, setIsChanged] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addUser = data => {
        if (data.role_id === Constant.ROLENAME.ADMIN) data.role_id = Constant.ROLE.ADMIN;
        else if (data.role_id === Constant.ROLENAME.STAFF) data.role_id = Constant.ROLE.STAFF;
        else if (data.role_id === Constant.ROLENAME.CUSTOMER) data.role_id = Constant.ROLE.CUSTOMER;
        axios.post('http://localhost:9000/api/users/create', { data }, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (res.status === 201) {
                    data.id = idMax + 1
                    idMax++
                    setUsers([...users, data])
                    setIsChanged(!isChanged)
                }
            })
            .catch(error => {
                console.log(error)
            })


    }

    const addButton = () => {
        setEditing(false)
        setShow(true)
    }

    const deleteUser = id => {
        axios.delete(`http://localhost:9000/api/users/delete/${id}`, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (res.status === 200) {
                    setEditing(false)
                    setUsers(users.filter(user => user.id !== id))
                }
            })
            .catch(error => {
                console.log(error)
                toast.error("Can't delete Brand !! ", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const updateUser = (id, data) => {
        if (data.role_id === Constant.ROLENAME.ADMIN) data.role_id = Constant.ROLE.ADMIN;
        else if (data.role_id === Constant.ROLENAME.STAFF) data.role_id = Constant.ROLE.STAFF;
        else if (data.role_id === Constant.ROLENAME.CUSTOMER) data.role_id = Constant.ROLE.CUSTOMER;
        axios.put(`http://localhost:9000/api/users/update-role/${id}`, { data }, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                if (res.status === 200) {
                    setEditing(false)
                    setUsers(users.map(user => (user.id === id ? data : user)))
                    setIsChanged(!isChanged)
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const editRow = user => {
        setEditing(true)
        setShow(true)
        setCurrentUser({ id: user.id, email: user.email, name: user.name, password: user.password, role_id: user.role_id })
    }

    useEffect(() => {
        let url = 'http://localhost:9000/api/users?page=1';
        axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                const result = res.data.data;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].role_id === Constant.ROLE.ADMIN) result[i].role_id = Constant.ROLENAME.ADMIN
                    else if (result[i].role_id === Constant.ROLE.STAFF) result[i].role_id = Constant.ROLENAME.STAFF
                    else if (result[i].role_id === Constant.ROLE.CUSTOMER) result[i].role_id = Constant.ROLENAME.CUSTOMER
                    if (result[i].id > idMax) idMax = result[i].id
                }
                setUsers(result)
            }).catch(error => {
                console.log(error);
            });
    }, [isChanged]);

    return (
        <>{localStorage.getItem('role_id') === Constant.ROLENAME.ADMIN ? (<>
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
        </>) : <>
                <div className="content">
                    <Card className="demo-icons">
                        <CardHeader>
                            <CardTitle tag="h5">You are not ADMIN</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="flex-row">
                                <div className="flex-large">
                                    <h2>You can't control this page</h2>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </>}
        </>
    )
}

export default UserManager;
