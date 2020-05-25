import React from 'react'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const UserTable = props => (
    <Table width="100%">
        <thead>
            <tr>
                <th width="10%">Username</th>
                <th width="30%">Email</th>
                <th width="50%">Address</th>
                <th width="10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? (
                props.users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>
                        <ButtonGroup aria-label="Basic example">


                            <Button
                                size="sm"
                                onClick={() => {
                                    props.editRow(user)
                                }}
                                className="button muted-button"
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => props.deleteUser(user.id)}
                                className="button muted-button"
                            >
                                Delete
                            </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))
            ) : (
                    <tr>
                        <td colSpan={3}>No users</td>
                    </tr>
                )}
        </tbody>
    </Table>
)

export default UserTable
