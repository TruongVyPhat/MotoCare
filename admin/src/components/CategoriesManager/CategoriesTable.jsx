import React from 'react'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
    Button
} from "reactstrap";

const CategoriesTable = props => (
    <Table width="100%">
        <thead>
            <tr>
                <th width="90%">Name</th>
                <th width="10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.categories.length > 0 ? (
                props.categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td>
                        <ButtonGroup aria-label="Basic example">


                            <Button
                                size="sm"
                                onClick={() => {
                                    props.editRow(category)
                                }}
                                className="button muted-button"
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => props.deleteCategory(category.id)}
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
                        <td colSpan={3}>No Category</td>
                    </tr>
                )}
        </tbody>
    </Table>
)

export default CategoriesTable
