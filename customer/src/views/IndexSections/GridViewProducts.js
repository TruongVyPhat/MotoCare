import React, {useState, useEffect} from 'react';
import { Card } from 'semantic-ui-react';
import Product from './Product';
import axios from 'axios';

const GridViewProducts = () => {
    
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:9000/api/products?page=1`)
        .then(res => {
            console.log(res.data.data)
            setListProduct(res.data.data);
        }).catch(error => {
            console.log(error);
        });
        //setListProduct(result);
    }, []);
    

    return(
        <div>
            <Card.Group>
                {listProduct && listProduct.map((product) => <Product key={product.id} product={product}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewProducts;