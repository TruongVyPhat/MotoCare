import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Product from './Product';
import axios from 'axios';

const GridViewProducts = () => {
    const result = [{name: "Motul 300V", description: "Ester 100% Synthetic", brand: "ABC", price: 400000}, {}, {}, {}, {}, {}, {}, {}];
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        // axios.get(`http://localhost:9000/api/products`)
        // .then(res => {
            
        //     setListProduct(res.data.data);
        // }).catch(error => {
        //     console.log(error);
        // });
        setListProduct(result);
    }, []);
    

    return(
        <div>
            <Card.Group>
                {listProduct && listProduct.map((product) => <Product product={product}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewProducts;