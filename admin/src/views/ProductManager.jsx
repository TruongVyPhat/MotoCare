import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios'
import ProductTable from "components/ProductManager/ProductTable"
import AddProduct from "components/ProductManager/AddProduct"
import EditProduct from "components/ProductManager/EditProduct"
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";


const ProductManager = () => {

    const [show, setShow] = useState(false);
    const productData = [
        { id: 1, image: '', name: 'Loại 1', categoryID: 'dàu nhớt', brandID: 'Toyota', amount: '2'},
        { id: 2, image: '', name: 'Loại 2', categoryID: 'dàu nhớt', brandID: 'Toyota', amount: '2'},
        { id: 3, image: '', name: 'Loại 3', categoryID: 'dàu nhớt', brandID: 'Toyota', amount: '2'},
    ]
    const initialFormState = { id: null, image: '', name: '', categoryID:'', brandID:'', amount: ''}
    const [products, setProducts] = useState(productData)
    const [currentProduct, setCurrentProduct] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addProduct = product => {
        product.id = products.length + 1
        setProducts([...products, product])
    }

    const addButton = () => {
        setEditing(false)
        setShow(true)
    }

    const deleteProduct = id => {
        setEditing(false)
        setProducts(products.filter(product => product.id !== id))
    }

    const updateProduct = (id, updatedProduct) => {
        setEditing(false)
        setProducts(products.map(product => (product.id === id ? updatedProduct : product)))
    }

    const editRow = product => {
        setEditing(true)
        setShow(true)
        setCurrentProduct({ id: product.id, image: product.image, name: product.name, categoryID: product.categoryID, brandID: product.brandID, amount: product.amount})
    }

    useEffect(() => {
        let url = 'http://localhost:9000/api/products?page=1';
        axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                console.log(res.data.data)
                // const result = res.data.data;
                // for (let i=0;i<result.length;i++){
                //     if(result[i].role_id === Constant.ROLE.ADMIN) result[i].role_id = Constant.ROLENAME.ADMIN
                //     else if (result[i].role_id === Constant.ROLE.STAFF) result[i].role_id= Constant.ROLENAME.STAFF
                //     else if (result[i].role_id === Constant.ROLE.CUSTOMER) result[i].role_id= Constant.ROLENAME.CUSTOMER
                //     if(result[i].id > idMax) idMax = result[i].id
                // }
                // setUsers(result)
            }).catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="content">
                <Card className="demo-icons">
                    <CardHeader>
                        <CardTitle tag="h5">Product Manager</CardTitle>
                        <Button color="primary" onClick={addButton} > Add Product </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="flex-row">

                            <div className="flex-large">
                                <ProductTable products={products} editRow={editRow} deleteProduct={deleteProduct} />
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
                                <Modal.Title>Edit Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditProduct
                                    editing={editing}
                                    closeModal={closeModal}
                                    currentProduct={currentProduct}
                                    updateProduct={updateProduct}
                                />
                            </Modal.Body>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddProduct addProduct={addProduct} />
                                </Modal.Body>
                            </Fragment>
                        )}
                </div>
            </Modal>
        </>
    )
}

export default ProductManager;
