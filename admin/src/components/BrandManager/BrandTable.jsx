import React from 'react'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const BrandTable = props => (
    <Table width="100%">
        <thead>
            <tr>
                <th width="90%">Name</th>
                <th width="10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.brands.length > 0 ? (
                props.brands.map(brand => (
                    <tr key={brand.id}>
                        <td>{brand.name}</td>
                        <td>
                        <ButtonGroup aria-label="Basic example">


                            <Button
                                size="sm"
                                onClick={() => {
                                    props.editRow(brand)
                                }}
                                className="button muted-button"
                            >
                                Edit
                            </Button>
                            {localStorage.getItem('role_id') === 'ADMIN'? <Button
                                color="danger"
                                size="sm"
                                onClick={() => props.deleteBrand(brand.id)}
                                className="button muted-button"
                            >
                                Delete
                            </Button> : ''}
                            
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

export default BrandTable
