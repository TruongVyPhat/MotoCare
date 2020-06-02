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
    const initialFormState = { id: null, name: ''}
    const [brands, setBrands] = useState({})
    const [currentBrand, setCurrentBrand] = useState(initialFormState)
    const [editing, setEditing] = useState(false)
    const [isChanged, setIsChanged] = useState(false)

    const closeModal = () => {
        setShow(false);
    }

    const addBrand = data => {
        axios.post('http://localhost:9000/api/brands/create',{data},{headers: { authorization: localStorage.getItem('access_token') }})
            .then (res => {
                console.log(res.status)
                if (res.status === 200) {
                    data.id = idMax + 1
                    idMax++
                    setBrands([...brands, data])
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

    const deleteBrand = id => {
        axios.delete(`http://localhost:9000/api/brands/delete/${id}`,{headers: { authorization: localStorage.getItem('access_token') }})
        .then (res => {
            console.log(res.status)
            if (res.status === 200) {
                setEditing(false)
                setBrands(brands.filter(brand => brand.id !== id))
            }
        })
        .catch (error => {
            console.log(error)
        })
    }

    const updateProduct = (id, data) => {
        axios.put(`http://localhost:9000/api/brands/update?id=${id}`, {data}, {headers: { authorization: localStorage.getItem('access_token') }})
        .then (res => {
            console.log(res.status)
            if (res.status === 200) {
                setEditing(false)
                setBrands(brands.map(brand => (brand.id === id ? data : brand)))
                setIsChanged(!isChanged)
            }
        })
        .catch (error => {
            console.log(error)
        })
    }

    const editRow = brand => {
        setEditing(true)
        setShow(true)
        setCurrentBrand({ id: brand.id, name: brand.name})
    }

    useEffect(() => {
        let url = 'http://localhost:9000/api/brands?page=1';
        axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
            .then(res => {
                console.log(res.data.data)
                const result = res.data.data;
                for (let i=0;i<result.length;i++){
                    if(result[i].id > idMax) idMax = result[i].id
                }
                setBrands(result)
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
                        <Button color="primary" onClick={addButton} > Add Brand </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="flex-row">

                            <div className="flex-large">
                                <BrandTable brands={brands} editRow={editRow} deleteBrand={deleteBrand} />
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
                                    currentBrand={currentBrand}
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
                                    <AddBrand addBrand={addBrand} />
                                </Modal.Body>
                            </Fragment>
                        )}
                </div>
            </Modal>
        </>
    )
}

export default BrandManager;
