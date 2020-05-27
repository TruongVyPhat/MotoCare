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
                <th width="20%">Image</th>
                <th width="20%">Name</th>
                <th width="20%">Category ID</th>
                <th width="20%">Brand ID</th>
                <th width="10%">Amount</th>
                <th width="10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.products.length > 0 ? (
                props.products.map(product => (
                    <tr key={product.id}>
                        <td>{product.image}</td>
                        <td>{product.name}</td>
                        <td>{product.category_id}</td>
                        <td>{product.brand_id}</td>
                        <td>{product.amount}</td>
                        <td>
                        <ButtonGroup aria-label="Basic example">


                            <Button
                                size="sm"
                                onClick={() => {
                                    props.editRow(product)
                                }}
                                className="button muted-button"
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => props.deleteProduct(product.id)}
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
                        <td colSpan={3}>No Product</td>
                    </tr>
                )}
        </tbody>
    </Table>
)

export default UserTable
