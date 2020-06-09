import React, {useState, useEffect} from 'react';
import { Card } from 'semantic-ui-react';
import Product from './Product';
import axios from 'axios';

const GridViewProducts = ({search, category}) => {
    
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        if (!search){
            if(category){
                axios.get(`http://localhost:9000/api/products/filter?category=${category}&page=1`)
                .then(res => {
                    setListProduct(res.data.data);
                }).catch(error => {
                    console.log(error);
                });
            }else {
                axios.get(`http://localhost:9000/api/products?page=1`)
                .then(res => {
                    setListProduct(res.data.data);
                }).catch(error => {
                    console.log(error);
                });
            }
        } 
        else {
            axios.get(`http://localhost:9000/api/products/search?keyword=${search}`)
            .then(res => {
                setListProduct(res.data.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [search, category]);
    

    return(
        <div>
            <Card.Group>
                {listProduct && listProduct.map((product) => <Product key={product.id} product={product}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewProducts;