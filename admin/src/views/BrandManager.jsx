import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios'
import BrandTable from "components/BrandManager/BrandTable"
import AddBrand from "components/BrandManager/AddBrand"
import EditBrand from "components/BrandManager/EditBrand"
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";
let idMax = 0;

const BrandManager = () => {
    const [show, setShow] = useState(false);
    const initialFormState = { id: null, image: '', name: '', category_id:'', brand_id:'', amount: ''}
    const [products, setProducts] = useState({})
    const [currentProduct, setCurrentProduct] = useState(initialFormState)
    const [editing, setEditing] = useState(false)
    const [isChanged, setIsChanged] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addProduct = data => {
        axios.post('http://localhost:9000/api/products/create',{data},{headers: { authorization: localStorage.getItem('access_token') }})
            .then (res => {
                console.log(res.status)
                if (res.status === 200) {
                    data.id = idMax + 1
                    idMax++
                    setProducts([...products, data])
                    setIsChanged(!isChanged)
                }
            })
            .catch (error => {
                console.log(error)
            })
    }

    const addButton = () => {
        setEditing(false)
        setShow(true)
    }

    const deleteProduct = id => {
        axios.delete(`http://localhost:9000/api/products/delete/${id}`,{headers: { authorization: localStorage.getItem('access_token') }})
        .then (res => {
            console.log(res.status)
            if (res.status === 200) {
                setEditing(false)
                setProducts(products.filter(product => product.id !== id))
            }
        })
        .catch (error => {
            console.log(error)
        })
    }

    const updateProduct = (id, data) => {
        axios.put(`http://localhost:9000/api/products/update?id=${id}`, {data}, {headers: { authorization: localStorage.getItem('access_token') }})
        .then (res => {
            console.log(res.status)
            if (res.status === 200) {
                setEditing(false)
                setProducts(products.map(product => (product.id === id ? data : product)))
                setIsChanged(!isChanged)
            }
        })
        .catch (error => {
            console.log(error)
        })
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
                const result = res.data.data;
                for (let i=0;i<result.length;i++){
                    if(result[i].id > idMax) idMax = result[i].id
                }
                setProducts(result)
            }).catch(error => {
                console.log(error);
            });
    }, [isChanged]);

    return (
        <>
            <div className="content">
                <Card className="demo-icons">
                    <CardHeader>
                        <CardTitle tag="h5">Brand Manager</CardTitle>
                        <Button color="primary" onClick={addButton} > Add Product </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="flex-row">

                            <div className="flex-large">
                                <BrandTable products={products} editRow={editRow} deleteProduct={deleteProduct} />
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
                                <Modal.Title>Edit Brand</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditBrand
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
                                    <Modal.Title>Add Brand</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddBrand addProduct={addProduct} />
                                </Modal.Body>
                            </Fragment>
                        )}
                </div>
            </Modal>
        </>
    )
}

export default BrandManager;